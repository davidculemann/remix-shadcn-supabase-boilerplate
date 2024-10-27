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
			{ side: "left", text: "Plan!" },
			{ side: "right", text: "Done (05/04/2024)", variant: "secondary" },
		],
		dotStatus: "done",
		lineDone: true,
		content: {
			side: "left",
			text: "Before diving into coding, it is crucial to plan your software project thoroughly. This involves defining the project scope, setting clear objectives, and identifying the target audience. Additionally, creating a timeline and allocating resources appropriately will contribute to a successful development process.",
		},
	},
	{
		status: "done",
		headings: [
			{ side: "right", text: "Design", className: "text-destructive" },
			{ side: "left", text: "Failed (05/04/2024)", variant: "secondary" },
		],
		dotStatus: "error",
		lineDone: true,
		content: {
			text: "Designing your software involves creating a blueprint that outlines the structure, user interface, and functionality of your application. Consider user experience (UX) principles, wireframing, and prototyping to ensure an intuitive and visually appealing design.",
		},
	},
	{
		status: "done",
		headings: [
			{ side: "left", text: "Code" },
			{ side: "right", text: "Current step", variant: "secondary" },
		],
		dotStatus: "current",
		lineDone: false,
		content: {
			side: "left",
			text: "The coding phase involves translating your design into actual code. Choose a programming language and framework that aligns with your project requirements. Follow best practices, such as modular and reusable code, to enhance maintainability and scalability. Regularly test your code to identify and fix any bugs or errors.",
		},
	},
	{
		headings: [{ text: "Test" }, { side: "left", text: "Next step", variant: "secondary" }],
		lineDone: false,
		content: {
			text: "Thorough testing is essential to ensure the quality and reliability of your software. Implement different testing methodologies, including unit testing, integration testing, and user acceptance testing. This helps identify and rectify any issues before deploying the software.",
		},
	},
	{
		headings: [
			{ side: "left", text: "Deploy" },
			{ side: "right", text: "Deadline (05/10/2024)", variant: "secondary" },
		],
		lineDone: false,
		content: {
			side: "left",
			text: "Once your software has passed rigorous testing, it's time to deploy it. Consider the deployment environment, whether it's on-premises or in the cloud. Ensure proper documentation and provide clear instructions for installation and configuration.",
		},
	},
	{
		headings: [{ text: "Done!" }, { side: "left", text: "Here everything ends", variant: "secondary" }],
		lineDone: false,
		content: {},
	},
];
