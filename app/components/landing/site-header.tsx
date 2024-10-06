import { buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/lib/config/marketing";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/routes/resources.theme-toggle";
import { Link } from "@remix-run/react";
import MainNav from "./main-nav";

export default function SiteHeader() {
	return (
		<header className="container z-40 bg-background">
			<div className="flex h-20 items-center justify-between py-6">
				<MainNav items={marketingConfig.mainNav} />
				<span className="flex gap-6">
					<ThemeToggle />
					<nav>
						<Link to="/signin" className={cn(buttonVariants({ variant: "secondary" }), "px-4")}>
							Sign in
						</Link>
					</nav>
				</span>
			</div>
		</header>
	);
}
