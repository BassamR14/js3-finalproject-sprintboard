"use client";

import { useState } from "react";
import { createIssue } from "@/app/lib/github";
import IssueForm from "./IssueForm";
import { useRouter } from "next/navigation";
import { useIssues } from "../hooks/useIssues";

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
  const { addIssue } = useIssues();

  function handleSubmitIssue(title: string, body: string, label: string) {
    setError(null);

    const pat = localStorage.getItem("pat-token");

    if (!pat) {
      setError("No token found");
      return;
    }

    createIssue(owner, repo, { title, body, labels: label ? [label] : [] }, pat)
      .then((newIssue) => {
        addIssue(newIssue);

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
      <IssueForm
        onSubmitIssue={handleSubmitIssue}
        pageTitle="Create Issue"
        submitText="Create Issue"
      />
      {error && <p className="error">Something went wrong: {error}</p>}
    </>
  );
}
