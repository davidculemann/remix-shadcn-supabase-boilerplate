import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLoaderData,
	useRevalidator,
	useRouteError,
} from "@remix-run/react";

import { GlobalPendingIndicator } from "@/components/global-pending-indicator";
import { Header } from "@/components/header";
import { ThemeSwitcherSafeHTML, ThemeSwitcherScript } from "@/components/theme-switcher";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import "./globals.css";

export const loader = ({}: LoaderFunctionArgs) => {
	const env = {
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
	};
	return { env };
};

export const SupabaseContext = createContext<{ supabase: SupabaseClient<any, "public", any> | null }>({
	supabase: null,
});

function App({ children }: { children: React.ReactNode }) {
	const { env } = useLoaderData<typeof loader>();

	const [supabase] = useState(() => createBrowserClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!));
	const signUp = () => {
		supabase.auth.signUp({
			email: "",
			password: "",
		});
	};

	const signIn = () => {
		supabase.auth.signInWithPassword({
			email: "",
			password: "",
		});
	};

	const signOut = () => {
		supabase.auth.signOut();
	};

	const revalidator = useRevalidator();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			revalidator.revalidate();
		});
		return () => {
			subscription?.unsubscribe();
		};
	}, [supabase]); //NOTE: had to remove revalidator from the dep array to prevent infinite loop

	return (
		<ThemeSwitcherSafeHTML lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<ThemeSwitcherScript />
			</head>
			<body>
				<GlobalPendingIndicator />
				<Header />
				<button onClick={signUp}>Sign Up</button>
				<button onClick={signIn}>Sign Up</button>
				<button onClick={signOut}>Sign Up</button>
				<SupabaseContext.Provider value={{ supabase }}>{children}</SupabaseContext.Provider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</ThemeSwitcherSafeHTML>
	);
}

export default function Root() {
	return (
		<App>
			<Outlet />
		</App>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	let status = 500;
	let message = "An unexpected error occurred.";
	if (isRouteErrorResponse(error)) {
		status = error.status;
		switch (error.status) {
			case 404:
				message = "Page Not Found";
				break;
		}
	} else {
		console.error(error);
	}

	return (
		<App>
			<div className="container prose py-8">
				<h1>{status}</h1>
				<p>{message}</p>
			</div>
		</App>
	);
}
