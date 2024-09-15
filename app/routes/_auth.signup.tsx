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
	const { supabase } = getSupabaseWithHeaders({ request });

	const { error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		return json({ message: error.message }, { status: 400 });
	}

	redirect("/dashboard");
	return null;
}

export default function Signup() {
	return (
		<div className="w-full max-w-md">
			<Form method="POST">
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
						<CardDescription>Enter your details to create a new account</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" placeholder="name@example.com" />
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" placeholder="password" />
						</div>
					</CardContent>
					<CardFooter className="flex flex-col">
						<LoadingButton className="w-full">Sign Up</LoadingButton>
					</CardFooter>
				</Card>
				<div className="mt-4 text-center text-sm">
					Have an account?
					<Link className="underline ml-2" to="/signin">
						Sign In
					</Link>
				</div>
			</Form>
		</div>
	);
}
