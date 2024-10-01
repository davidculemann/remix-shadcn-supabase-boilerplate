import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
	const { supabase, headers } = getSupabaseWithHeaders({ request });

	//await requireUser({ supabase, headers });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user;
}

export default function Dashboard() {
	const user = useLoaderData<typeof loader>();
	console.log(user, typeof user);
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Await resolve={user}>
				<pre>{JSON.stringify(user, null, 2)}</pre>
			</Await>
		</Suspense>
	);
}
