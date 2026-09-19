import { Issue } from "../lib/groupIssuesByColumn";

export default function IssueCard({ issue }: { issue: Issue }) {
  const { title, body, state } = issue;

  return (
    <div>
      <h3>{title}</h3>
      <p> {body} </p>
      <p> {state} </p>
    </div>
  );
}
