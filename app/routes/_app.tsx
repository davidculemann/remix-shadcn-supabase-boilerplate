import { GlobalPendingIndicator } from "@/components/global-pending-indicator";
import { Header } from "@/components/header";
import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
	return (
		<>
			<GlobalPendingIndicator />
			<Header />
			<Outlet />
		</>
	);
}
