import { Issue } from "../lib/groupIssuesByColumn";
import styles from "./IssueCard.module.css";

export default function IssueCard({ issue }: { issue: Issue }) {
  const { title, body, state } = issue;

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {body && <p className={styles.body}>{body}</p>}
      <span
        className={`${styles.state} ${
          state === "open" ? styles.open : styles.closed
        }`}>
        {state}
      </span>
    </article>
  );
}
