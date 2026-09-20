"use client";

import { useRouter } from "next/navigation";
import styles from "./CloseButton.module.css";

export default function CloseButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.close}
      onClick={() => router.back()}>
      ✕
    </button>
  );
}
