"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Issue } from "../lib/groupIssuesByColumn";
import styles from "./IssueCard.module.css";

export default function IssueCard({ issue }: { issue: Issue }) {
  const { title, body, state, labels } = issue;
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  return (
    <Link href={`/board/${owner}/${repo}/issue/${issue.number}`}>
      <article className={styles.card}>
        <span
          className={`${styles.state} ${
            state === "open" ? styles.open : styles.closed
          }`}>
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
    </Link>
  );
}
