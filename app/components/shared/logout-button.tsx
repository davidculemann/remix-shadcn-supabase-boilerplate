import { Button } from "@/components/ui/button";
import { Form } from "@remix-run/react";

export default function LogoutButton() {
	return (
		<Form method="POST" action="/signout">
			<Button type="submit">Log out</Button>
		</Form>
	);
}
