"use server";

import { parseUrl } from "./parseRepoUrl";

const GITHUB_PAT = process.env.GITHUB_PAT;

export default async function fetchGithubData(url: string) {
  const { owner, repo } = parseUrl(url);

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_PAT}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  const data = await response.json();

  return data;
}
