import { Issue } from "@/app/lib/groupIssuesByColumn";
import styles from "./IssueDetail.module.css";
import CloseButton from "./CloseButton";
import Link from "next/link";

interface Props {
  issue: Issue;
  owner: string;
  repo: string;
}

export default function IssueDetail({ issue, owner, repo }: Props) {
  const { title, body, state, labels } = issue;

  return (
    <article className={styles.issue}>
      <header className={styles.header}>
        <div className={styles.topRow}>
          <span
            className={`${styles.state} ${
              state === "open" ? styles.open : styles.closed
            }`}>
            {state}
          </span>
          <CloseButton />
        </div>
        <h3 className={styles.title}>{title}</h3>

        {labels?.length > 0 && (
          <section className={styles.labels}>
            {labels.map((label, i) => (
              <span key={i} className={styles.label}>
                {label.name}
              </span>
            ))}
          </section>
        )}
      </header>

      {body ? (
        <div className={styles.body}>{body}</div>
      ) : (
        <p className={styles.empty}>No description provided.</p>
      )}

      <footer className={styles.footer}>
        <Link
          href={`/board/${owner}/${repo}/issue/${issue.number}/edit`}
          className={styles.editLink}>
          Edit
        </Link>
      </footer>
    </article>
  );
}
