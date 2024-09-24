import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { getTheme, setTheme as setSystemTheme } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import React from "react";
import type { JSX } from "react/jsx-runtime";
import { useHydrated } from "remix-utils/use-hydrated";

export default function ModeToggle(props: JSX.IntrinsicAttributes & DropdownMenuProps) {
	const hydrated = useHydrated();
	const [, rerender] = React.useState({});
	const setTheme = React.useCallback((theme: string) => {
		setSystemTheme(theme);
		rerender({});
	}, []);
	const theme = getTheme();

	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger asChild>
				<Button className="w-10 h-10 rounded-full border" size="icon" variant="ghost">
					<span className="sr-only">Theme selector</span>
					{!hydrated ? null : theme === "dark" ? (
						<MoonIcon />
					) : theme === "light" ? (
						<SunIcon />
					) : (
						<LaptopIcon />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mt-2">
				<DropdownMenuLabel>Theme</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<button
						type="button"
						className="w-full"
						onClick={() => setTheme("light")}
						aria-selected={theme === "light"}
					>
						Light
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<button
						type="button"
						className="w-full"
						onClick={() => setTheme("dark")}
						aria-selected={theme === "dark"}
					>
						Dark
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<button
						type="button"
						className="w-full"
						onClick={() => setTheme("system")}
						aria-selected={theme === "system"}
					>
						System
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
