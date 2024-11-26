import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { ThemeToggle } from "@/routes/resources.theme-toggle";
import { useOutletContext } from "@remix-run/react";
import { SheetMenu } from "./sheet-menu";
import { UserAccountNav } from "./user-account-nav";
import type { Subscription } from "types/stripe";
import { cn } from "@/lib/utils";
import { PLANS } from "@/services/stripe/plans";

interface NavbarProps {
	title: string;
	subscription?: Subscription;
}

export function Navbar({ title, subscription }: NavbarProps) {
	const { user } = useOutletContext<SupabaseOutletContext>();
	const userMetaData = user?.user_metadata;
	const planId = subscription?.plan_id;

	return (
		<header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
			<div className="mx-4 sm:mx-8 flex h-14 items-center">
				<div className="flex items-center space-x-4 lg:space-x-0">
					<SheetMenu />
					<h1 className="font-bold">{title}</h1>
				</div>
				<span className="gap-4 flex flex-1 items-center justify-end">
					<ThemeToggle />
					<span className="gap-2 flex items-center">
						{userMetaData && <UserAccountNav user={userMetaData} />}
						<span
							className={cn(
								"flex h-5 items-center rounded-full px-2 text-xs font-medium",
								subscription?.plan_id === PLANS.PRO
									? "bg-subscription-pro text-subscription-pro-foreground"
									: "bg-subscription-free text-subscription-free-foreground",
							)}
						>
							{(planId && planId.charAt(0).toUpperCase() + planId.slice(1)) || "Free"}
						</span>
					</span>
				</span>
			</div>
		</header>
	);
}
