"use client";

import { useEffect, useState } from "react";
import IssueDetail from "@/app/components/IssueDetail";
import { fetchIssueData } from "@/app/lib/github";
import { Issue } from "../lib/groupIssuesByColumn";

interface IssueLoaderProps {
  owner: string;
  repo: string;
  number: number;
}

export default function IssueLoader({ owner, repo, number }: IssueLoaderProps) {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pat = localStorage.getItem("pat-token");

    fetchIssueData(owner, repo, number, pat)
      .then(setIssue)
      .catch((e) => setError(e.message));
  }, [owner, repo, number]);

  if (error) return <p>Something went wrong: {error}</p>;
  if (!issue) return <p>Loading…</p>;

  return <IssueDetail issue={issue} />;
}
