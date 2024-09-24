import { title } from "@/config.shared";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form } from "@remix-run/react";
import axios from "axios";

export const meta: MetaFunction = () => {
	return [
		{
			title: title(),
		},
		{
			name: "description",
			content: "Land Your Dream Job with AI-Powered Career Tools",
		},
	];
};

export default function Index() {
	const { toast } = useToast();

	async function handleSubmitEmail(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		await axios.post("api/mailing-list", formData);
		toast({ title: "Success!", description: "You have been added to the mailing list." });
	}

	return (
		<div className="flex flex-col">
			<main className="flex-1">
				<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
					<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
						<h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
							Land Your Dream Job with AI-Powered Career Tools
						</h1>
						<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
							Create stunning resumes, compelling cover letters, and ace your interviews with EasyCV's
							AI-driven platform.
						</p>
						<div className="space-x-4">
							<Link to="/signin">
								<Button size="lg">Get Started</Button>
							</Link>
							<Button variant="outline" size="lg">
								Learn More
							</Button>
						</div>
					</div>
				</section>

				<section
					id="features"
					className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
				>
					<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center dark:mt-10">
						<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
							Supercharge Your Job Search
						</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Our AI-powered tools help you create professional documents and prepare for interviews.
						</p>
					</div>
					<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>AI CV Generation</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Create professional, ATS-friendly resumes tailored to specific job descriptions in
									minutes.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Cover Letter Magic</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Generate compelling, personalized cover letters that perfectly complement your
									resume.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Interview Prep AI</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									Practice with our AI interviewer to boost confidence and improve performance in real
									interviews.
								</p>
							</CardContent>
						</Card>
					</div>
				</section>

				<section id="how-it-works" className="container py-8 md:py-12 lg:py-24">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
						<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">How It Works</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Three simple steps to revolutionize your job search process.
						</p>
					</div>
					<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8">
						<div className="relative overflow-hidden rounded-lg border bg-background p-2">
							<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
									<span className="text-2xl font-bold text-primary">1</span>
								</div>
								<div className="space-y-2">
									<h3 className="font-bold">Input Your Details</h3>
									<p className="text-sm text-muted-foreground">
										Enter your experience, skills, and target job. Our AI does the rest.
									</p>
								</div>
							</div>
						</div>
						<div className="relative overflow-hidden rounded-lg border bg-background p-2">
							<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
									<span className="text-2xl font-bold text-primary">2</span>
								</div>
								<div className="space-y-2">
									<h3 className="font-bold">Review and Refine</h3>
									<p className="text-sm text-muted-foreground">
										Get instant AI-generated documents. Edit and perfect with our smart tools.
									</p>
								</div>
							</div>
						</div>
						<div className="relative overflow-hidden rounded-lg border bg-background p-2">
							<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
									<span className="text-2xl font-bold text-primary">3</span>
								</div>
								<div className="space-y-2">
									<h3 className="font-bold">Apply with Confidence</h3>
									<p className="text-sm text-muted-foreground">
										Submit your polished applications and ace your interviews.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="container py-8 md:py-12 lg:py-24">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
						<h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
							Ready to Land Your Dream Job?
						</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Enter your email below to join the mailing list and receive updates on EasyCV's progress.
						</p>
						<div className="w-full max-w-sm space-y-2">
							<Form onSubmit={handleSubmitEmail} className="flex space-x-2">
								<Input
									className="flex-1"
									placeholder="Enter your email"
									type="email"
									id="email"
									name="email"
								/>
								<Button type="submit">Submit</Button>
							</Form>
							<p className="text-xs text-muted-foreground">
								We will email you with updates about new features.
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
