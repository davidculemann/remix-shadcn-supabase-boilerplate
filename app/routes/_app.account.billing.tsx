import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { siteConfig } from "@/config/site";
import { INTENTS } from "@/lib/constants";
import { getSupabaseWithHeaders, requireUser } from "@/lib/supabase/supabase.server";
import { CURRENCIES, INTERVALS, type Interval, PLANS, PRICING_PLANS, type Plan } from "@/services/stripe/plans";
import { createCustomerPortal, createSubscriptionCheckout } from "@/services/stripe/queries.server";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import type { Currency, Subscription } from "types/stripe";

export const ROUTE_PATH = "/dashboard/settings/billing" as const;

export const meta: MetaFunction = () => {
	return [{ title: `${siteConfig.name} - Billing` }];
};

export async function action({ request }: ActionFunctionArgs) {
	const { supabase, headers } = getSupabaseWithHeaders({ request });

	const user = await requireUser({ supabase, headers });

	const formData = await request.formData();
	const intent = formData.get("intent");

	if (intent === INTENTS.SUBSCRIPTION_CREATE_CHECKOUT) {
		const planId = String(formData.get("planId"));
		const planInterval = String(formData.get("planInterval"));
		const checkoutUrl = await createSubscriptionCheckout({
			userId: user.id,
			planId,
			planInterval,
			request,
		});
		if (!checkoutUrl) return json({ success: false } as const);
		return redirect(checkoutUrl);
	}
	if (intent === INTENTS.SUBSCRIPTION_CREATE_CUSTOMER_PORTAL) {
		const customerPortalUrl = await createCustomerPortal({
			userId: user.id,
			request,
		});
		if (!customerPortalUrl) return json({ success: false } as const);
		return redirect(customerPortalUrl);
	}

	return json({});
}

