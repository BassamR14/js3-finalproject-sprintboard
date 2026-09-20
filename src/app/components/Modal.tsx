"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Modal.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div className={styles.backdrop} onClick={() => router.back()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
