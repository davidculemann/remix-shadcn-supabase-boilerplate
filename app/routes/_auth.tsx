import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
	return (
		<main className="h-full px-8 sm:px-0">
			<Outlet />
		</main>
	);
}
