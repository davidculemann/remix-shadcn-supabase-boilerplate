import { GlobalPendingIndicator } from "@/components/global-pending-indicator";
import { Header } from "@/components/header";
import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { Outlet, useOutletContext } from "@remix-run/react";

export default function AuthLayout() {
	const { supabase } = useOutletContext<SupabaseOutletContext>();
	return (
		<>
			<GlobalPendingIndicator />
			<Header />
			<Outlet context={{ supabase }} />
		</>
	);
}
