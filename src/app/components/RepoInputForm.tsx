"use client";

import { useState } from "react";
import styles from "./RepoInputForm.module.css";

interface RepoInputFormProps {
  onSubmitRepo: (repo: string) => void;
  onSubmitPat: (pat: string) => void;
}

export default function RepoInputForm({
  onSubmitRepo,
  onSubmitPat,
}: RepoInputFormProps) {
  const [repo, setRepo] = useState<string>("");
  const [pat, setPat] = useState<string>("");

  function handleRepoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRepo(e.target.value);
  }

  function handlePAT(e: React.ChangeEvent<HTMLInputElement>) {
    setPat(e.target.value);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pat.trim()) onSubmitPat(pat.trim());
    onSubmitRepo(repo);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={`${styles.input} ${styles.long}`}
        type="password"
        placeholder="Enter your GitHub PAT (github_pat_...)"
        value={pat}
        onChange={handlePAT}
      />

      <input
        className={styles.input}
        type="text"
        placeholder="https://github.com/owner/repo"
        value={repo}
        onChange={handleRepoChange}
      />
      <button className={styles.button} type="submit">
        Get Repository Issues
      </button>
    </form>
  );
}
