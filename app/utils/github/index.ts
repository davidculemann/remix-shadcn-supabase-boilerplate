import type { Octokit } from "octokit";
import invariant from "tiny-invariant";
import { env } from "../env.server";
import { getBranches } from "./branches";
import { getDoc, getImage, getMenu } from "./docs";
import { getLatestVersion, getTags } from "./tags";

export { validateParams } from "./params";
export { getRepoTarballStream } from "./repo-tarball";
export {
	getAllReleases,
	getLatestVersion,
	getLatestVersionHeads,
} from "./tags";

export type { Doc } from "./docs";

const REPO = env.SOURCE_REPO;

export function getRepoTags({
	octokit,
	releasePrefix,
}: {
	octokit: Octokit;
	releasePrefix: string;
}) {
	return getTags(REPO, { octokit, releasePrefix });
}

export function getRepoBranches({ octokit }: { octokit: Octokit }) {
	return getBranches(REPO, { octokit });
}

export async function getLatestRepoTag({
	octokit,
	releasePrefix,
}: {
	octokit: Octokit;
	releasePrefix: string;
}): Promise<string> {
	let tags = await getTags(REPO, { octokit, releasePrefix });
	invariant(tags, "Expected tags in getLatestRepoTag");
	return getLatestVersion(tags);
}

export function getRepoDocsMenu(ref: string, lang: string) {
	return getMenu(REPO, ref, lang);
}

export function getRepoDoc(ref: string, slug: string) {
	return getDoc(REPO, ref, slug);
}

export function getRepoImage(ref: string, slug: string) {
	return getImage(REPO, ref, slug);
}
