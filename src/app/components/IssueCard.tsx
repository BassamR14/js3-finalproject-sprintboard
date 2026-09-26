"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Issue } from "../lib/groupIssuesByColumn";
import styles from "./IssueCard.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function IssueCard({
  issue,
  isOverlay = false,
}: {
  issue: Issue;
  isOverlay?: boolean;
}) {
  const { title, body, state, labels } = issue;
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: issue.id });

  const content = (
    <article
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
        opacity: isDragging && !isOverlay ? 0.4 : 1,
      }}
      className={styles.card}>
      <span
        className={`${styles.state} ${state === "open" ? styles.open : styles.closed}`}>
        {state}
      </span>
      <h3 className={styles.title}>{title}</h3>
      {body && <p className={styles.body}>{body}</p>}
      {labels?.length > 0 && (
        <section className={styles.labels}>
          {labels.map((label, i) => (
            <span key={i} className={styles.label}>
              {label.name}
            </span>
          ))}
        </section>
      )}
    </article>
  );

  if (isOverlay) return content;

  return (
    <Link
      href={`/board/${owner}/${repo}/issue/${issue.number}`}
      draggable={false}>
      {content}
    </Link>
  );
}
