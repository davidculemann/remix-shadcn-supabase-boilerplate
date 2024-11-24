type Side = "left" | "right" | null | undefined;
type Status = "done" | "default" | null | undefined;
type Variant = "secondary" | "primary" | null | undefined;
type DotStatus = "done" | "default" | "error" | "current" | "custom" | null | undefined;

export interface Update {
	status?: Status;
	headings: { side?: Side; text: string; variant?: Variant; className?: string }[];
	dotStatus?: DotStatus;
	lineDone?: boolean;
	content: { side?: Side; text?: string };
}

export const timelineItems: Update[] = [
	{
		status: "done",
		headings: [
			{ side: "left", text: "Work Begins!" },
			{ side: "right", text: "Started (09/09/2024)", variant: "secondary" },
		],
		dotStatus: "done",
		lineDone: true,
		content: {
			side: "left",
			text: "First version of the boilerplate launched, at this point still without any real functionality. The stack of supabase, shadcn and remix was initialised and deployed to vercel. Tooling was set up with Biome for linting and formatting, Vite for bundling and Typescript as the language of choice.",
		},
	},
	{
		status: "done",
		headings: [
			{ side: "left", text: "Auth Flow Implemented" },
			{ side: "right", text: "Completed (25/09/2024)", variant: "secondary" },
		],
		dotStatus: "done",
		lineDone: true,
		content: {
			text: "Implementing a robust and low friction user authentication system can be the most tedious stage of setting up any project. The boilerplate supports email and password login with supabase, with an initial signup confirmation through OTP (to get around supabase redirect issues with multiple deployments and dev environments). Additionally, GitHub and Google OAuth are supported through Supabase. I set up my own SMTP server with Resend hosted on my own domain (davidculemann.com) to send out the OTP emails, because Supabase aggressively rate-limits email sending on the free plan.",
		},
	},
	{
		status: "done",
		headings: [
			{ side: "left", text: "Documentation Support" },
			{ side: "right", text: "Completed (10/10/2024)", variant: "secondary" },
		],
		dotStatus: "done",
		lineDone: true,
		content: {
			side: "left",
			text: "Documentation can be a nice feature to have for applications with intricate workflows and complex features, I forked boomerang.io's docs template for remix https://github.com/boomerang-io/remix-docs-template, which includes a system for fetching markdown files from a GitHub repository and rendering them in react.",
		},
	},
	{
		headings: [
			{ side: "left", text: "Stripe Integration" },
			{ side: "right", text: "Completed (22/11/2024)", variant: "secondary" },
		],
		dotStatus: "done",
		lineDone: true,
		content: {
			text: "Stripe integration has been added to the boilerplate, with a billing page allowing users to manage their subscription and update their payment method. A seeding script has been added to initialise Supabase and Stripe with some default subsciption plans.",
		},
	},
	{
		headings: [
			{ side: "left", text: "Add Features" },
			{ side: "right", text: "In Progress", variant: "secondary" },
		],
		dotStatus: "current",
		lineDone: false,
		content: {
			text: "The current focus is on adding new features to the website boilerplate AI support with the vercel AI sdk and a chatbot template. I also plan to add some nice to have features such as a keep-alive route with polling to prevent Supabase from disabling the project due to inactivity.",
		},
	},
];
