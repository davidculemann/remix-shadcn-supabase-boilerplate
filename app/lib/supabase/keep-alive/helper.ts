import type { SupabaseClient } from "@supabase/supabase-js";
import { keepAliveConfig as config } from "./config";

export type QueryResponse = {
	successful: boolean;
	message: string;
};

export type QueryResponseWithData = QueryResponse & {
	data: any[] | null;
};

const defaultRandomStringLength = 12;
const alphabetOffset = "a".charCodeAt(0);

export const generateRandomString = (length = defaultRandomStringLength) => {
	let newString = "";
	for (let i = 0; i < length; i++) {
		newString += String.fromCharCode(alphabetOffset + Math.floor(Math.random() * 26));
	}
	return newString;
};

export const retrieveEntries = async (supabase: SupabaseClient): Promise<QueryResponseWithData> => {
	const { data, error } = await supabase.from(config.table).select(config.column);
	const messageInfo = `Results for retrieving entries from '${config.table}' - '${config.column} column`;

	if (error) {
		const errorInfo = `${messageInfo}: ${error.message}`;
		if (config.consoleLogOnError) console.log(errorInfo);
		return { successful: false, message: errorInfo, data: null };
	}

	return {
		successful: true,
		message: `${messageInfo}: ${JSON.stringify(data)}`,
		data,
	};
};

export const insertRandom = async (supabase: SupabaseClient, randomString: string): Promise<QueryResponse> => {
	const upsertData = { [config.column]: randomString };
	const { data, error } = await supabase.from(config.table).upsert(upsertData).select();
	const messageInfo = `Results for upserting\n'${randomString}' from '${config.table}' at column '${config.column}'`;

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

export const deleteRandom = async (supabase: SupabaseClient, entryToDelete: string): Promise<QueryResponse> => {
	const { error } = await supabase.from(config.table).delete().eq(config.column, entryToDelete);
	const messageInfo = `Results for deleting\n'${entryToDelete}' from '${config.table}' at column '${config.column}'`;

	if (error) {
		const errorInfo = `${messageInfo}: ${error.message}`;
		if (config.consoleLogOnError) console.log(errorInfo);
		return { successful: false, message: errorInfo };
	}

	return { successful: true, message: `${messageInfo}: success` };
};

export const determineAction = async (supabase: SupabaseClient): Promise<QueryResponse> => {
	const retrievalResults = await retrieveEntries(supabase);

	if (!retrievalResults.successful) {
		return {
			successful: false,
			message: `Failed to retrieve entries from ${config.table}\n${retrievalResults.message}`,
		};
	}

	const retrievedEntries = retrievalResults.data;
	if (!retrievedEntries) {
		return {
			successful: false,
			message: `Received 'null' data result when retrieving entries from ${config.table}\n${retrievalResults.message}`,
		};
	}

	let responseMessage = `${retrievalResults.message}\n\n`;
	let responseSuccessful = true;

	if (retrievedEntries.length > config.sizeBeforeDeletions) {
		const entryToDelete = retrievedEntries.pop();
		const deletionResults = await deleteRandom(supabase, entryToDelete[config.column]);
		responseSuccessful = deletionResults.successful;
		responseMessage += deletionResults.message;
	} else {
		const currentRandomString = generateRandomString();
		const insertResults = await insertRandom(supabase, currentRandomString);
		responseSuccessful = insertResults.successful;
		responseMessage += insertResults.message;
	}

	return { message: responseMessage, successful: responseSuccessful };
};
