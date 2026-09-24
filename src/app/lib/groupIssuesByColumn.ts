export interface Issue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: string;
  labels: { name: string }[];
}

export const columnLabels = ["to-do", "ongoing", "completed"];

export function getColumnLabel(issue: Issue): string | null {
  const names = issue.labels.map((l) => l.name);

  if (names.includes("completed")) return "completed";
  if (names.includes("ongoing")) return "ongoing";
  if (names.includes("to-do")) return "to-do";
  return null;
}

export function groupIssuesByColumn(issues: Issue[]) {
  const todo: Issue[] = [];
  const ongoing: Issue[] = [];
  const completed: Issue[] = [];

  for (const issue of issues) {
    const column = getColumnLabel(issue);

    if (column === "completed") completed.push(issue);
    else if (column === "ongoing") ongoing.push(issue);
    else if (column === "to-do") todo.push(issue);
  }

  return { todo, ongoing, completed };
}
