import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      {/* /board is static at the moment, save last viewed repo in local storage and link to that. */}
      <Link href="/board" className={styles.link}>
        Board
      </Link>
    </nav>
  );
}
