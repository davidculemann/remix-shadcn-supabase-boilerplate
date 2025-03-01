import { ERRORS } from "@/lib/constants";
import { PLANS } from "@/services/stripe/plans";
import { stripe } from "@/services/stripe/stripe.server";
import type { ActionFunctionArgs } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export const ROUTE_PATH = "/api/webhook" as const;

async function getStripeEvent(request: Request) {
	if (!process.env.STRIPE_WEBHOOK_ENDPOINT) {
		throw new Error(`Stripe - ${ERRORS.ENVS_NOT_INITIALIZED}`);
	}

	const signature = request.headers.get("Stripe-Signature");
	if (!signature) throw new Error(ERRORS.STRIPE_MISSING_SIGNATURE);

	const payload = await request.text();
	return stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_ENDPOINT);
}

async function handleCheckoutCompleted(session: any, supabase: any) {
	const { customer: userId, subscription: subscriptionId } = z
		.object({
			customer: z.string(),
			subscription: z.string(),
		})
		.parse(session);

	const { data: user, error: userError } = await supabase
		.from("profiles")
		.select("*")
		.eq("customer_id", userId)
		.single();

	if (userError) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const subscription = await stripe.subscriptions.retrieve(subscriptionId);

	const { error: subError } = await supabase.from("subscriptions").upsert(
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
	);

	if (subError) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const { data: existingSubscriptions } = await stripe.subscriptions.list({ customer: userId });

	if (existingSubscriptions.length > 1) {
		const freeSubscription = existingSubscriptions.find((sub) => sub.items.data[0].price.product === PLANS.FREE);

		if (freeSubscription) {
			await stripe.subscriptions.cancel(freeSubscription.id);
		}
	}
}

async function handleSubscriptionUpdated(subscription: any, supabase: any) {
	const { customer: userId } = z.object({ customer: z.string() }).parse(subscription);

	const { data: user, error } = await supabase.from("profiles").select("*").eq("customer_id", userId).single();

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
}

async function handleSubscriptionDeleted(subscription: any, supabase: any) {
	const { id } = z.object({ id: z.string() }).parse(subscription);
	const { error } = await supabase.from("subscriptions").delete().eq("id", id);
	if (error) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
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
		switch (event.type) {
			case "checkout.session.completed":
				await handleCheckoutCompleted(event.data.object, supabase);
				break;
			case "customer.subscription.updated":
				await handleSubscriptionUpdated(event.data.object, supabase);
				break;
			case "customer.subscription.deleted":
				await handleSubscriptionDeleted(event.data.object, supabase);
				break;
		}
		return new Response(null, { status: 200 });
	} catch (err: unknown) {
		return new Response(`Error: ${err instanceof Error ? err.message : "Unknown error"}`, { status: 500 });
	}
}
