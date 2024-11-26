import type { Subscription } from "types/stripe";
import { Navbar } from "./navbar";

interface ContentLayoutProps {
	title: string;
	subscription?: Subscription;
	children: React.ReactNode;
}

export function ContentLayout({ title, subscription, children }: ContentLayoutProps) {
	return (
		<div>
			<Navbar title={title} subscription={subscription} />
			<div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
		</div>
	);
}
