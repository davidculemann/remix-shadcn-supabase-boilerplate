import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "db_types";

export function delayAsync(delayMillis: number) {
	return new Promise((resolve) => setTimeout(resolve, delayMillis));
}

export async function getCVsForUser({
	dbClient,
	userId,
	page, // Default to page 1
	limit = 10, // Default to 25 posts per page
}: {
	dbClient: SupabaseClient<Database>;
	userId: string;
	page: number;
	limit?: number;
}) {
	// await delayAsync(3000);
	// let postsQuery = dbClient
	// 	.from("posts")
	// 	.select("*, author: profiles(*), likes(user_id), comments(*)", {
	// 		count: "exact",
	// 	})
	// 	.eq("user_id", userId)
	// 	.order("created_at", { ascending: false })
	// 	.range((page - 1) * limit, page * limit - 1);
	// const { data, error, count } = await postsQuery;
	// if (error) {
	// 	console.log(`Error occured during getPostsForUser ${userId} : `, error);
	// }
	// return {
	// 	data,
	// 	error,
	// 	totalPages: count ? Math.ceil(count / limit) : 1,
	// 	limit,
	// };
}

export async function getProfileForUsername({
	dbClient,
	username,
}: {
	dbClient: SupabaseClient<Database>;
	username: string;
}) {
	const profileQuery = dbClient.from("profiles").select("*").eq("username", username);

	const { data, error } = await profileQuery;

	if (error) {
		console.log("Error occured during getProfileForUsername : ", error);
	}

	return { data, error };
}
