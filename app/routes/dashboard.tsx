import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { Database } from "db_types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const response = new Response();
	const supabase = createServerClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{ request, response }
	);

	const { data } = await supabase.from("profiles").select();

	return {
		data,
		headers: response.headers,
	};
};

export default function Dashboard() {
	const data = useLoaderData<typeof loader>();

	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
