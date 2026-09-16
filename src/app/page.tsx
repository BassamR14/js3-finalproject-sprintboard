"use client";

import styles from "./page.module.css";
import Navigation from "@/app/components/Navigation";
import RepoInputForm from "./components/RepoInputForm";
import fetchGithubData from "./lib/github";

export default function Home() {
  return (
    <div>
      <Navigation />
      <RepoInputForm onSubmitRepo={fetchGithubData} />
    </div>
  );
}
