const GITHUB_HOSTS = new Set(["github.com", "www.github.com"]);
const VALID_NAME = /^[A-Za-z0-9._-]+$/;

export function parseUrl(urlString: string) {
  let url: URL;

  try {
    url = new URL(urlString);
  } catch {
    throw new Error("That's not a valid URL.");
  }

  if (!GITHUB_HOSTS.has(url.hostname.toLowerCase())) {
    throw new Error("Please enter a github.com repository URL.");
  }

  const [owner, repo] = url.pathname.split("/").filter(Boolean);

  if (!owner || !repo) {
    throw new Error("URL must include both an owner and a repository name.");
  }

  if (!VALID_NAME.test(owner) || !VALID_NAME.test(repo)) {
    throw new Error("Owner or repository name contains invalid characters.");
  }

  return { owner, repo };
}
