import { Link } from "@remix-run/react";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
	return (
		<div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
			<div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
				<div className="flex gap-4">
					<p className="text-xs text-muted-foreground">© 2024 David Culemann.</p>
					<a
						href="https://linkedin.com/in/david-culemann"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground"
					>
						<Linkedin className="h-4 w-4" />
						<span className="sr-only">LinkedIn</span>
					</a>
					<a
						href="https://github.com/davidculemann"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground"
					>
						<Github className="h-4 w-4" />
						<span className="sr-only">GitHub</span>
					</a>
				</div>
				<nav className="flex items-center gap-4 sm:gap-6">
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
