import * as React from "react";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config/site";
import type { MainNavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@remix-run/react";
import { MobileNav } from "./mobile-nav";

interface MainNavProps {
	items?: MainNavItem[];
	children?: React.ReactNode;
}

export default function MainNav({ items, children }: MainNavProps) {
	const { pathname } = useLocation();
	const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

	return (
		<div className="flex gap-6 md:gap-10">
			<Link to="/" className="hidden items-center space-x-2 md:flex">
				<Icons.logo />
				<span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
			</Link>
			{items?.length ? (
				<nav className="hidden gap-6 md:flex">
					{items?.map((item) => (
						<Link
							key={item.href}
							to={item.disabled ? "#" : item.href}
							className={cn(
								"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
								item.href.startsWith(`/${pathname}`) ? "text-foreground" : "text-foreground/60",
								item.disabled && "cursor-not-allowed opacity-80",
							)}
						>
							{item.title}
						</Link>
					))}
				</nav>
			) : null}
			<button
				className="flex items-center space-x-2 md:hidden"
				onClick={() => setShowMobileMenu(!showMobileMenu)}
			>
				{showMobileMenu ? <Icons.close /> : <Icons.logo />}
				<span className="font-bold">Menu</span>
			</button>
			{showMobileMenu && items && <MobileNav items={items}>{children}</MobileNav>}
		</div>
	);
}
