import SiteFooter from "@/components/landing/site-footer";
import SiteHeader from "@/components/landing/site-header";
import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { Outlet, useOutletContext } from "@remix-run/react";

export default function MarketingLayout() {
	const { supabase } = useOutletContext<SupabaseOutletContext>();
	return (
		<div className="flex min-h-screen flex-col">
			<SiteHeader />
			<Outlet context={{ supabase }} />
			<SiteFooter />
		</div>
	);
}
