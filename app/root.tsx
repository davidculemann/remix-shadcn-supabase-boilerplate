import { ErrorBoundaryContent } from "@/components/layout/error-boundary";
import { ClientHintCheck, getHints, useNonce, useTheme } from "@/lib/client-hints";
import { queryClient } from "@/lib/react-query/query-client";
import { useSupabase } from "@/lib/supabase/supabase";
import { getSupabaseEnv, getSupabaseWithSessionHeaders } from "@/lib/supabase/supabase.server";
import { getTheme } from "@/lib/theme.server";
import "@/styles/tailwind.css";
import type { LoaderFunctionArgs } from "@remix-run/node";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useFetcher,
	useLoaderData,
	useRouteError,
	useRouteLoaderData,
} from "@remix-run/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "cal-sans";
import clsx from "clsx";
import { useEffect } from "react";
import { GlobalPendingIndicator } from "./components/layout/global-pending-indicator";
import { Toaster } from "./components/ui/sonner";
import { isProductionHost, removeTrailingSlashes } from "./lib/docs-utils/http.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { session, headers } = await getSupabaseWithSessionHeaders({
		request,
	});
	const env = getSupabaseEnv();
	const completeEnv = process.env;

	removeTrailingSlashes(request);

	const isDevHost = !isProductionHost(request);
	const url = new URL(request.url);

	return json(
		{
			env,
			completeEnv,
			session,
			requestInfo: {
				hints: getHints(request),
				userPrefs: {
					theme: getTheme(request),
				},
			},
			host: url.host,
			isProductionHost: !isDevHost,
			noIndex: isDevHost,
		},
		{ headers },
	);
};

export default function App() {
	const { env, session } = useLoaderData<typeof loader>();
	const { supabase, isLoading, user } = useSupabase({ env, session });
	const fetcher = useFetcher();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.shiftKey && event.metaKey && event.key === "s") {
				fetcher.submit(null, { method: "post", action: "/signout" });
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [fetcher]);

	return (
		<Document>
			<Outlet context={{ supabase, isLoading, user }} />
		</Document>
	);
}

export function Document({ children }: { children: React.ReactNode }) {
	const loaderData = useRouteLoaderData<typeof loader>("root");
	const completeEnv = loaderData?.completeEnv;
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
				<GlobalPendingIndicator />
				<QueryClientProvider client={queryClient}>
					{children}
					<Toaster />
					{completeEnv?.SHOW_REACT_QUERY_DEVTOOLS && <ReactQueryDevtools buttonPosition="bottom-left" />}
				</QueryClientProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError() as Error;

	return (
		<Document>
			<ErrorBoundaryContent error={error} />
		</Document>
	);
}
