import Navigation from "@/app/components/Navigation";
import fetchGithubData from "@/app/lib/github";
import KanbanBoard from "@/app/components/KanbanBoard";
import styles from "./page.module.css";

export default async function Board({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;
  const issues = await fetchGithubData(owner, repo);

  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.owner}>{owner} / </span>
          {repo}
        </h1>
        <KanbanBoard data={issues} />
      </main>
    </div>
  );
}
