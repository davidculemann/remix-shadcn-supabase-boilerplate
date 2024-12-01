import { getSupabaseWithHeaders } from "@/lib/supabase/supabase.server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { keepAliveConfig as config } from "../lib/supabase/keep-alive/config";
import { type QueryResponse, determineAction, generateRandomString } from "../lib/supabase/keep-alive/helper";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const dynamic = "force-dynamic";

const querySupabase = async (supabase: SupabaseClient, randomStringLength = 12): Promise<QueryResponse> => {
	const currentRandomString = generateRandomString(randomStringLength);
	const { data, error } = await supabase.from(config.table).select("*").eq(config.column, currentRandomString);
	const messageInfo = `Results for retrieving\n'${currentRandomString}' from '${config.table}' at column '${config.column}'`;

	if (error) {
		const errorInfo = `${messageInfo}: ${error.message}`;
		if (config.consoleLogOnError) console.log(errorInfo);
		return { successful: false, message: errorInfo };
	}

	return {
		successful: true,
		message: `${messageInfo}: ${JSON.stringify(data)}`,
	};
};

const fetchOtherEndpoints = async () => {
	if (config.otherEndpoints.length === 0) return [];

	const fetchPromises = config.otherEndpoints.map(async (endpoint) => {
		try {
			const response = await fetch(endpoint, { cache: "no-store" });
			const status = response.ok ? "Passed" : "Failed";
			return `${endpoint} - ${status}`;
		} catch (error) {
			return `${endpoint} - Error: ${error instanceof Error ? error.message : "Unknown error"}`;
		}
	});

	return Promise.all(fetchPromises);
};

export async function loader({ request }: LoaderFunctionArgs) {
	const { supabase } = getSupabaseWithHeaders({ request });
	let responseMessage = "";
	let successfulResponses = true;

	const querySupabaseResponse = await querySupabase(supabase);
	successfulResponses = successfulResponses && querySupabaseResponse.successful;
	responseMessage += `${querySupabaseResponse.message}\n\n`;

	const insertOrDeleteResults = await determineAction(supabase);
	successfulResponses = successfulResponses && insertOrDeleteResults.successful;
	responseMessage += insertOrDeleteResults.message;

	const otherEndpointResults = await fetchOtherEndpoints();
	if (otherEndpointResults.length > 0) {
		responseMessage += `\n\nOther Endpoint Results:\n${otherEndpointResults.join("\n")}`;
	}

	return new Response(responseMessage, {
		status: successfulResponses ? 200 : 400,
	});
}
