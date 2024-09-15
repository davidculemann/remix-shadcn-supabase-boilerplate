import { title } from "@/config.shared";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{
			title: title(),
		},
		{
			name: "description",
			content: "Welcome to the landing page.",
		},
	];
};

export default function Index() {
	return (
		<main className="container prose py-8">
			<h1>Landing Page</h1>
		</main>
	);
}
