import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, Link } from "@remix-run/react";
import type { UserMetadata } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { UserAvatar } from "./user-avatar";

export function UserAccountNav({ user }: { user: UserMetadata }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar user={{ name: user.name || null, image: user.avatar_url || null }} className="h-8 w-8" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						{user.name && <p className="font-medium">{user.name}</p>}
						{user.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link to="/dashboard">Dashboard</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to="/account/billing">Billing</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link to="/account/settings">Settings</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Form method="POST" action="/signout" className="!py-0 !px-0">
						<Button
							type="submit"
							variant="ghost"
							className="justify-start sm:justify-center w-full text-left px-2"
						>
							Log out
							<DropdownMenuShortcut className="hidden sm:inline-block">⇧⌘S</DropdownMenuShortcut>
						</Button>
					</Form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
