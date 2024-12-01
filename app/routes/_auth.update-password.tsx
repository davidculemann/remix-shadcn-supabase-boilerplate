import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { enterLeftAnimation } from "@/lib/framer/animations";
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { validateEmail } from "@/lib/utils";
import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
	return [{ title: "Update password" }];
};

type ActionResponse = { success: true; message: string } | { success: false; message: string };

export async function action({ request }: LoaderFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });

	const formData = await request.formData();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirm-password") as string;

	if (!password || !confirmPassword || typeof password !== "string" || typeof confirmPassword !== "string") {
		return json<ActionResponse>(
			{
				success: false,
				message: "Form not submitted correctly.",
			},
			{ status: 400 },
		);
	}
	if (password !== confirmPassword) {
		return json<ActionResponse>(
			{
				success: false,
				message: "Passwords do not match.",
			},
			{ status: 400 },
		);
	}

	if (!validateEmail(email)) {
		return json<ActionResponse>({ success: false, message: "Invalid email address." }, { status: 400 });
	}

	if (!password) {
		return json<ActionResponse>({ success: false, message: "Password is required." }, { status: 400 });
	}

	const { error } = await supabase.auth.updateUser({
		password,
		email,
	});

	if (error) {
		return json<ActionResponse>({ success: false, message: error.message }, { status: 400 });
	}

	return json<ActionResponse>({ success: true, message: "Successfully updated password." });
}

export default function UpdatePassword() {
	const actionData = useActionData<ActionResponse>();
	const [searchParams] = useSearchParams();
	const email = decodeURIComponent(searchParams.get("email") || "");

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
					Update your password
				</h2>
			</div>
			<Form className="space-y-6" method="POST">
				<div className="flex flex-col gap-4">
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
						defaultValue={email}
					/>
					<Label htmlFor="password" className="sr-only">
						New password
					</Label>
					<Input
						id="password"
						name="password"
						type="password"
						autoComplete="new-password"
						required
						placeholder="New password"
					/>
					<Label htmlFor="confirm-password" className="sr-only">
						Confirm password
					</Label>
					<Input
						id="confirm-password"
						name="confirm-password"
						type="password"
						required
						placeholder="Confirm password"
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
