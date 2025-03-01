import { siteConfig } from "@/config/site";
import { Link } from "@remix-run/react";
import { Github, Linkedin, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
	{
		href: siteConfig.links?.linkedin,
		icon: Linkedin,
		label: "LinkedIn",
	},
	{
		href: siteConfig.links?.github,
		icon: Github,
		label: "GitHub",
	},
	{
		href: siteConfig.links?.twitter,
		icon: Twitter,
		label: "Twitter",
	},
] as const;

const FILTERED_SOCIAL_LINKS = SOCIAL_LINKS.filter((link) => link.href);

const NAV_LINKS = [
	{
		to: "/terms-of-service",
		label: "TOS",
	},
	{
		to: "/privacy-policy",
		label: "Privacy",
	},
] as const;

const year = new Date().getFullYear();

export function Footer() {
	return (
		<footer className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
			<div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
				<div className="flex gap-4">
					<p className="text-xs text-muted-foreground">
						© {year} {siteConfig.author}.
					</p>
					{FILTERED_SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
						<a
							key={href}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-foreground"
						>
							<Icon className="h-4 w-4" />
							<span className="sr-only">{label}</span>
						</a>
					))}
				</div>
				<nav className="flex items-center gap-4 sm:gap-6">
					{NAV_LINKS.map(({ to, label }) => (
						<Link key={to} className="text-xs hover:underline underline-offset-4" to={to}>
							{label}
						</Link>
					))}
				</nav>
			</div>
		</footer>
	);
}
