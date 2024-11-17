import AdminPanelLayout from "@/components/layout/admin-panel-layout";
import { ContentLayout } from "@/components/layout/content-layout";
import PageLoading from "@/components/shared/page-loading";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCurrentPage } from "@/hooks/use-current-page";
import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { Link, Outlet, useNavigate, useOutletContext } from "@remix-run/react";
import { Fragment } from "react";

export default function AuthLayout() {
	const { supabase, isLoading, user } = useOutletContext<SupabaseOutletContext>();

	const { breadcrumbs, activePage } = useCurrentPage();

	if (isLoading || !user) {
		return <PageLoading />;
	}

	return (
		<AdminPanelLayout>
			<ContentLayout title={activePage!.label}>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						{breadcrumbs?.map(({ href, label }) => (
							<Fragment key={label}>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									{label !== activePage!.label ? (
										<BreadcrumbLink asChild>
											<Link to={href}>{label}</Link>
										</BreadcrumbLink>
									) : (
										<BreadcrumbPage>{label}</BreadcrumbPage>
									)}
								</BreadcrumbItem>
							</Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
				<Outlet context={{ supabase }} />
			</ContentLayout>
		</AdminPanelLayout>
	);
}
