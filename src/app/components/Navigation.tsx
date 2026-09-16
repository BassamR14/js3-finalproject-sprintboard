import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      {/* /Board is static at the moment, save last viewed repo in local storage and link to that. */}
      <Link href="/board">Board</Link>
    </nav>
  );
}
