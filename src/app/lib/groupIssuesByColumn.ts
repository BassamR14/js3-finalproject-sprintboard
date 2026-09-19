interface Issue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: string;
  labels: { name: string }[];
}

export function groupIssuesByColumn(issues: Issue[]) {
  const todo: Issue[] = [];
  const ongoing: Issue[] = [];
  const completed: Issue[] = [];

  for (const issue of issues) {
    const labelNames = issue.labels.map((label) => label.name);

    if (labelNames.includes("completed")) {
      completed.push(issue);
    } else if (labelNames.includes("ongoing")) {
      ongoing.push(issue);
    } else {
      todo.push(issue);
    }
  }

  return { todo, ongoing, completed };
}
