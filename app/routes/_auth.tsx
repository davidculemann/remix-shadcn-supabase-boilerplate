import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { enterLeftAnimation } from "@/lib/framer/animations";
import type { SupabaseOutletContext } from "@/lib/supabase/supabase";
import { cn } from "@/lib/utils";
import { Link, Outlet, useOutletContext } from "@remix-run/react";
import { motion } from "framer-motion";

export default function AuthLayout() {
	const { supabase } = useOutletContext<SupabaseOutletContext>();
	return (
		<main className="h-full px-8 sm:px-0">
			<Link
				to="/"
				className={cn(buttonVariants({ variant: "ghost" }), "absolute left-4 top-4 md:left-8 md:top-8 z-10")}
			>
				<>
					<Icons.chevronLeft className="mr-2 h-4 w-4" />
					Home
				</>
			</Link>
			<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-full">
				<motion.div {...enterLeftAnimation} className="flex items-center justify-center py-12 h-full">
					<Outlet context={{ supabase }} />
				</motion.div>
				<div className="hidden bg-muted lg:grid lg:place-items-center">
					<Icons.logo className="object-cover dark:brightness-[0.2] dark:grayscale m-auto h-32" />
				</div>
			</div>
		</main>
	);
}
