import { LoadingButton } from "@/components/shared/loading-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

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
	return (
		<div className="w-full max-w-md">
			<Form method="POST">
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-3xl font-bold">Sign In</CardTitle>
						<CardDescription>Enter your details to sign in to your account</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="text" placeholder="username or email" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" placeholder="password" />
						</div>
					</CardContent>
					<CardFooter className="flex flex-col gap-3">
						<LoadingButton className="w-full">Sign in</LoadingButton>
						{/* <ProviderLoginButton provider="google" signInFn={signInWithGoogle} /> */}
					</CardFooter>
				</Card>
				<div className="mt-4 text-center text-sm">
					Don't have an account?
					<Link className="underline ml-2" to="/signup">
						Sign Up
					</Link>
				</div>
			</Form>
		</div>
	);
}
