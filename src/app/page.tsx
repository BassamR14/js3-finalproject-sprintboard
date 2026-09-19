"use client";

import styles from "./page.module.css";
import Navigation from "@/app/components/Navigation";
import RepoInputForm from "./components/RepoInputForm";
import fetchGithubData from "./lib/github";

export default function Home() {
  async function getIssues(url: string) {
    const issues = await fetchGithubData(url);
    console.log(issues);
  }

  return (
    <div>
      <Navigation />
      <RepoInputForm onSubmitRepo={getIssues} />
    </div>
  );
}
