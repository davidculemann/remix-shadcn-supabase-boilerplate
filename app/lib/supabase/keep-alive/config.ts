export const keepAliveConfig = {
	table: "keep-alive",
	column: "random",
	sizeBeforeDeletions: 10,
	consoleLogOnError: process.env.NODE_ENV === "development",
	otherEndpoints: [
		// Add your other endpoints here
		// "https://your-other-project.vercel.app/api/keep-alive"
	],
} as const;

export type KeepAliveConfig = typeof keepAliveConfig;
