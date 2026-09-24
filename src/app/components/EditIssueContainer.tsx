"use client";

import { useState } from "react";
import { updateIssue } from "@/app/lib/github";
import IssueForm from "./IssueForm";
import { useRouter } from "next/navigation";
import { useIssues } from "../context/useIssues";
import {
  columnLabels,
  getColumnLabel,
  Issue,
} from "../lib/groupIssuesByColumn";

interface Props {
  owner: string;
  repo: string;
  issue: Issue;
  isModal?: boolean;
}

export default function EditIssueContainer({
  owner,
  repo,
  issue,
  isModal = false,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { editIssue } = useIssues();
  const currentColumnLabel = getColumnLabel(issue) ?? "";

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

    const otherLabels = issue.labels
      .map((l) => l.name)
      .filter((name) => !columnLabels.includes(name));

    const labels = label ? [...otherLabels, label] : otherLabels;

    updateIssue(owner, repo, issue.number, { title, body, labels }, pat)
      .then((updated) => {
        editIssue(updated);

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
        pageTitle="Edit Issue"
        submitText="Save Changes"
        initialTitle={issue.title}
        initialBody={issue.body ?? ""}
        initialLabel={currentColumnLabel}
      />
      {error && <p style={errorStyle}>Something went wrong: {error}</p>}
    </>
  );
}
