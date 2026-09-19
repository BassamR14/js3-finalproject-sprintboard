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

  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <h1 className={styles.title}>GitHub Issues Board</h1>
        <p className={styles.subtitle}>
          Paste a repository URL to see its issues laid out as a board. Issues
          should have labels "to-do", "ongoing", "completed".
        </p>
        <RepoInputForm onSubmitRepo={handleSubmitRepo} />
      </main>
    </div>
  );
}
