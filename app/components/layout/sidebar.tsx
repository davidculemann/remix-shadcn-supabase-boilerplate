import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Link } from "@remix-run/react";
import { Icons } from "../icons";
import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";

export function Sidebar() {
	const sidebar = useStore(useSidebarToggle, (state) => state);

	if (!sidebar) return null;

	return (
		<aside
			className={cn(
				"fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
				sidebar?.isOpen === false ? "w-[90px]" : "w-72",
			)}
		>
			<SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
			<div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
				<Button
					className={cn(
						"transition-transform ease-in-out duration-300 mb-1",
						sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
					)}
					variant="link"
					asChild
				>
					<Link to="/" className="flex items-center gap-2">
						<Icons.logo />
						<h1
							className={cn(
								"font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 text-logo",
								sidebar?.isOpen === false
									? "-translate-x-96 opacity-0 hidden"
									: "translate-x-0 opacity-100",
							)}
						>
							{siteConfig.name}
						</h1>
					</Link>
				</Button>
				<Menu isOpen={sidebar?.isOpen} />
			</div>
		</aside>
	);
}
