import { Link } from "@remix-run/react";

export function VersionWarningMessage({
	branches,
	currentRef,
	splat,
}: {
	branches: string[];
	currentRef: string;
	splat?: string;
}) {
	// Don't want to show release-next in the menu, but we do want to show
	// the branch-warning
	const warning = [...branches].includes(currentRef)
		? `Viewing docs for ${currentRef} branch, not the latest release`
		: "Viewing docs for an older release";

	return (
		<>
			{warning}.{" "}
			<Link to={splat ? `/docs/en/main/${splat}` : "/docs/en/main"} className="underline">
				View latest
			</Link>
		</>
	);
}
