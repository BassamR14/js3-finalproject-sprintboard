"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [hasPat, setHasPat] = useState(false);

  useEffect(() => {
    setHasPat(Boolean(localStorage.getItem("pat-token")));
  }, []);

  function handleClearPat() {
    localStorage.removeItem("pat-token");
    setHasPat(false);
  }

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      {/* /board is static at the moment, save last viewed repo in local storage and link to that. */}
      <Link href="/board" className={styles.link}>
        Board
      </Link>

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
