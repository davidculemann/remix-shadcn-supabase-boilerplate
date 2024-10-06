import SiteFooter from "@/components/landing/site-footer";
import AppHeader from "@/components/layout/app-header";
import { GlobalPendingIndicator } from "@/components/layout/global-pending-indicator";
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
			<AppHeader />
			<div className="h-full">
				<Outlet context={{ supabase }} />
			</div>
			<SiteFooter />
		</>
	);
}
