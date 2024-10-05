import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Link } from "@remix-run/react";

export default function ForgotPassword() {
	return (
		<div className="mx-auto grid w-[350px] gap-6">
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
		</div>
	);
}
