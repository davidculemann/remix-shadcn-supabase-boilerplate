import { Button } from "@/components/ui/button";
import { Link, isRouteErrorResponse } from "@remix-run/react";
import { ExternalLink } from "lucide-react";

export function ErrorBoundaryContent({ error }: { error: Error }) {
	if (!isRouteErrorResponse(error)) {
		return <DefaultErrorComponent />;
	}

	return (
		<div className="bg-background text-foreground flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="font-mono text-[20vw] md:text-[15vw] leading-none">{error.status}</h1>
			<p className="text-xl md:text-2xl mt-4 mb-8 text-center">
				{error.statusText || "An unexpected error occurred"}
			</p>
			<div className="flex flex-col sm:flex-row gap-4">
				<Button asChild variant="outline">
					<Link to="/">Go back home</Link>
				</Button>
				<Button asChild variant="secondary">
					<a
						href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${error.status}`}
						target="_blank"
						rel="noreferrer"
						className="flex items-center"
					>
						Learn more
						<ExternalLink className="ml-2 h-4 w-4" />
					</a>
				</Button>
			</div>
		</div>
	);
}

function DefaultErrorComponent() {
	return (
		<div className="bg-background text-foreground flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="font-mono text-[20vw] md:text-[15vw] leading-none">Error</h1>
			<p className="text-xl md:text-2xl mt-4 mb-8 text-center">An unexpected error occurred</p>
			<Button asChild variant="outline">
				<Link to="/">Go back home</Link>
			</Button>
		</div>
	);
}
