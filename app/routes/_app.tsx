import SiteFooter from "@/components/landing/site-footer";
import AppHeader from "@/components/layout/app-header";
import { GlobalPendingIndicator } from "@/components/layout/global-pending-indicator";
import PageLoading from "@/components/shared/page-loading";
import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { Outlet, useFetcher, useOutletContext } from "@remix-run/react";

export default function AuthLayout() {
	const { supabase, isLoading, user } = useOutletContext<SupabaseOutletContext>();
	const fetcher = useFetcher();

	if (isLoading || !user) {
		return <PageLoading />;
	}

	return (
		<>
			<GlobalPendingIndicator />
			<AppHeader />
			<Outlet context={{ supabase }} />
			<SiteFooter />
		</>
	);
}
