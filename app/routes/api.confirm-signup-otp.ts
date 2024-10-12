import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { type LoaderFunctionArgs, json } from "@remix-run/node";

export async function action({ request }: LoaderFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });
	const formData = await request.formData();
	const otp = formData.get("otp") as string;
	const email = formData.get("email") as string;

	const { error } = await supabase.auth.verifyOtp({
		token: otp,
		email,
		type: "signup",
	});

	if (error) {
		return json({ message: error.message }, { status: 400 });
	}

	return json({ message: "Success!" }, { status: 200 });
}
