import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import type { Database } from "db_types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const headers = new Headers();

	const supabase = createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
		cookies: {
			getAll() {
				return parseCookieHeader(request.headers.get("Cookie") ?? "");
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) =>
					headers.append("Set-Cookie", serializeCookieHeader(name, value, options)),
				);
			},
		},
	});

	const { data } = await supabase.from("profiles").select();

	return new Response("...", {
		headers,
	});
};

export default function Dashboard() {
	const data = useLoaderData<typeof loader>();

	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
