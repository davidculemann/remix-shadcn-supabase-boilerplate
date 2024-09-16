import MainNav from "@/components/landing/main-nav";
import SiteFooter from "@/components/landing/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/lib/config/marketing";
import { cn } from "@/lib/styles";
import { Link, Outlet } from "@remix-run/react";

export default function MarketingLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="container z-40 bg-background">
				<div className="flex h-20 items-center justify-between py-6">
					<MainNav items={marketingConfig.mainNav} />
					<nav>
						<Link to="/signin" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-4")}>
							Login
						</Link>
					</nav>
				</div>
			</header>
			<Outlet />
			<SiteFooter />
		</div>
	);
}
