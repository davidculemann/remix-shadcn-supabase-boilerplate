import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoading() {
	return (
		<div className="fixed inset-0 bg-background p-4 md:p-6 lg:p-8">
			<div className="flex flex-col h-full space-y-4">
				<header className="flex items-center justify-between p-4 bg-card rounded-lg">
					<Skeleton className="h-8 w-32" />
					<div className="flex space-x-4">
						<Skeleton className="h-8 w-8 rounded-full" />
						<Skeleton className="h-8 w-24" />
					</div>
				</header>
				<div className="flex-grow flex space-x-4 overflow-hidden">
					<aside className="hidden md:block w-64 p-4 bg-card rounded-lg">
						<div className="space-y-4">
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
							<Skeleton className="h-8 w-full" />
						</div>
					</aside>
					<main className="flex-grow overflow-auto p-4 bg-card rounded-lg">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{[...Array(9)].map((_, i) => (
								<div key={i} className="bg-background p-4 rounded-lg">
									<Skeleton className="h-32 w-full mb-4" />
									<Skeleton className="h-4 w-full mb-2" />
									<Skeleton className="h-4 w-2/3" />
								</div>
							))}
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
