import { buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/lib/config/marketing";
import { cn } from "@/lib/styles";
import { Link } from "@remix-run/react";
import ModeToggle from "../shared/mode-toggle";
import MainNav from "./main-nav";

export default function SiteHeader() {
	return (
		<header className="container z-40 bg-background">
			<div className="flex h-20 items-center justify-between py-6">
				<MainNav items={marketingConfig.mainNav} />
				<span className="flex gap-6">
					<ModeToggle />
					<nav>
						<Link to="/signin" className={cn(buttonVariants({ variant: "secondary" }), "px-4")}>
							Login
						</Link>
					</nav>
				</span>
			</div>
		</header>
	);
}
