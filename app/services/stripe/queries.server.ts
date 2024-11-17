import { ERRORS } from "@/lib/constants";
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { HOST_URL } from "../misc.server";
import { PLANS } from "./plans";
import { getLocaleCurrency, stripe } from "./stripe.server";

//TODO - update supabase with user

/**
 * Creates a Stripe customer for a user.
 */
export async function createCustomer({ userId, request }: { userId: string; request: Request }) {
	const { supabase } = getSupabaseWithHeaders({ request });

	const { data: user, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

	if (error || !user || user.customer_id) throw new Error(ERRORS.STRIPE_CUSTOMER_NOT_CREATED);

	const email = user.email ?? undefined;
	const name = user.username ?? undefined;
	const customer = await stripe.customers.create({ email, name }).catch((err: any) => console.error(err));
	if (!customer) throw new Error(ERRORS.STRIPE_CUSTOMER_NOT_CREATED);

	const { error: updateError } = await supabase
		.from("profiles")
		.update({ customer_id: customer.id })
		.eq("id", user.id);

	if (updateError) throw new Error(ERRORS.STRIPE_CUSTOMER_NOT_CREATED);
	return true;
}

/**
 * Creates a Stripe free tier subscription for a user.
 */
export async function createFreeSubscription({ userId, request }: { userId: string; request: Request }) {
	const { supabase } = getSupabaseWithHeaders({ request });

	const { data: user, error: userError } = await supabase.from("profiles").select("*").eq("id", userId).single();

	if (userError || !user || !user.customer_id) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const { data: existingSubscription } = await supabase
		.from("subscriptions")
		.select("*")
		.eq("user_id", user.id)
		.single();

	if (existingSubscription) return false;

	const currency = getLocaleCurrency(request);

	const { data: plan } = await supabase
		.from("plans")
		.select(`
			*,
			prices (*)
		`)
		.eq("id", PLANS.FREE)
		.single();

	const yearlyPrice = plan?.prices?.find(
		(price: { interval: string; currency: string }) => price.interval === "year" && price.currency === currency,
	);

	if (!yearlyPrice) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const stripeSubscription = await stripe.subscriptions.create({
		customer: user.customer_id,
		items: [{ price: yearlyPrice.id }],
	});

	if (!stripeSubscription) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const { error: subscriptionError } = await supabase.from("subscriptions").insert({
		id: stripeSubscription.id,
		user_id: user.id,
		plan_id: stripeSubscription.items.data[0].plan.product,
		price_id: stripeSubscription.items.data[0].price.id,
		interval: stripeSubscription.items.data[0].plan.interval,
		status: stripeSubscription.status,
		current_period_start: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
		current_period_end: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
		cancel_at_period_end: stripeSubscription.cancel_at_period_end,
	});

	if (subscriptionError) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
	return true;
}

/**
 * Creates a Stripe checkout session for a user.
 */
export async function createSubscriptionCheckout({
	userId,
	planId,
	planInterval,
	request,
}: {
	userId: string;
	planId: string;
	planInterval: string;
	request: Request;
}) {
	const { supabase } = getSupabaseWithHeaders({ request });

	const { data: user, error: userError } = await supabase.from("profiles").select("*").eq("id", userId).single();

	if (userError || !user || !user.customer_id) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const { data: subscription, error: subError } = await supabase
		.from("subscriptions")
		.select("*")
		.eq("user_id", user.id)
		.single();

	if (subError || subscription?.plan_id !== PLANS.FREE) return;

	const currency = getLocaleCurrency(request);

	const { data: price, error: priceError } = await supabase
		.from("prices")
		.select("*")
		.eq("id", subscription.price_id)
		.single();

	if (priceError || !price) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const checkout = await stripe.checkout.sessions.create({
		customer: user.customer_id,
		line_items: [{ price: price.id, quantity: 1 }],
		mode: "subscription",
		payment_method_types: ["card"],
		success_url: `${HOST_URL}/dashboard/checkout`,
		cancel_url: `${HOST_URL}/dashboard/settings/billing`,
	});
	if (!checkout) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
	return checkout.url;
}

export async function createCustomerPortal({ userId, request }: { userId: string; request: Request }) {
	const { supabase } = getSupabaseWithHeaders({ request });

	const { data: user, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

	if (error || !user || !user.customer_id) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const customerPortal = await stripe.billingPortal.sessions.create({
		customer: user.customer_id,
		return_url: `${HOST_URL}/dashboard/settings/billing`,
	});

	if (!customerPortal) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
	return customerPortal.url;
}
