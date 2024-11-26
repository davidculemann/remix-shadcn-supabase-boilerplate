import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { ThemeToggle } from "@/routes/resources.theme-toggle";
import { useOutletContext } from "@remix-run/react";
import { SheetMenu } from "./sheet-menu";
import { UserAccountNav } from "./user-account-nav";

interface NavbarProps {
	title: string;
	planId?: string;
}

export function Navbar({ title, planId }: NavbarProps) {
	const { user } = useOutletContext<SupabaseOutletContext>();
	const userMetaData = user?.user_metadata;

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
						<span className="flex h-5 items-center rounded-full bg-primary/10 px-2 text-xs font-medium text-primary/80">
							{(planId && planId.charAt(0).toUpperCase() + planId.slice(1)) || "Free"}
						</span>
					</span>
				</span>
			</div>
		</header>
	);
}
