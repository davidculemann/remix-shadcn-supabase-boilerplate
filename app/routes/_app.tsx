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
import { getLocaleCurrency } from "@/services/stripe/stripe.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { Fragment } from "react";
import { toast } from "sonner";

type LoaderSuccess = {
	profile: any;
	subscription: any;
	currency: ReturnType<typeof getLocaleCurrency>;
};

type LoaderError =
	| {
			message: string;
	  }
	| {
			sessionAvailable: false;
	  };

export async function loader({ request }: LoaderFunctionArgs) {
	const { supabase, headers } = getSupabaseWithHeaders({ request });
	const url = new URL(request.url);
	const code = url.searchParams.get("code");

	// If there's a code parameter, we're in an OAuth callback
	if (code) {
		try {
			const { error } = await supabase.auth.exchangeCodeForSession(code);
			if (error) throw error;
			// Redirect to clean URL after successful exchange
			return redirect("/dashboard", { headers });
		} catch (error: any) {
			return json<LoaderError>({ message: error?.message || "Authentication failed" }, { status: 400 });
		}
	}

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return json<LoaderError>({ sessionAvailable: false }, { status: 401 });
	}

	const { data: profile, error: profileError } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.single();

	if (profileError || !profile) {
		return json<LoaderError>({ message: profileError?.message || "Could not get profile" }, { status: 400 });
	}

	const { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single();

	const currency = getLocaleCurrency(request);

	return json<LoaderSuccess>({ profile, subscription, currency }, { headers });
}

export default function AuthLayout() {
	const loaderData = useLoaderData<typeof loader>();
	const { supabase, isLoading, user } = useOutletContext<SupabaseOutletContext>();
	const { breadcrumbs, activePage } = useCurrentPage();
	const navigate = useNavigate();

	if ("sessionAvailable" in loaderData && !loaderData.sessionAvailable) {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!session) return navigate("/signin");
		});
	}
	if ("message" in loaderData) {
		toast.error(loaderData.message);
		return navigate("/signin");
	}

	if (isLoading || !user) {
		return <PageLoading />;
	}

	const { profile, subscription, currency } = loaderData as LoaderSuccess;

	return (
		<AdminPanelLayout>
			<ContentLayout title={activePage!.label} {...{ subscription }}>
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
