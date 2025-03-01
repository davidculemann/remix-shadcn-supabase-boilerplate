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

const footerClasses = {
	wrapper: "z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto",
	container: "mx-4 md:mx-8 flex h-14 items-center justify-between",
	leftSection: "flex gap-4",
	copyright: "text-xs text-muted-foreground",
	socialLink: "text-muted-foreground hover:text-foreground",
	nav: "flex items-center gap-4 sm:gap-6",
	navLink: "text-xs hover:underline underline-offset-4",
};

export function Footer() {
	return (
		<footer className={footerClasses.wrapper}>
			<div className={footerClasses.container}>
				<div className={footerClasses.leftSection}>
					<p className={footerClasses.copyright}>
						© {year} {siteConfig.author}.
					</p>
					{FILTERED_SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
						<a
							key={href}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className={footerClasses.socialLink}
						>
							<Icon className="h-4 w-4" />
							<span className="sr-only">{label}</span>
						</a>
					))}
				</div>
				<nav className={footerClasses.nav}>
					{NAV_LINKS.map(({ to, label }) => (
						<Link key={to} className={footerClasses.navLink} to={to}>
							{label}
						</Link>
					))}
				</nav>
			</div>
		</footer>
	);
}
