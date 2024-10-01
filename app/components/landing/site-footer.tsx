import { Link } from "@remix-run/react";

export default function SiteFooter() {
	return (
		<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
			<p className="text-xs text-gray-500">© 2024 David Culemann. All rights reserved.</p>
			<nav className="sm:ml-auto flex gap-4 sm:gap-6">
				<Link className="text-xs hover:underline underline-offset-4" to="#">
					Terms of Service
				</Link>
				<Link className="text-xs hover:underline underline-offset-4" to="#">
					Privacy
				</Link>
			</nav>
		</footer>
	);
}
