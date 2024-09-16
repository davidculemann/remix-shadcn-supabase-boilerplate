import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
	return (
		<main className="h-full">
			<Outlet />
		</main>
	);
}
