import { Form } from "@remix-run/react";
import { Button } from "../ui/button";

export default function LogoutButton() {
	return (
		<Form method="POST" action="/signout">
			<Button type="submit">Log out</Button>
		</Form>
	);
}
