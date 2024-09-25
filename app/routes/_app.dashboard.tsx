import { requireUser } from "@/lib/supabase/supabase";
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	const { supabase, headers } = getSupabaseWithHeaders({ request });
	await requireUser({ supabase, headers });

	const { data } = await supabase.auth.getSession();

	return { user: data?.session?.user };
}

export default function Dashboard() {
	const { user } = useLoaderData<typeof loader>();

	return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
