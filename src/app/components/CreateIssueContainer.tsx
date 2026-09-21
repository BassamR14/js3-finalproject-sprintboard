"use client";

import { useState } from "react";
import { createIssue } from "@/app/lib/github";
import IssueForm from "./IssueForm";
import { useRouter } from "next/navigation";

interface Props {
  owner: string;
  repo: string;
  isModal?: boolean;
}

export default function CreateIssueContainer({
  owner,
  repo,
  isModal = false,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const errorStyle: React.CSSProperties = {
    color: "#f85149",
    fontSize: "0.875rem",
    margin: 0,
    textAlign: "center",
  };

  function handleSubmitIssue(title: string, body: string, label: string) {
    setError(null);

    const pat = localStorage.getItem("pat-token");

    if (!pat) {
      setError("No token found");
      return;
    }

    createIssue(owner, repo, { title, body, labels: label ? [label] : [] }, pat)
      .then(() => {
        if (isModal) {
          router.back();
        } else {
          router.push(`/board/${owner}/${repo}`);
        }
      })
      .catch((e) => setError(e.message));
  }

  return (
    <>
      <IssueForm onSubmitIssue={handleSubmitIssue} />
      {error && <p style={errorStyle}>Something went wrong: {error}</p>}
    </>
  );
}
