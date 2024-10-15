import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { enterLeftAnimation } from "@/lib/framer/animations";
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { validateEmail } from "@/lib/utils";
import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
	return [{ title: "Forgot password" }];
};

export async function action({ request }: LoaderFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });
	const formData = await request.formData();
	const email = formData.get("email") as string;

	if (!validateEmail(email)) {
		return json({ message: "Invalid email address." }, { status: 400 });
	}

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${request.headers.get("origin")}/profile/update-password`,
	});

	if (error) {
		return json({ message: error.message }, { status: 400 });
	}

	return json({ success: true, message: "Check your email for the reset link." });
}

type ActionStatus = {
	success: boolean;
	message: string;
};

export default function ForgotPassword() {
	const actionData = useActionData<ActionStatus | undefined>();
	const { toast } = useToast();

	useEffect(() => {
		if (actionData)
			toast({
				variant: actionData?.success ? "default" : "destructive",
				description: actionData.message,
			});
	}, [actionData]);

	return (
		<motion.div {...enterLeftAnimation} className="mx-auto grid w-[350px] gap-6">
			<div>
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
					Forgot your password?
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
					Enter the email address associated with your account and we'll send you a link to reset your
					password.
				</p>
			</div>
			<Form className="space-y-6" method="POST">
				<div>
					<Label htmlFor="email" className="sr-only">
						Email address
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder="Email address"
					/>
				</div>
				<Button type="submit" className="w-full">
					Reset
				</Button>
			</Form>
			<div className="flex justify-center">
				<Link to="/signin" className="underline ml-2 text-sm">
					Back to sign in
				</Link>
			</div>
		</motion.div>
	);
}
