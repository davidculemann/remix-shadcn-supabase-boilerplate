import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { ThemeToggle } from "@/routes/resources.theme-toggle";
import { Link, useOutletContext } from "@remix-run/react";
import { Icons } from "../icons";
import { UserAccountNav } from "./user-account-nav";

export default function AppHeader() {
	const { user } = useOutletContext<SupabaseOutletContext>();
	const userMetaData = user?.user_metadata;

	return (
		<header className="container z-40 bg-background">
			<div className="flex h-20 items-center justify-between py-6">
				<Link to="/dashboard" className="flex items-center space-x-2">
					<Icons.logo />
				</Link>
				<span className="flex gap-6">
					<ThemeToggle />
					{userMetaData && <UserAccountNav user={userMetaData} />}
				</span>
			</div>
		</header>
	);
}
