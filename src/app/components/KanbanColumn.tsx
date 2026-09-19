import { Issue } from "../lib/groupIssuesByColumn";
import IssueCard from "./IssueCard";

export default function KanbanColumn({
  title,
  issues,
}: {
  title: string;
  issues: Issue[];
}) {
  return (
    <div>
      <h2>{title}</h2>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
