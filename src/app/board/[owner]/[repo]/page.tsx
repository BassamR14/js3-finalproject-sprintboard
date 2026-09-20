"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navigation from "@/app/components/Navigation";
import KanbanBoard from "@/app/components/KanbanBoard";
import styles from "./page.module.css";
import { fetchGithubData } from "@/app/lib/github";
import { Issue } from "@/app/lib/groupIssuesByColumn";

export default function Board() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pat = localStorage.getItem("pat-token");

    fetchGithubData(owner, repo, pat)
      .then(setIssues)
      .catch((e) => setError(e.message));
  }, [owner, repo]);

  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.owner}>{owner} / </span>
          {repo}
        </h1>
        {error && <p>Something went wrong: {error}</p>}
        {!error && !issues && <p>Loading…</p>}
        {issues && <KanbanBoard data={issues} />}{" "}
      </main>
    </div>
  );
}
