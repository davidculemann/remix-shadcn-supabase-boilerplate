import { Icons } from "@/components/icons";
import { LoadingButton } from "@/components/shared/loading-button";
import ProviderLoginButton from "@/components/shared/provider-login-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";

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

export default function Signin() {
	const navigation = useNavigation();

	return (
		<Form method="POST" className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-full">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="m@example.com" required />
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
									Forgot your password?
								</Link>
							</div>
							<Input id="password" type="password" required />
						</div>
						<LoadingButton className="w-full" loading={navigation.state === "submitting"}>
							Sign in
						</LoadingButton>
						<ProviderLoginButton provider="google" />
						<ProviderLoginButton provider="github" />
					</div>
					<div className="mt-4 text-center text-sm">
						Don't have an account?
						<Link className="underline ml-2" to="/signup">
							Sign Up
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden bg-muted lg:block">
				<Icons.logo className="object-cover dark:brightness-[0.2] dark:grayscale m-auto" />
			</div>
		</Form>
	);
}
