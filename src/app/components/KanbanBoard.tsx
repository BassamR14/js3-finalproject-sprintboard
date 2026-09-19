"use client";

import { groupIssuesByColumn, Issue } from "../lib/groupIssuesByColumn";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard({ data }: { data: Issue[] }) {
  console.log(data[0]);
  const columns = groupIssuesByColumn(data);

  return (
    <div>
      <KanbanColumn title="To do" issues={columns.todo} />
      <KanbanColumn title="Ongoing" issues={columns.ongoing} />
      <KanbanColumn title="Completed" issues={columns.completed} />
    </div>
  );
}