export default function Billing() {
	const { subscription, currency } = useOutletContext<{ subscription: Subscription; currency: Currency }>();

	const [selectedPlanId, setSelectedPlanId] = useState<Plan>((subscription?.plan_id as Plan) ?? PLANS.FREE);
	const [selectedPlanInterval, setSelectedPlanInterval] = useState<Interval>(INTERVALS.MONTH);

	const isFreePlan = subscription?.plan_id === PLANS.FREE || !subscription;

	return (
		<div className="flex h-full w-full flex-col gap-6">
			<div className="flex w-full flex-col gap-2 p-6 py-2">
				<h2 className="text-xl font-medium">This is a demo app.</h2>
				<p className="text-sm font-normal text-muted-foreground">
					{siteConfig.name} is a demo app that uses Stripe test environment. You can find a list of test card
					numbers on the{" "}
					<a
						href="https://stripe.com/docs/testing#cards"
						target="_blank"
						rel="noreferrer"
						className="font-medium underline"
					>
						Stripe docs
					</a>
					.
				</p>
			</div>

			{/* Plans */}
			<div className="flex w-full flex-col items-start rounded-lg border border-border bg-card">
				<div className="flex flex-col gap-2 p-6">
					<h2 className="text-xl font-medium">Plan</h2>
					<p className="flex items-start gap-1 text-sm font-normal text-muted-foreground">
						You are currently on the{" "}
						<span className="flex h-[18px] items-center rounded-md bg-secondary px-1.5 text-sm font-medium">
							{subscription?.plan_id
								? subscription.plan_id.charAt(0).toUpperCase() + subscription.plan_id.slice(1)
								: "Free"}
						</span>
						plan.
					</p>
				</div>

				{isFreePlan && (
					<div className="flex w-full flex-col items-center justify-evenly gap-2 border-border p-6 pt-0">
						{Object.values(PRICING_PLANS).map((plan) => (
							<div
								key={plan.id}
								tabIndex={0}
								role="button"
								className={`flex w-full select-none items-center rounded-md border border-border hover:border-primary/60 ${
									selectedPlanId === plan.id && "border-primary/60 ring-1 ring-primary/60"
								}`}
								onClick={() => setSelectedPlanId(plan.id)}
								onKeyDown={(e) => {
									if (e.key === "Enter") setSelectedPlanId(plan.id);
								}}
							>
								<div className="flex w-full flex-col items-start p-4">
									<div className="flex items-center gap-2">
										<span className="text-base font-medium">{plan.name}</span>
										{plan.id !== PLANS.FREE && (
											<span className="flex items-center rounded-md bg-primary/10 px-1.5 text-sm font-medium text-primary/80">
												{currency === CURRENCIES.USD ? "$" : "€"}{" "}
												{selectedPlanInterval === INTERVALS.MONTH
													? plan.prices[INTERVALS.MONTH][currency] / 100
													: plan.prices[INTERVALS.YEAR][currency] / 100}{" "}
												/ {selectedPlanInterval === INTERVALS.MONTH ? "month" : "year"}
											</span>
										)}
									</div>
									<p className="text-start text-sm font-normal text-muted-foreground">
										{plan.description}
									</p>
								</div>

								{/* Billing Switch */}
								{plan.id !== PLANS.FREE && (
									<div className="flex items-center gap-2 px-4">
										<label
											htmlFor="interval-switch"
											className="text-start text-sm text-muted-foreground"
										>
											{selectedPlanInterval === INTERVALS.MONTH ? "Monthly" : "Yearly"}
										</label>
										<Switch
											id="interval-switch"
											checked={selectedPlanInterval === INTERVALS.YEAR}
											onCheckedChange={() =>
												setSelectedPlanInterval((prev: Interval) =>
													prev === INTERVALS.MONTH ? INTERVALS.YEAR : INTERVALS.MONTH,
												)
											}
										/>
									</div>
								)}
							</div>
						))}
					</div>
				)}

				{subscription?.plan_id && subscription.plan_id !== PLANS.FREE && (
					<div className="flex w-full flex-col items-center justify-evenly gap-2 border-border p-6 pt-0">
						<div className="flex w-full items-center overflow-hidden rounded-md border border-primary/60">
							<div className="flex w-full flex-col items-start p-4">
								<div className="flex items-end gap-2">
									<span className="text-base font-medium">
										{subscription.plan_id.charAt(0).toUpperCase() + subscription.plan_id.slice(1)}
									</span>
									<p className="flex items-start gap-1 text-sm font-normal text-muted-foreground">
										{subscription.cancel_at_period_end === true ? (
											<span className="flex h-[18px] items-center text-sm font-medium text-red-500">
												Expires
											</span>
										) : (
											<span className="flex h-[18px] items-center text-sm font-medium text-green-500">
												Renews
											</span>
										)}
										on:{" "}
										{new Date(subscription?.current_period_end ?? "").toLocaleDateString("en-US")}.
									</p>
								</div>
								<p className="text-start text-sm font-normal text-muted-foreground">
									{PRICING_PLANS[PLANS.PRO].description}
								</p>
							</div>
						</div>
					</div>
				)}

				<div className="flex min-h-14 w-full items-center justify-between rounded-lg rounded-t-none border-t border-border bg-secondary px-6 py-3 dark:bg-card">
					<p className="text-sm font-normal text-muted-foreground">
						You will not be charged for testing the subscription upgrade.
					</p>
					{isFreePlan && (
						<Form method="POST">
							<input type="hidden" name="intent" value={INTENTS.SUBSCRIPTION_CREATE_CHECKOUT} />
							<input type="hidden" name="planId" value={selectedPlanId} />
							<input type="hidden" name="planInterval" value={selectedPlanInterval} />
							<Button type="submit" size="sm" disabled={selectedPlanId === PLANS.FREE}>
								Upgrade to PRO
							</Button>
						</Form>
					)}
				</div>
			</div>

			{/* Manage Subscription */}
			<div className="flex w-full flex-col items-start rounded-lg border border-border bg-card">
				<div className="flex flex-col gap-2 p-6">
					<h2 className="text-xl font-medium">Manage Subscription</h2>
					<p className="flex items-start gap-1 text-sm font-normal text-muted-foreground">
						Update your payment method, billing address, and more.
					</p>
				</div>

				<div className="flex min-h-14 w-full items-center justify-between rounded-lg rounded-t-none border-t border-border bg-secondary px-6 py-3 dark:bg-card">
					<p className="text-sm font-normal text-muted-foreground">
						You will be redirected to the Stripe Customer Portal.
					</p>
					<Form method="POST">
						<Button
							type="submit"
							size="sm"
							name={INTENTS.INTENT}
							value={INTENTS.SUBSCRIPTION_CREATE_CUSTOMER_PORTAL}
						>
							Manage
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}
