import { cn } from "@/lib/utils";
import { PLANS } from "@/services/stripe/plans";
import type { Subscription } from "types/stripe";

export default function SubscriptionPlanPill({ subscription }: { subscription?: Subscription }) {
	const planId = subscription?.plan_id;
	return (
		<span
			className={cn(
				"flex h-5 items-center rounded-full px-2 text-xs font-medium",
				subscription?.plan_id === PLANS.PRO
					? "bg-subscription-pro text-subscription-pro-foreground"
					: "bg-subscription-free text-subscription-free-foreground",
			)}
		>
			{planId ? planId.charAt(0).toUpperCase() + planId.slice(1) : "Free"}
		</span>
	);
}
