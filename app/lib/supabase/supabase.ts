import { PROTECTED_ROUTES } from "@/config.shared";
import { useLocation, useNavigate, useRevalidator } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "db_types";
import { useEffect, useState } from "react";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type SupabaseOutletContext = {
	supabase: TypedSupabaseClient;
	domainUrl?: string;
	isLoading?: boolean;
};

type SupabaseEnv = {
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
};

type UseSupabase = {
	env: SupabaseEnv;
	session: Session | null;
};

export const useSupabase = ({ env, session }: UseSupabase) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [supabase] = useState(() => createBrowserClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!));
	const revalidator = useRevalidator();
	const [user, setUser] = useState<User | null>();
	const [isLoading, setIsLoading] = useState(true);

	const serverAccessToken = session?.access_token;

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log("Auth event happened: ", event, session);
			if (event === "SIGNED_IN") {
				setUser(session?.user ?? null);
			} else if (event === "SIGNED_OUT") {
				setUser(null);
			}

			if (!session?.user && PROTECTED_ROUTES.includes(pathname)) {
				navigate("/signin");
			}

			if (session?.access_token !== serverAccessToken) {
				revalidator.revalidate();
			}

			setIsLoading(false);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase, serverAccessToken, revalidator, navigate, pathname]);

	return { supabase, user, isLoading };
};
