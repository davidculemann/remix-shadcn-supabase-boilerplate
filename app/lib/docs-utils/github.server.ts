import { env } from "@/lib/docs-utils/env.server";
import { Octokit } from "octokit";

export const octokit = new Octokit(env.GITHUB_TOKEN ? { auth: env.GITHUB_TOKEN } : undefined);
