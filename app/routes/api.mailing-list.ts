import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { validateEmail } from "@/lib/utils";
import { type ActionFunctionArgs, json } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });
	const formData = await request.formData();
	const email = formData.get("email")?.toString();
	const isEmailValid = validateEmail(email);

	if (!isEmailValid) return json({ error: "Invalid email address.", code: "INVALID_EMAIL" }, { status: 400 });

	const { error } = await supabase.from("emails").insert({ email });

	if (error) return json({ error: error.message, code: "DATABASE_ERROR" }, { status: 500 });

	return json({ message: "Success" });
}
