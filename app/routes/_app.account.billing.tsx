import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user;
}

export default function Billing() {
	const user = useLoaderData<typeof loader>();

	return <div className="flex flex-col pt-4"></div>;
}
