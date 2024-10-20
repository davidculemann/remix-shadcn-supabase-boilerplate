import type { Icons } from "@/components/icons";

export type NavItem = {
	title: string;
	href: string;
	disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
	title: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
} & (
	| {
			href: string;
			items?: never;
	  }
	| {
			href?: string;
			items: NavItem[];
	  }
);

export type SiteConfig = {
	author: string;
	name: string;
	project: string;
	description: string;
	url: string;
	ogImage?: string;
	contactEmail?: string;
	links?: {
		twitter: string;
		github: string;
	};
	twitter?: {
		handle: string;
		url: string;
	};
	license?: {
		name: string;
		url: string;
	};
	github?: {
		repoUrl: string;
	};
};

export type MarketingConfig = {
	mainNav: MainNavItem[];
};
