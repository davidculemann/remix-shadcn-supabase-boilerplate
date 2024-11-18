import type { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { stripe } from "@/services/stripe/stripe.server";
import { PLANS } from "@/services/stripe/plans";
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { ERRORS } from "@/lib/constants";

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
	const { supabase } = getSupabaseWithHeaders({ request });

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object;

				const { customer: userId, subscription: subscriptionId } = z
					.object({ customer: z.string(), subscription: z.string() })
					.parse(session);

				const subscription = await stripe.subscriptions.retrieve(subscriptionId);

				const { error: subError } = await supabase
					.from("subscriptions")
					.update({
						id: subscription.id,
						user_id: userId,
						plan_id: String(subscription.items.data[0].plan.product),
						price_id: String(subscription.items.data[0].price.id),
						interval: String(subscription.items.data[0].plan.interval),
						status: subscription.status,
						current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
						current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
						cancel_at_period_end: subscription.cancel_at_period_end,
					})
					.eq("user_id", userId);

				if (subError) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

				// Cancel free subscription if exists
				const subscriptions = (await stripe.subscriptions.list({ customer: userId })).data.map(
					(sub) => sub.items,
				);

				if (subscriptions.length > 1) {
					const freeSubscription = subscriptions.find((sub) =>
						sub.data.some((item) => item.price.product === PLANS.FREE),
					);
					if (freeSubscription) {
						await stripe.subscriptions.cancel(freeSubscription?.data[0].subscription);
					}
				}

				return new Response(null);
			}

			case "customer.subscription.updated": {
				const subscription = event.data.object;
				const { customer: userId } = z.object({ customer: z.string() }).parse(subscription);

				const { error: subError } = await supabase
					.from("subscriptions")
					.update({
						id: subscription.id,
						user_id: userId,
						plan_id: String(subscription.items.data[0].plan.product),
						price_id: String(subscription.items.data[0].price.id),
						interval: String(subscription.items.data[0].plan.interval),
						status: subscription.status,
						current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
						current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
						cancel_at_period_end: subscription.cancel_at_period_end,
					})
					.eq("user_id", userId);

				if (subError) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

				return new Response(null);
			}

			case "customer.subscription.deleted": {
				const subscription = event.data.object;
				const { id } = z.object({ id: z.string() }).parse(subscription);

				const { error: subError } = await supabase.from("subscriptions").delete().eq("id", id);

				if (subError) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

				return new Response(null);
			}
		}
	} catch (err: unknown) {
		console.error(err);
		return new Response(null, { status: 400 });
	}

	return new Response(null);
}
