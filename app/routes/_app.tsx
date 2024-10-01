import { GlobalPendingIndicator } from "@/components/global-pending-indicator";
import { Header } from "@/components/header";
import PageLoading from "@/components/shared/page-loading";
import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { Outlet, useOutletContext } from "@remix-run/react";

export default function AuthLayout() {
	const { supabase, isLoading, user } = useOutletContext<SupabaseOutletContext>();

	if (isLoading || !user) {
		return <PageLoading />;
	}
	return (
		<>
			<GlobalPendingIndicator />
			<Header />
			<Outlet context={{ supabase }} />
		</>
	);
}
