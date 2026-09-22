"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { useEffect, useState } from "react";

interface RepoData {
  owner: string;
  repo: string;
}

export default function Navigation() {
  const [hasPat, setHasPat] = useState(false);
  const [repoData, setRepoData] = useState<RepoData | null>(null);

  useEffect(() => {
    setHasPat(Boolean(localStorage.getItem("pat-token")));

    const stored = localStorage.getItem("repoData");
    if (stored) {
      try {
        setRepoData(JSON.parse(stored));
      } catch {
        setRepoData(null);
      }
    }
  }, []);

  function handleClearPat() {
    localStorage.removeItem("pat-token");
    setHasPat(false);
  }

  const boardHref = repoData
    ? `/board/${repoData.owner}/${repoData.repo}`
    : null;

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      {/* /board is static at the moment, save last viewed repo in local storage and link to that. */}
      {boardHref ? (
        <Link href={boardHref} className={styles.link}>
          Board
        </Link>
      ) : (
        <span className={styles.linkDisabled} title="No repo saved yet">
          Board
        </span>
      )}

      <div className={styles.token}>
        <span>
          {hasPat ? "Token saved in this browser." : "No token saved."}
        </span>
        {hasPat && (
          <button
            type="button"
            className={styles.clear}
            onClick={handleClearPat}>
            Clear token
          </button>
        )}
      </div>
    </nav>
  );
}
