import { title } from "@/config.shared";
import type { MetaFunction } from "@remix-run/node";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, Link } from "@remix-run/react";
import axios from "axios";

export const meta: MetaFunction = () => {
	return [
		{
			title: title(),
		},
		{
			name: "description",
			content: "Welcome to the landing page.",
		},
	];
};

export default function Index() {
	async function handleSubmitEmail(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		await axios.post("api/mailing-list", formData);
	}

	return (
		<div className="container flex flex-col min-h-screen pb-4">
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6 mx-auto">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
									Land Your Dream Job with AI-Powered Career Tools
								</h1>
								<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
									Create stunning resumes, compelling cover letters, and ace your interviews with
									EasyCV's AI-driven platform.
								</p>
							</div>
							<div className="space-x-4 flex">
								<Link to="/signin">
									<Button size="lg">Get Started</Button>
								</Link>
								<Button variant="outline" size="lg">
									Learn More
								</Button>
							</div>
						</div>
					</div>
				</section>
				<section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
					<div className="container px-4 md:px-6 mx-auto">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
							Supercharge Your Job Search
						</h2>
						<div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
							<Card>
								<CardHeader>
									<CardTitle>AI CV Generation</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
										Create professional, ATS-friendly resumes tailored to specific job descriptions
										in minutes.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Cover Letter Magic</CardTitle>
								</CardHeader>
								<CardContent>
									<p>
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
									<p>
										Practice with our AI interviewer to boost confidence and improve performance in
										real interviews.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
				<section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6 mx-auto">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
							How It Works
						</h2>
						<div className="grid gap-8 md:grid-cols-3">
							<div className="flex flex-col items-center text-center">
								<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
									<span className="text-2xl font-bold text-blue-600">1</span>
								</div>
								<h3 className="text-xl font-bold mb-2">Input Your Details</h3>
								<p className="text-gray-500">
									Enter your experience, skills, and target job. Our AI does the rest.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
									<span className="text-2xl font-bold text-blue-600">2</span>
								</div>
								<h3 className="text-xl font-bold mb-2">Review and Refine</h3>
								<p className="text-gray-500">
									Get instant AI-generated documents. Edit and perfect with our smart tools.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
									<span className="text-2xl font-bold text-blue-600">3</span>
								</div>
								<h3 className="text-xl font-bold mb-2">Apply with Confidence</h3>
								<p className="text-gray-500">
									Submit your polished applications and ace your interviews.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
					<div className="container px-4 md:px-6 mx-auto">
						<div className="flex flex-col items-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
									Ready to Land Your Dream Job?
								</h2>
								<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Enter your email below to join the mailing list and receive updates on EasyCV's
									progress.
								</p>
							</div>
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
								<p className="text-xs text-gray-500">
									We will email you with updates about new features.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
