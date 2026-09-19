"use client";

import { useState } from "react";
import styles from "./RepoInputForm.module.css";

interface RepoInputFormProps {
  onSubmitRepo: (repo: string) => void;
}

export default function RepoInputForm({ onSubmitRepo }: RepoInputFormProps) {
  const [repo, setRepo] = useState<string>("");

  function handleRepoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRepo(e.target.value);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmitRepo(repo);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
