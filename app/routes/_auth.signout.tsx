import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { getSupabaseWithHeaders } from "../lib/supabase/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
	const { supabase, headers } = getSupabaseWithHeaders({ request });
	await supabase.auth.signOut();
	return redirect("/signin", { headers });
}

export const loader = () => redirect("/");
