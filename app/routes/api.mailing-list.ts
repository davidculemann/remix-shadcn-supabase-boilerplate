import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { type ActionFunctionArgs, json } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });
	const formData = await request.formData();
	const email = formData.get("email")?.toString();

	//TODO: Validate email address
	if (!email) {
		return json({ error: "Invalid email address" }, { status: 400 });
	}

	const { error } = await supabase.from("emails").insert({ email });

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}
	return json({ message: "Success" });
	//TODO: Success toast
}
