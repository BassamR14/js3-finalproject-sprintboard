"use client";

import styles from "./page.module.css";
import Navigation from "@/app/components/Navigation";
import RepoInputForm from "./components/RepoInputForm";
import { useRouter } from "next/navigation";
import { parseUrl } from "./lib/parseRepoUrl";

export default function Home() {
  const router = useRouter();

  function handleSubmitRepo(url: string) {
    try {
      const { owner, repo } = parseUrl(url);
      router.push(`/board/${owner}/${repo}`);
    } catch {}
  }

  function handleSubmitPat(pat: string) {
    localStorage.setItem("pat-token", pat);
  }

  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <h1 className={styles.title}>GitHub Issues Board</h1>
        <p className={styles.subtitle}>
          Paste a repository URL to view its issues as a board. Issues are
          sorted into columns by label: <code>to-do</code>, <code>ongoing</code>
          and <code>completed</code>.
        </p>
        <p className={styles.note}>
          Want to create or edit issues? Add a GitHub Personal Access Token
          (PAT) in the field below. Not sure how to get one? See the
          <a
            href="https://github.com/BassamR14/js3-finalproject-sprintboard"
            target="_blank">
            Read Me
          </a>
          .
        </p>
        <RepoInputForm
          onSubmitRepo={handleSubmitRepo}
          onSubmitPat={handleSubmitPat}
        />
      </main>
    </div>
  );
}
