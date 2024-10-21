import { Link } from "@remix-run/react";

export function Footer() {
	return (
		<div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
			<div className="mx-4 md:mx-8 flex h-14 items-center gap-4">
				<p className="text-xs text-gray-500">© 2024 David Culemann.</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link className="text-xs hover:underline underline-offset-4" to="/terms-of-service">
						Terms of Service
					</Link>
					<Link className="text-xs hover:underline underline-offset-4" to="/privacy-policy">
						Privacy
					</Link>
				</nav>
			</div>
		</div>
	);
}
