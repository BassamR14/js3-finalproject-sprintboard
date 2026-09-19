"use server";

const GITHUB_PAT = process.env.GITHUB_PAT;

export default async function fetchGithubData(owner: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_PAT}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  const data = await response.json();

  return data.filter((item: any) => !item.pull_request);
}
