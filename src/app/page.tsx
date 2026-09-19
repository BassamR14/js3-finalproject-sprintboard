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
    <div>
      <Navigation />
      <RepoInputForm onSubmitRepo={handleSubmitRepo} />
    </div>
  );
}
