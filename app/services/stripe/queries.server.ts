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

	const user = await supabase.user.findUnique({ where: { id: userId } });
	if (!user || user.customerId) throw new Error(ERRORS.STRIPE_CUSTOMER_NOT_CREATED);

	const email = user.email ?? undefined;
	const name = user.username ?? undefined;
	const customer = await stripe.customers.create({ email, name }).catch((err: any) => console.error(err));
	if (!customer) throw new Error(ERRORS.STRIPE_CUSTOMER_NOT_CREATED);

	await supabase.user.update({ where: { id: user.id }, data: { customerId: customer.id } });
	return true;
}

/**
 * Creates a Stripe free tier subscription for a user.
 */
export async function createFreeSubscription({
	userId,
	request,
}: {
	userId: string;
	request: Request;
}) {
	const { supabase } = getSupabaseWithHeaders({ request });

	const user = await supabase.user.findUnique({ where: { id: userId } });
	if (!user || !user.customerId) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const subscription = await supabase.subscription.findUnique({
		where: { userId: user.id },
	});
	if (subscription) return false;

	const currency = getLocaleCurrency(request);
	const plan = await supabase.plan.findUnique({
		where: { id: PLANS.FREE },
		include: { prices: true },
	});
	const yearlyPrice = plan?.prices.find(
		(price: { interval: string; currency: any }) => price.interval === "year" && price.currency === currency,
	);
	if (!yearlyPrice) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const stripeSubscription = await stripe.subscriptions.create({
		customer: String(user.customerId),
		items: [{ price: yearlyPrice.id }],
	});
	if (!stripeSubscription) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	await supabase.subscription.create({
		data: {
			id: stripeSubscription.id,
			userId: user.id,
			planId: String(stripeSubscription.items.data[0].plan.product),
			priceId: String(stripeSubscription.items.data[0].price.id),
			interval: String(stripeSubscription.items.data[0].plan.interval),
			status: stripeSubscription.status,
			currentPeriodStart: stripeSubscription.current_period_start,
			currentPeriodEnd: stripeSubscription.current_period_end,
			cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
		},
	});

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

	const user = await supabase.user.findUnique({ where: { id: userId } });
	if (!user || !user.customerId) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const subscription = await supabase.subscription.findUnique({
		where: { userId: user.id },
	});
	if (subscription?.planId !== PLANS.FREE) return;

	const currency = getLocaleCurrency(request);
	const plan = await supabase.plan.findUnique({
		where: { id: planId },
		include: { prices: true },
	});

	const price = plan?.prices.find(
		(price: { interval: string; currency: any }) => price.interval === planInterval && price.currency === currency,
	);
	if (!price) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const checkout = await stripe.checkout.sessions.create({
		customer: user.customerId,
		line_items: [{ price: price.id, quantity: 1 }],
		mode: "subscription",
		payment_method_types: ["card"],
		success_url: `${HOST_URL}/dashboard/checkout`,
		cancel_url: `${HOST_URL}/dashboard/settings/billing`,
	});
	if (!checkout) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
	return checkout.url;
}

/**
 * Creates a Stripe customer portal for a user.
 */
export async function createCustomerPortal({ userId, request }: { userId: string; request: Request }) {
	const { supabase } = getSupabaseWithHeaders({ request });

	const user = await supabase.user.findUnique({ where: { id: userId } });
	if (!user || !user.customerId) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);

	const customerPortal = await stripe.billingPortal.sessions.create({
		customer: user.customerId,
		return_url: `${HOST_URL}/dashboard/settings/billing`,
	});
	if (!customerPortal) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG);
	return customerPortal.url;
}
