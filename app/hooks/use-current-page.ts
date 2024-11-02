import { useLocation } from "@remix-run/react";
import { Bookmark, LayoutGrid, type LucideIcon, Settings, SquarePen, Tag, Users } from "lucide-react";
import { useMemo } from "react";

type Submenu = {
	href: string;
	label: string;
	active: boolean;
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
							active: pathname === "/posts",
						},
						{
							href: "/posts/new",
							label: "New Post",
							active: pathname.includes("/posts/new"),
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

export function useCurrentPage() {
	const pathname = useLocation().pathname;
	const menuList = useMemo(() => getMenuList(pathname), [pathname]);

	const { activePage, breadcrumbs } = useMemo(() => {
		let activePage = null;
		const breadcrumbs = [];

		for (const group of menuList) {
			for (const menu of group.menus) {
				if (menu.active && menu.href) {
					activePage = menu;
					breadcrumbs.push(menu);
				}
				if (menu.submenus) {
					for (const submenu of menu.submenus) {
						if (pathname === submenu.href) {
							activePage = submenu;
							breadcrumbs.push(submenu);
						}
					}
				}
			}
		}

		return { activePage, breadcrumbs };
	}, [menuList, pathname]);

	return { activePage, menuList, breadcrumbs };
}
