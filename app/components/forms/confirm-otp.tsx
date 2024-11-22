import { Form } from "@remix-run/react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import { Label } from "../ui/label";

export default function ConfirmOTP({
	path,
	additionalFormData = {},
	onSubmit,
}: {
	path?: string;
	additionalFormData?: Record<string, string>;
	onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<div>
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
					Confirm OTP
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
					Enter the code sent to your email.
				</p>
			</div>
			<Form
				className="space-y-6 flex flex-col items-center"
				method="POST"
				action={path}
				navigate={false}
				onSubmit={onSubmit}
				id="otp-confirmation-form"
			>
				<div>
					<Label htmlFor="otp" className="sr-only">
						OTP
					</Label>
					<InputOTP
						maxLength={6}
						type="otp"
						name="otp"
						onComplete={() => {
							const form = document.getElementById("otp-confirmation-form") as HTMLFormElement;
							const event = new Event("submit", { bubbles: true, cancelable: true });
							form.dispatchEvent(event);
						}}
					>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
				</div>
				{Object.entries(additionalFormData).map(([key, value]) => (
					<input key={key} type="hidden" name={key} value={value} />
				))}
			</Form>
		</div>
	);
}
