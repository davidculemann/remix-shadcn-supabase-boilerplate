import type { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { stripe } from "@/services/stripe/stripe.server";
import { PLANS } from "@/services/stripe/plans";
import { ERRORS } from "@/lib/constants";
import { createClient } from "@supabase/supabase-js";

export const ROUTE_PATH = "/api/webhook" as const;

/**
 * Gets and constructs a Stripe event signature.
 */
async function getStripeEvent(request: Request) {
	if (!process.env.STRIPE_WEBHOOK_ENDPOINT) {
		throw new Error(`Stripe - ${ERRORS.ENVS_NOT_INITIALIZED}`);
	}

	try {
		const signature = request.headers.get("Stripe-Signature");
		if (!signature) throw new Error(ERRORS.STRIPE_MISSING_SIGNATURE);
		const payload = await request.text();
		const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_ENDPOINT);
		return event;
	} catch (err: unknown) {
		console.log(err);
		throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
	}
}

export async function action({ request }: ActionFunctionArgs) {
	const event = await getStripeEvent(request);

	const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});

	try {
		console.log("Received event:", event.type); // Log the event type

		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object;

				console.log("Handling checkout.session.completed event...");
				console.log("Session object:", session);

				const { customer: userId, subscription: subscriptionId } = z
					.object({
						customer: z.string(),
						subscription: z.string(), // Get subscription ID from the session
					})
					.parse(session);

				console.log("Retrieving user with customer_id:", userId);

				// First, let's check what profiles actually exist
				const { data: allProfiles, error: profilesError } = await supabase
					.from("profiles")
					.select("id, customer_id");

				console.log("All profiles:", allProfiles);
				console.log("Profiles error:", profilesError);

				// Then try our specific query
				const { data: user, error: userError } = await supabase
					.from("profiles")
					.select("*")
					.eq("customer_id", userId)
					.single();

				console.log("Query result:", { user, userError });

				if (userError) {
					console.error("Supabase error retrieving user:", userError);
					// Let's try without .single() to see if we get multiple results
					const { data: users, error: usersError } = await supabase
						.from("profiles")
						.select("*")
						.eq("customer_id", userId);

					console.log("Alternative query result:", { users, usersError });
					throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
				}

				if (!user) {
					console.error("No user found with customer_id:", userId);
					throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
				}

				console.log("Found user:", user);
				console.log("Retrieving subscription:", subscriptionId);
				const subscription = await stripe.subscriptions.retrieve(subscriptionId);
				console.log("Subscription object:", subscription);

				const { error: subError } = await supabase
					.from("subscriptions")
					.upsert(
						{
							id: subscription.id,
							user_id: user.id,
							plan_id: String(subscription.items.data[0].plan.product),
							price_id: String(subscription.items.data[0].price.id),
							interval: String(subscription.items.data[0].plan.interval),
							status: subscription.status,
							current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
							current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
							cancel_at_period_end: subscription.cancel_at_period_end,
						},
						{ onConflict: "user_id" },
					) // Define the column(s) to check for conflict
					.single();

				if (subError) {
					console.log("subError", subError);
					throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
				}
				console.log("Checking for free subscription...", subscription.id, subError);
				// Cancel free subscription if exists NOTE: This is not working
				const { data: existingSubscriptions } = await stripe.subscriptions.list({ customer: userId });

				if (existingSubscriptions.length > 1) {
					const freeSubscription = existingSubscriptions.find(
						(sub) => sub.items.data[0].price.product === PLANS.FREE,
					);

					if (freeSubscription) {
						console.log("Cancelling free subscription:", freeSubscription.id);
						await stripe.subscriptions.cancel(freeSubscription.id);
					}
				}

				return new Response(null);
			}

			case "customer.subscription.updated": {
				console.log("Handling customer.subscription.updated event...");
				const subscription = event.data.object;
				console.log("Subscription object:", subscription);

				console.log("Handling checkout.session.completed event...");
				console.log("Session object:", subscription);

				const { customer: userId } = z.object({ customer: z.string() }).parse(subscription);

				const { data: user, error } = await supabase
					.from("profiles")
					.select("*")
					.eq("customer_id", userId)
					.single();

				if (error) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

				const { error: subError } = await supabase
					.from("subscriptions")
					.update({
						id: subscription.id,
						user_id: user.id,
						plan_id: String(subscription.items.data[0].plan.product),
						price_id: String(subscription.items.data[0].price.id),
						interval: String(subscription.items.data[0].plan.interval),
						status: subscription.status,
						current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
						current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
						cancel_at_period_end: subscription.cancel_at_period_end,
					})
					.eq("user_id", user.id);

				if (subError) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

				return new Response(null);
			}

			case "customer.subscription.deleted": {
				console.log("Handling customer.subscription.deleted event...");
				const subscription = event.data.object;
				console.log("Subscription object:", subscription);

				const { id } = z.object({ id: z.string() }).parse(subscription);

				const { error: subError } = await supabase.from("subscriptions").delete().eq("id", id);

				if (subError) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

				return new Response(null);
			}
		}
	} catch (err: unknown) {
		console.error("Error processing webhook:", err); // Log the error here for better visibility
		return new Response(`Error: ${err instanceof Error ? err.message : "Unknown error"}`, { status: 500 });
	}

	return new Response(null);
}
