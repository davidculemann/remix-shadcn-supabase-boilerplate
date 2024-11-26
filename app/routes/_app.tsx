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
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { Link, Outlet, useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { Fragment } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getLocaleCurrency } from "@/services/stripe/stripe.server";
import { useToast } from "@/components/hooks/use-toast";

export async function loader({ request }: LoaderFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) throw redirect("/signin");

	const { data: profile, error: profileError } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.single();
	const { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single();

	const currency = getLocaleCurrency(request);

	if (profileError || !profile)
		return json({ message: profileError?.message || "Could not get profile" }, { status: 400 });

	return { profile, subscription, currency };
}

export default function AuthLayout() {
	const loaderData = useLoaderData<typeof loader>();
	const { supabase, isLoading, user } = useOutletContext<SupabaseOutletContext>();
	const { breadcrumbs, activePage } = useCurrentPage();
	const { toast } = useToast();
	const navigate = useNavigate();

	if ("message" in loaderData) {
		toast({
			variant: "destructive",
			description: loaderData.message,
		});
		return navigate("/signin");
	}

	const { profile, subscription, currency } = loaderData;

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
				<Outlet context={{ supabase, profile, subscription, currency }} />
			</ContentLayout>
		</AdminPanelLayout>
	);
}
