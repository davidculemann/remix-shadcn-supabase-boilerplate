import { Links, Meta, Outlet, Scripts, ScrollRestoration, json, useLoaderData } from "@remix-run/react";

import { ThemeSwitcherSafeHTML, ThemeSwitcherScript } from "@/components/theme-switcher";

import type { LoaderFunctionArgs } from "@remix-run/node";
import "./globals.css";
import { useSupabase } from "./lib/supabase/supabase";
import { getSupabaseEnv, getSupabaseWithSessionHeaders } from "./lib/supabase/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { session, headers } = await getSupabaseWithSessionHeaders({
		request,
	});
	const env = getSupabaseEnv();
	return json({ env, session }, { headers });
};

export default function App() {
	const { env, session } = useLoaderData<typeof loader>();

	const { supabase } = useSupabase({ env, session });

	return (
		<ThemeSwitcherSafeHTML lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<ThemeSwitcherScript />
			</head>
			<body className="flex min-h-screen w-full flex-col bg-muted/40">
				<Outlet context={{ supabase }} />
				<ScrollRestoration />
				<Scripts />
			</body>
		</ThemeSwitcherSafeHTML>
	);
}
