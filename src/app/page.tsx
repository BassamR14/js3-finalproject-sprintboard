"use client";

import styles from "./page.module.css";
import Navigation from "@/app/components/Navigation";
import RepoInputForm from "./components/RepoInputForm";
import { useRouter } from "next/navigation";
import { parseUrl } from "./lib/parseRepoUrl";
import { isValidPatFormat } from "./lib/validatePat";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [repoError, setRepoError] = useState<string | null>(null);
  const [patError, setPatError] = useState<string | null>(null);

  function handleSubmit(url: string, pat: string) {
    setRepoError(null);
    setPatError(null);

    const trimmedPAT = pat.trim();
    if (trimmedPAT && !isValidPatFormat(trimmedPAT)) {
      setPatError("Please enter a valid GitHub token.");
      return;
    }

    try {
      const { owner, repo } = parseUrl(url);

      if (trimmedPAT) {
        localStorage.setItem("pat-token", trimmedPAT);
      }
      localStorage.setItem("repoData", JSON.stringify({ owner, repo }));

      router.push(
        `/board/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
      );
    } catch (err) {
      setRepoError(
        err instanceof Error
          ? err.message
          : "Please enter a valid GitHub repo URL.",
      );
    }
  }

  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <h1 className={styles.title}>GitHub Issues Board</h1>
        <p className={styles.subtitle}>
          Paste a repository URL to view its issues as a board. Issues are
          sorted into columns by label: <code>to-do</code>, <code>ongoing</code>{" "}
          and <code>completed</code>.
        </p>
        <p className={styles.note}>
          Want to create or edit issues? Add a GitHub Personal Access Token
          (PAT) in the field below. Not sure how to get one? See the{" "}
          <a
            href="https://github.com/BassamR14/js3-finalproject-sprintboard"
            target="_blank">
            Read Me
          </a>
          .
        </p>
        <RepoInputForm onSubmit={handleSubmit} />
        {patError && <p className="error">{patError}</p>}
        {repoError && <p className="error">{repoError}</p>}
      </main>
    </div>
  );
}
