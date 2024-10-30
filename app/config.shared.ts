import { Bookmark, LayoutGrid, type LucideIcon, Settings, SquarePen, Tag, Users } from "lucide-react";

export const APP_NAME = "remix-shadcn";

export function title(pageTitle?: string) {
	if (!pageTitle) return APP_NAME;

	return `${pageTitle} | ${APP_NAME}`;
}

export const PROTECTED_ROUTES = ["/dashboard"];
export const NO_AUTH_ROUTES = ["/signin", "/signup"];

type Submenu = {
	href: string;
	label: string;
	active?: boolean;
};

type Menu = {
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon;
	submenus?: Submenu[];
};

type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: "",
			menus: [
				{
					href: "/dashboard",
					label: "Dashboard",
					active: pathname.includes("/dashboard"),
					icon: LayoutGrid,
					submenus: [],
				},
			],
		},
		{
			groupLabel: "Contents",
			menus: [
				{
					href: "",
					label: "Posts",
					active: pathname.includes("/posts"),
					icon: SquarePen,
					submenus: [
						{
							href: "/posts",
							label: "All Posts",
						},
						{
							href: "/posts/new",
							label: "New Post",
						},
					],
				},
				{
					href: "/categories",
					label: "Categories",
					active: pathname.includes("/categories"),
					icon: Bookmark,
				},
				{
					href: "/tags",
					label: "Tags",
					active: pathname.includes("/tags"),
					icon: Tag,
				},
			],
		},
		{
			groupLabel: "Settings",
			menus: [
				{
					href: "/users",
					label: "Users",
					active: pathname.includes("/users"),
					icon: Users,
				},
				{
					href: "/account",
					label: "Account",
					active: pathname.includes("/account"),
					icon: Settings,
				},
			],
		},
	];
}
