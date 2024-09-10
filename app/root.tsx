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
import {
	ThemeSwitcherSafeHTML,
	ThemeSwitcherScript,
} from "@/components/theme-switcher";

import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { useEffect, useState } from "react";
import "./globals.css";

export const loader = () => {
	const env = {
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
	};
	return { env };
};

function App({ children }: { children: React.ReactNode }) {
	const { env } = useLoaderData<{ env: any }>();

	const [supabase] = useState(() =>
		createBrowserClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
	);

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

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			revalidator.revalidate();
		});
		return () => {
			subscription?.unsubscribe();
		};
	}, [supabase, revalidator]);

	return (
		<ThemeSwitcherSafeHTML lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
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
				{children}
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
