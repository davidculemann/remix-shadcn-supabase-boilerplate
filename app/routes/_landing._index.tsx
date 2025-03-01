import { title } from "@/config.shared";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import StackIcons from "@/components/landing/stack-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { containerVariants, enterAnimation, itemVariants } from "@/lib/framer/animations";
import { validateEmail } from "@/lib/utils";
import { Form } from "@remix-run/react";
import axios from "axios";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const meta: MetaFunction = () => {
	return [
		{
			title: title(),
		},
		{
			name: "description",
			content: "Innovate, Disrupt, and Scale with Our All-In-One Solution.",
		},
	];
};

const STEPS = [
	{
		number: 1,
		title: "Step One",
		description: "Enter some stuff and let the magic happen. It's all very advanced.",
	},
	{
		number: 2,
		title: "Step Two",
		description: "Watch in awe as vague promises are fulfilled by algorithms.",
	},
	{ number: 3, title: "Step Three", description: "Profit? We think so!" },
];

export default function Index() {
	const howItWorksRef = useRef(null);
	const isInView = useInView(howItWorksRef, { amount: 0.6, once: true });

	// Add state for email input
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	async function handleSubmitEmail(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		const form = event.currentTarget;
		const formData = new FormData(form);
		try {
			await axios.post("api/mailing-list", formData);
			toast.success("You've done it. You're on the list!");
			setIsSuccess(true);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				const { error: errorMessage = "Something went wrong. Try again?" } = error.response.data;
				toast.error(errorMessage);
			} else {
				toast.error("An unexpected error occurred. Try again later.");
			}
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="flex flex-col">
			<main className="flex-1">
				<motion.section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24" {...enterAnimation}>
					<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
						<h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
							Disrupt Your Industry with Our All-in-One Generic Platform
						</h1>
						<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
							Whether you're a tech startup, a unicorn-to-be, or something in between, we've got the tools
							you need to do... something.
						</p>
						<div className="space-x-4 flex">
							<Link to="/signin">
								<Button size="lg">Get Started</Button>
							</Link>
							<Link to="/docs">
								<Button variant="outline" size="lg">
									Learn More
								</Button>
							</Link>
						</div>
					</div>
				</motion.section>

				<motion.section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16" {...enterAnimation}>
					<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
						<h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
							Using the latest technologies
						</h1>
						<StackIcons />
					</div>
				</motion.section>

				<motion.section
					{...enterAnimation}
					id="features"
					className="container space-y-6 bg-slate-50 dark:bg-transparent py-6 md:py-12 lg:py-24"
				>
					<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
						<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
							The Future of Innovation is Here
						</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Our platform leverages technology (and buzzwords) to do incredible things. No one really
							knows how, but it works.
						</p>
					</div>
					<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Feature 1</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Use this feature to do something vaguely important, but we promise it's really cool.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Feature 2</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									This feature does things you didn't know you needed. But trust us, it's a
									game-changer.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Feature 3</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									It's like magic, but more complicated and with more buzzwords.
								</p>
							</CardContent>
						</Card>
					</div>
				</motion.section>

				<motion.section
					ref={howItWorksRef}
					initial="hidden"
					animate={isInView ? "show" : "hidden"}
					variants={containerVariants}
					id="how-it-works"
					className="container py-8 md:py-12 lg:py-24"
				>
					<motion.div
						{...enterAnimation}
						className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
					>
						<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">How It Works</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Follow these super easy steps and prepare to be amazed.
						</p>
					</motion.div>
					<motion.div
						initial="hidden"
						animate={isInView ? "show" : "hidden"}
						variants={containerVariants}
						className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8"
					>
						{STEPS.map(({ number, description, title }) => (
							<Step key={number} {...{ number, description, title }} />
						))}
					</motion.div>
				</motion.section>

				<motion.section {...enterAnimation} className="container py-8 md:py-12 lg:py-24">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
						<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
							Ready to Change the World?
						</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Enter your email below to stay updated. Or don't. It's totally up to you.
						</p>
						<div className="w-full max-w-sm space-y-2">
							<Form onSubmit={handleSubmitEmail} className="flex space-x-2">
								<Input
									className="flex-1"
									placeholder="Enter your email"
									id="email"
									name="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Button type="submit" disabled={!validateEmail(email) || isSuccess || isSubmitting}>
									Submit
								</Button>
							</Form>
							<p className="text-xs text-muted-foreground">We will probably email you with updates.</p>
						</div>
					</div>
				</motion.section>
			</main>
		</div>
	);
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
	return (
		<motion.div variants={itemVariants} className="relative overflow-hidden rounded-lg border bg-background p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
					<span className="text-2xl font-bold text-blue-600">{number}</span>
				</div>
				<div className="space-y-2">
					<h3 className="font-bold">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</motion.div>
	);
}
