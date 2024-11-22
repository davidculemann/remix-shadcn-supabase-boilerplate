import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useLockBody } from "@/hooks/use-lock-body";
import type { MainNavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link } from "@remix-run/react";

interface MobileNavProps {
	items: MainNavItem[];
	children?: React.ReactNode;
	setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileNav({ items, children, setShowMobileMenu }: MobileNavProps) {
	useLockBody();

	return (
		<div
			className={cn(
				"fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden",
			)}
		>
			<div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
				<Link to="/" className="flex items-center space-x-2">
					<Icons.logo />
					<span className="font-bold text-logo text-lg">{siteConfig.name}</span>
				</Link>
				<nav className="grid grid-flow-row auto-rows-max text-sm">
					{items.map((item) => (
						<Link
							key={item.href}
							to={item.disabled ? "#" : item.href}
							onClick={() => setShowMobileMenu(false)}
							className={cn(
								"flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
								item.disabled && "cursor-not-allowed opacity-60",
							)}
						>
							{item.title}
						</Link>
					))}
				</nav>
				{children}
			</div>
		</div>
	);
}
