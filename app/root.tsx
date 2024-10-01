import { Links, Meta, Outlet, Scripts, ScrollRestoration, json, useLoaderData } from "@remix-run/react";

import { ThemeSwitcherSafeHTML, ThemeSwitcherScript } from "@/components/theme-switcher";

import { Toaster } from "@/components/ui/toaster";
import "@/globals.css";
import { queryClient } from "@/lib/react-query/query-client";
import { useSupabase } from "@/lib/supabase/supabase";
import { getSupabaseEnv, getSupabaseWithSessionHeaders } from "@/lib/supabase/supabase.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "cal-sans";

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
				<link rel="icon" type="image/svg+xml" href="/assets/logo.svg" />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<ThemeSwitcherScript />
			</head>
			<body className="flex min-h-screen h-screen w-full flex-col bg-muted/40">
				<QueryClientProvider client={queryClient}>
					<Outlet context={{ supabase }} />
					<ScrollRestoration />
					<Scripts />
					<Toaster />
					<ReactQueryDevtools />
				</QueryClientProvider>
			</body>
		</ThemeSwitcherSafeHTML>
	);
}
