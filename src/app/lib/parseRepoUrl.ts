export function parseUrl(urlString: string) {
  const url = new URL(urlString);
  const [owner, repo] = url.pathname.split("/").filter(Boolean);
  return { owner, repo };
}
