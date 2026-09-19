import { Issue } from "../lib/groupIssuesByColumn";
import IssueCard from "./IssueCard";
import styles from "./KanbanColumn.module.css";

export default function KanbanColumn({
  title,
  issues,
}: {
  title: string;
  issues: Issue[];
}) {
  return (
    <section className={styles.column}>
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
