import fsp from "node:fs/promises";
import path from "node:path";
import invariant from "tiny-invariant";
import { env } from "../env.server";

/**
 * Fetches the contents of a file in a repository or from your local disk.
 *
 * @param ref The GitHub ref, use `"local"` for local docs development
 * @param filepath The filepath inside the repo
 * @returns The text of the file
 */
export async function getRepoContent(repoPair: string, ref: string, filepath: string): Promise<string | null> {
	if (ref === "local") return getLocalContent(filepath);
	const [owner, repo] = repoPair.split("/");
	const pathname = `/${owner}/${repo}/${ref}/${filepath}`;
	const response = await fetch(new URL(pathname, "https://raw.githubusercontent.com/").href, {
		headers: { "User-Agent": `docs:${owner}/${repo}` },
	});
	if (!response.ok) {
		// Need to consume for undici since it won't garbage collect
		await response.text();
		return null;
	}
	return response.text();
}

/**
 * Fetches the contents of a file in a repository or from your local disk.
 *
 * @param ref The GitHub ref, use `"local"` for local docs development
 * @param filepath The filepath inside the repo
 * @returns raw image
 */
export async function getRepoImage(repoPair: string, ref: string, filepath: string): Promise<Buffer | null> {
	if (ref === "local") return getLocalImage(filepath);
	const [owner, repo] = repoPair.split("/");
	const pathname = `/${owner}/${repo}/${ref}/${filepath}`;
	console.log("Fetching: ", pathname);
	const image = await fetch(new URL(pathname, "https://raw.githubusercontent.com/").href, {
		headers: { "User-Agent": `docs:${owner}/${repo}` },
	});
	return Buffer.from(await image.arrayBuffer());
}

/**
 * Reads a single file from your local source repository
 */
async function getLocalContent(filepath: string): Promise<string> {
	invariant(env.LOCAL_REPO_RELATIVE_PATH, "LOCAL_REPO_RELATIVE_PATH is not set");
	const localFilePath = path.join(env.LOCAL_REPO_RELATIVE_PATH, filepath);
	const content = await fsp.readFile(localFilePath);
	return content.toString();
}

async function getLocalImage(filepath: string): Promise<Buffer> {
	invariant(env.LOCAL_REPO_RELATIVE_PATH, "LOCAL_REPO_RELATIVE_PATH is not set");
	const localFilePath = path.join(env.LOCAL_REPO_RELATIVE_PATH, filepath);
	const content = await fsp.readFile(localFilePath);
	return content;
}
