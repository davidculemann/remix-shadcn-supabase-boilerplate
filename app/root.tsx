import { Links, Meta, Outlet, Scripts, ScrollRestoration, json, useLoaderData } from "@remix-run/react";

import { Toaster } from "@/components/ui/toaster";
import { ClientHintCheck, getHints, useNonce, useTheme } from "@/lib/client-hints";
import { queryClient } from "@/lib/react-query/query-client";
import { useSupabase } from "@/lib/supabase/supabase";
import { getSupabaseEnv, getSupabaseWithSessionHeaders } from "@/lib/supabase/supabase.server";
import { getTheme } from "@/lib/theme.server";
import "@/tailwind.css";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "cal-sans";
import clsx from "clsx";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { session, headers } = await getSupabaseWithSessionHeaders({
		request,
	});
	const env = getSupabaseEnv();
	return json(
		{
			env,
			session,
			requestInfo: {
				hints: getHints(request),
				userPrefs: {
					theme: getTheme(request),
				},
			},
		},
		{ headers },
	);
};

export default function App() {
	const { env, session } = useLoaderData<typeof loader>();

	const { supabase, isLoading, user } = useSupabase({ env, session });

	const theme = useTheme();
	const nonce = useNonce();

	return (
		<html lang="en" className={clsx(theme)}>
			<head>
				<link rel="icon" type="image/svg+xml" href="/assets/logo.svg" />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<ClientHintCheck nonce={nonce} />
			</head>
			<body className="flex min-h-screen h-screen w-full flex-col">
				<QueryClientProvider client={queryClient}>
					<Outlet context={{ supabase, isLoading, user }} />
					<Toaster />
					<ReactQueryDevtools buttonPosition="bottom-left" />
				</QueryClientProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
