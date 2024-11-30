type Side = "left" | "right" | null | undefined;
type Status = "done" | "default" | null | undefined;
type Variant = "secondary" | "primary" | null | undefined;
type DotStatus = "done" | "default" | "error" | "current" | "custom" | null | undefined;

export type RichContent = {
	type: "paragraph" | "link" | "bold" | "italic" | "text";
	text: string;
	href?: string;
	children?: RichContent[];
};

export type Update = {
	status?: Status;
	headings: Array<{
		side: Side;
		text: string;
		variant?: Variant;
		className?: string;
	}>;
	dotStatus: DotStatus;
	lineDone: boolean;
	content: {
		side?: Side;
		content: RichContent[];
	};
};

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
			content: [
				{
					type: "paragraph",
					text: "First version of the boilerplate launched, at this point still without any real functionality. The stack of ",
					children: [
						{ type: "link", text: "Supabase", href: "https://supabase.com" },
						{ type: "text", text: ", " },
						{ type: "link", text: "shadcn/ui", href: "https://ui.shadcn.com" },
						{ type: "text", text: " and " },
						{ type: "link", text: "Remix", href: "https://remix.run" },
						{ type: "text", text: " was initialised and deployed to " },
						{ type: "link", text: "Vercel", href: "https://vercel.com" },
						{ type: "text", text: ". Tooling was set up with " },
						{ type: "link", text: "Biome", href: "https://biomejs.dev" },
						{ type: "text", text: " for linting and formatting, " },
						{ type: "link", text: "Vite", href: "https://vitejs.dev" },
						{ type: "text", text: " for bundling and TypeScript as the language of choice." },
					],
				},
			],
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
			content: [
				{
					type: "paragraph",
					text: "Implementing a robust and low friction user authentication system can be the most tedious stage of setting up any project. The boilerplate supports email and password login with Supabase, with an initial signup confirmation through OTP (to get around Supabase redirect issues with multiple deployments and dev environments).",
				},
				{
					type: "paragraph",
					text: "Additionally, ",
					children: [
						{ type: "link", text: "GitHub", href: "https://github.com" },
						{ type: "text", text: " and " },
						{
							type: "link",
							text: "Google OAuth",
							href: "https://developers.google.com/identity/protocols/oauth2",
						},
						{ type: "text", text: " are supported through Supabase. I set up my own SMTP server with " },
						{ type: "link", text: "Resend", href: "https://resend.com" },
						{ type: "text", text: " hosted on " },
						{ type: "link", text: "davidculemann.com", href: "https://davidculemann.com" },
						{
							type: "text",
							text: " to send out the OTP emails, because Supabase aggressively rate-limits email sending on the free plan.",
						},
					],
				},
			],
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
			content: [
				{
					type: "paragraph",
					text: "Documentation can be a nice feature to have for applications with intricate workflows and complex features. I forked and adapted ",
					children: [
						{
							type: "link",
							text: "boomerang.io's docs template for Remix",
							href: "https://github.com/boomerang-io/remix-docs-template",
						},
						{
							type: "text",
							text: ", which includes a system for fetching markdown files from a GitHub repository and rendering them in React.",
						},
					],
				},
			],
		},
	},
	{
		status: "done",
		headings: [
			{ side: "left", text: "Stripe Integration" },
			{ side: "right", text: "Completed (22/11/2024)", variant: "secondary" },
		],
		dotStatus: "done",
		lineDone: true,
		content: {
			content: [
				{
					type: "paragraph",
					text: "",
					children: [
						{ type: "link", text: "Stripe", href: "https://stripe.com" },
						{
							type: "text",
							text: " integration has been added to the boilerplate, with a billing page allowing users to manage their subscription and update their payment method. A seeding script has been added to initialise Supabase and Stripe with some default subscription plans. The integration includes a webhook endpoint that listens for subscription updates and updates the user's subscription data in Supabase.",
						},
					],
				},
			],
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
			content: [
				{
					type: "paragraph",
					text: "The current focus is on adding new features to the website boilerplate. ",
					children: [
						{ type: "text", text: "AI support with the " },
						{ type: "link", text: "Vercel AI SDK", href: "https://sdk.vercel.ai/docs" },
						{
							type: "text",
							text: " and a chatbot template. I also plan to add some nice-to-have features such as a keep-alive route with polling to prevent Supabase from disabling the project due to inactivity.",
						},
					],
				},
			],
		},
	},
];
