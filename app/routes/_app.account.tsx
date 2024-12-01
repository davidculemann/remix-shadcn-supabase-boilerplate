import SidebarNav from "@/components/account/sidebar-nav";
import { Separator } from "@/components/ui/separator";
import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Outlet, useOutletContext } from "@remix-run/react";
import { IconReceipt, IconTool, IconUser } from "@tabler/icons-react";
import type { Currency, Subscription } from "types/stripe";
import { cn } from "@/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user;
}

export default function Account() {
	const user = useLoaderData<typeof loader>();
	const { subscription, currency } = useOutletContext<{ subscription: Subscription; currency: Currency }>();

	return (
		<div className="flex flex-col pt-4">
			<div className="space-y-0.5">
				<div className="flex items-center gap-2">
					<p className="text-muted-foreground">Manage your account settings, profile and billing.</p>
				</div>
			</div>
			<Separator className="my-4 lg:my-6" />
			<div className="flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className="top-0 lg:sticky lg:w-1/5">
					<SidebarNav items={sidebarNavItems} />
				</aside>
				<div className="flex w-full p-1 pr-4 md:overflow-y-hidden">
					<Outlet context={{ subscription, currency }} />
				</div>
			</div>
		</div>
	);
}

const sidebarNavItems = [
	{
		title: "Profile",
		icon: <IconUser size={18} />,
		href: "/account",
	},
	{
		title: "Settings",
		icon: <IconTool size={18} />,
		href: "/account/settings",
	},
	{
		title: "Billing",
		icon: <IconReceipt size={18} />,
		href: "/account/billing",
	},
];
