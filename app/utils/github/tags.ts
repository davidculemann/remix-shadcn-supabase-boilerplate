import { docConfig } from "@/config/doc";
import { LRUCache } from "lru-cache";
import type { Octokit } from "octokit";
import parseLinkHeader from "parse-link-header";
import semver from "semver";

type CacheContext = { octokit: Octokit; releasePrefix: string };
declare global {
	var tagsCache: LRUCache<string, string[], CacheContext>;
}

/**
 * Fetches the repo tags
 */
export async function getTags(repo: string, { octokit, releasePrefix }: CacheContext) {
	return tagsCache.fetch(repo, {
		context: { octokit, releasePrefix },
	});
}

export function getLatestVersion(tags: string[]) {
	return tags.filter((tag) => semver.satisfies(tag, "*", { includePrerelease: false }))[0];
}

/**
 * Returns the latest version of each major version
 */
export function getLatestVersionHeads(tags: string[]) {
	let heads = new Map<string, string>();
	for (let tag of tags) {
		let prefix = String(semver.major(tag));
		if (docConfig.versions.includeMinor) {
			prefix += `.${semver.minor(tag)}`;
		}
		let head = heads.get(prefix);
		if (!head || semver.gt(tag, head)) {
			heads.set(prefix, tag);
		}
	}
	return Array.from(heads.values()).sort(semver.compare).reverse();
}

// global for SS "HMR", we need a better story here
global.tagsCache ??= new LRUCache<string, string[], CacheContext>({
	// let tagsCache = new LRUCache<string, string[]>({
	max: 3,
	ttl: 1000 * 60 * 5, // 5 minutes, so we can see new tags quickly
	allowStale: true,
	noDeleteOnFetchRejection: true,
	fetchMethod: async (key, _, { context }) => {
		console.log("Fetching fresh tags (releases)");
		let [owner, repo] = key.split("/");
		return getAllReleases(owner, repo, context.releasePrefix, context);
	},
});

/*
 * Retrieves all releases, filters by prefix, and returns a map of <semver, tag / release>
 */
export async function getAllReleases(
	owner: string,
	repo: string,
	releasePrefix: string,
	{
		octokit,
		page = 1,
		releases = [],
	}: {
		octokit: Octokit;
		page?: number;
		releases?: string[];
	},
): Promise<string[]> {
	console.log("Fetching fresh releases, page", page);
	let { data, headers, status } = await octokit.rest.repos.listReleases({
		mediaType: { format: "json" },
		owner,
		repo,
		per_page: 100,
		page,
	});

	if (status !== 200) {
		throw new Error(`Failed to fetch releases: ${data}`);
	}

	//Define regex with optional prefix (i.e. v or flow@)
	let regex = new RegExp(`^${releasePrefix}[0-9]`);

	releases.push(
		...data
			.filter((release) => {
				return Boolean(
					// Check the release name or tag_name
					// Sometimes release name isn't set or won't match the pattern.
					regex.test(release?.name || "") || regex.test(release.tag_name),
				);
			})
			.map((release) => {
				return release.tag_name.replace(releasePrefix, "");
			}),
	);

	let parsed = parseLinkHeader(headers.link);
	if (parsed?.next) {
		return await getAllReleases(owner, repo, releasePrefix, {
			page: page + 1,
			releases,
			octokit,
		});
	}

	return releases;
}
