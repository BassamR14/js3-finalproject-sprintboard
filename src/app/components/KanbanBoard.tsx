"use client";

import { groupIssuesByColumn, Issue } from "../lib/groupIssuesByColumn";
import KanbanColumn from "./KanbanColumn";
import styles from "./KanbanBoard.module.css";
import { useState } from "react";
import { useParams } from "next/navigation";
import { updateIssue } from "../lib/github";
import { useIssues } from "../context/useIssues";
import IssueCard from "./IssueCard";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

export default function KanbanBoard({ data }: { data: Issue[] }) {
  const columns = groupIssuesByColumn(data);

  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const { editIssue } = useIssues();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const issue = data.find((i) => i.id === event.active.id);
    setActiveIssue(issue ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveIssue(null);
    if (!over) return;

    const targetLabel = over.id as string;
    const issue = data.find((i) => i.id === active.id);
    if (!issue) return;

    const previousLabels = issue.labels;
    const newLabels = [
      ...issue.labels.filter(
        (l) => !["to-do", "ongoing", "completed"].includes(l.name),
      ),
      { name: targetLabel },
    ];

    editIssue({ ...issue, labels: newLabels });

    const pat = localStorage.getItem("pat-token");
    if (!pat) return editIssue({ ...issue, labels: previousLabels });

    try {
      const updated = await updateIssue(
        owner,
        repo,
        issue.number,
        {
          title: issue.title,
          body: issue.body ?? "",
          labels: newLabels.map((l) => l.name),
        },
        pat,
      );
      editIssue(updated);
    } catch {
      editIssue({ ...issue, labels: previousLabels });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        <KanbanColumn id="to-do" title="To do" issues={columns.todo} />
        <KanbanColumn id="ongoing" title="Ongoing" issues={columns.ongoing} />
        <KanbanColumn
          id="completed"
          title="Completed"
          issues={columns.completed}
        />
      </div>
      <DragOverlay>
        {activeIssue ? <IssueCard issue={activeIssue} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
