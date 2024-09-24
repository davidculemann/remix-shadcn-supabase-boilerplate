import { Link } from "@remix-run/react";

import LogoutButton from "./logout-button";
import ModeToggle from "./shared/mode-toggle";

export function Header() {
	return (
		<header className="flex items-center justify-between px-4 py-2 md:py-4">
			<div className="flex items-center space-x-4">
				<Link className="flex items-center space-x-2" to="/">
					<span className="text-lg font-bold">shadcn</span>
				</Link>
			</div>
			<LogoutButton />
			<ModeToggle />
		</header>
	);
}
