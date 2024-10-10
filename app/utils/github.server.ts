import { Octokit } from "octokit";
import { env } from "~/utils/env.server";

export const octokit = new Octokit(
  env.GITHUB_TOKEN ? { auth: env.GITHUB_TOKEN } : undefined,
);
