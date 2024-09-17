import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { Outlet, useOutletContext } from "@remix-run/react";

export default function AuthLayout() {
	const { supabase } = useOutletContext<SupabaseOutletContext>();
	return (
		<main className="h-full px-8 sm:px-0">
			<Outlet context={{ supabase }} />
		</main>
	);
}
