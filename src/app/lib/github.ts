import { parseUrl } from "./parseRepoUrl";

export default async function fetchGithubData(url: string) {
  const { owner, repo } = parseUrl(url);

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues`,
  );
  const data = await response.json();
  console.log(data);

  return data;
}
