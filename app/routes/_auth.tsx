import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/styles";
import { type SupabaseOutletContext, forbidUser } from "@/lib/supabase/supabase";
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useOutletContext } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });
	await forbidUser({ supabase, redirectTo: "/dashboard" });

	const { data } = await supabase.auth.getSession();

	return { user: data?.session?.user };
}

export default function AuthLayout() {
	const { supabase } = useOutletContext<SupabaseOutletContext>();
	return (
		<main className="h-full px-8 sm:px-0">
			<Link
				to="/"
				className={cn(buttonVariants({ variant: "ghost" }), "absolute left-4 top-4 md:left-8 md:top-8")}
			>
				<>
					<Icons.chevronLeft className="mr-2 h-4 w-4" />
					Back
				</>
			</Link>
			<Outlet context={{ supabase }} />
		</main>
	);
}
