"use client";

import { Issue } from "../lib/groupIssuesByColumn";
import IssueCard from "./IssueCard";
import styles from "./KanbanColumn.module.css";
import { useDroppable } from "@dnd-kit/core";

export default function KanbanColumn({
  id,
  title,
  issues,
}: {
  id: string;
  title: string;
  issues: Issue[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <section
      ref={setNodeRef}
      className={styles.column}
      style={{ outline: isOver ? "2px solid #888" : undefined }}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.count}>{issues.length}</span>
      </header>
      <div className={styles.list}>
        {issues.length === 0 ? (
          <p className={styles.empty}>No issues</p>
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        )}
      </div>
    </section>
  );
}
