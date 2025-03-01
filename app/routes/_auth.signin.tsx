import { Icons } from "@/components/icons";
import { LoadingButton } from "@/components/shared/loading-button";
import ProviderLoginButton from "@/components/shared/provider-login-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { enterLeftAnimation } from "@/lib/framer/animations";
import { forbidUser, getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { type ActionFunctionArgs, type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";

export async function loader({ request }: LoaderFunctionArgs) {
	const { supabase, headers } = getSupabaseWithHeaders({ request });
	await forbidUser({ supabase, headers, redirectTo: "/dashboard" });
	return null;
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const { supabase, headers } = getSupabaseWithHeaders({ request });

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return json({ message: error.message }, { status: 400 });
	}

	return redirect("/dashboard", { headers });
}

type ActionStatus = {
	success: boolean;
	message: string;
};

export default function SignIn() {
	const navigation = useNavigation();

	const actionData = useActionData<ActionStatus | undefined>(); // Hook to retrieve action response

	useEffect(() => {
		if (actionData) toast.success(actionData.message);
	}, [actionData]);

	return (
		<motion.div {...enterLeftAnimation} layout="position">
			<Form method="POST" className="mx-auto grid w-[350px] gap-6">
				<Icons.logo className="lg:hidden h-12 mx-auto" />
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">Welcome back</h1>
					<p className="text-balance text-muted-foreground">Enter your email and password</p>
				</div>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="email@example.com"
							required
							autoComplete="email"
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
								Forgot your password?
							</Link>
						</div>
						<Input id="password" type="password" name="password" autoComplete="current-password" required />
					</div>
					<LoadingButton className="w-full" loading={navigation.state === "submitting"}>
						Sign in
					</LoadingButton>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
						</div>
					</div>
					<ProviderLoginButton provider="google" />
					<ProviderLoginButton provider="github" />
				</div>
				<div className="mt-4 text-center text-sm">
					Don't have an account?
					<Link className="underline ml-2" to="/signup">
						Sign Up
					</Link>
				</div>
			</Form>
		</motion.div>
	);
}
