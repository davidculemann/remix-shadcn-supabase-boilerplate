import { Button } from "@/components/ui/button";
import { PROTECTED_ROUTES } from "@/config.shared";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, useLocation, useNavigate, useRevalidator } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "db_types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type SupabaseOutletContext = {
	supabase: TypedSupabaseClient;
	domainUrl?: string;
	isLoading?: boolean;
	user?: User | null;
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
	const revalidator = useRevalidator();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [supabase] = useState(() => createBrowserClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!));
	const [user, setUser] = useState<User | null>(session?.user ?? null);
	const [isLoading, setIsLoading] = useState(true);

	const serverAccessToken = session?.access_token;

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === "SIGNED_IN") {
				setUser(session?.user ?? null);
			} else if (event === "SIGNED_OUT") {
				setUser(null);
			}
			if (!session?.user && PROTECTED_ROUTES.includes(pathname)) {
				navigate("/signin");
				toast.error("Please sign in to view this content.", {
					duration: Infinity,
					closeButton: true,
					action: (
						<Button asChild variant="outline">
							<Link to="/signin">
								Sign in <ArrowRightIcon />
							</Link>
						</Button>
					),
				});
			}

			if (session?.access_token !== serverAccessToken) {
				revalidator.revalidate();
			}

			setIsLoading(false);
		});

		// Ensure the initial loading state is set correctly
		if (session?.user) {
			setUser(session.user);
			setIsLoading(false);
		} else {
			setIsLoading(false);
		}

		return () => {
			subscription.unsubscribe();
		};
	}, [supabase, serverAccessToken, revalidator, navigate, pathname, session?.user]);

	return { supabase, user, isLoading };
};
