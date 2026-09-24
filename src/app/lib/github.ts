function buildHeaders(pat?: string | null): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    ...(pat ? { Authorization: `Bearer ${pat}` } : {}),
  };
}

async function checkResponse(response: Response) {
  if (response.ok) return;

  if (response.status === 401) {
    throw new Error(
      "Your GitHub token was rejected. It may be invalid or expired — add a new one on the home page.",
    );
  }

  throw new Error(`GitHub responded with ${response.status}`);
}

export async function fetchGithubData(
  owner: string,
  repo: string,
  pat?: string | null,
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`,
    {
      headers: buildHeaders(pat),
    },
  );

  await checkResponse(response);

  const data = await response.json();

  return data.filter((item: any) => !item.pull_request);
}

export async function fetchIssueData(
  owner: string,
  repo: string,
  number: number,
  pat?: string | null,
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${number}`,
    {
      headers: buildHeaders(pat),
    },
  );

  await checkResponse(response);

  const data = await response.json();

  return data;
}

export async function createIssue(
  owner: string,
  repo: string,
  issue: { title: string; body: string; labels: string[] },
  pat: string,
) {
  if (!pat) throw new Error("Add a GitHub token before creating an issue.");

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues`,
    {
      method: "POST",
      headers: {
        ...buildHeaders(pat),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue),
    },
  );

  await checkResponse(response);

  const data = await response.json();

  return data;
}
