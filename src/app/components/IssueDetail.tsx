import { Issue } from "@/app/lib/groupIssuesByColumn";
import styles from "./IssueDetail.module.css";
import CloseButton from "./CloseButton";

export default function IssueDetail({ issue }: { issue: Issue }) {
  const { title, body, state } = issue;

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
      </header>

      {body ? (
        <div className={styles.body}>{body}</div>
      ) : (
        <p className={styles.empty}>No description provided.</p>
      )}
    </article>
  );
}
