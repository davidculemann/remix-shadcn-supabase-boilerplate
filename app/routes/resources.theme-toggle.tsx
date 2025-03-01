import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/lib/client-hints";
import { setTheme } from "@/lib/theme.server";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useFetchers } from "@remix-run/react";
import { MoonIcon, SunIcon } from "lucide-react";

enum Theme {
	DARK = "dark",
	LIGHT = "light",
	SYSTEM = "system",
}

export const themes: Array<Theme> = Object.values(Theme);

function isTheme(value: unknown): value is Theme {
	return typeof value === "string" && themes.includes(value as Theme);
}

export const action: ActionFunction = async ({ request }) => {
	const requestText = await request.text();
	const form = new URLSearchParams(requestText);
	const theme = form.get("theme");

	if (!isTheme(theme)) {
		return json({
			success: false,
			message: `theme value of ${theme} is not a valid theme`,
		});
	}

	return json(
		{ success: true },
		{
			headers: {
				"Set-Cookie": setTheme(theme),
			},
		},
	);
};

export function useOptimisticTheme(): Theme | null {
	const fetchers = useFetchers();
	const themeFetcher = fetchers.find((f) => f.formAction === "/resources/theme-toggle");
	const optimisticTheme = themeFetcher?.formData?.get("theme");

	if (optimisticTheme && isTheme(optimisticTheme)) {
		return optimisticTheme;
	}

	return null;
}

export function ThemeToggle() {
	const fetcher = useFetcher();
	const theme = useTheme();

	const handleThemeChange = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		fetcher.submit(
			{ theme: newTheme },
			{
				method: "post",
				action: "/resources/theme-toggle",
			},
		);
	};

	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button
						className="rounded-full w-8 h-8 bg-background mr-2"
						variant="outline"
						size="icon"
						onClick={() => handleThemeChange()}
					>
						<SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
						<MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
						<span className="sr-only">Switch Theme</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">Switch Theme</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
