"use client";

import { useIssues } from "../context/useIssues";
import EditIssueContainer from "./EditIssueContainer";

interface Props {
  owner: string;
  repo: string;
  number: number;
  isModal?: boolean;
}

export default function EditIssueLoader({
  owner,
  repo,
  number,
  isModal = false,
}: Props) {
  const { issues } = useIssues();

  if (!issues) return <p>Loading...</p>;

  const issue = issues.find((i) => i.number === number);
  if (!issue) return <p>Issue not found.</p>;

  return (
    <EditIssueContainer
      owner={owner}
      repo={repo}
      issue={issue}
      isModal={isModal}
    />
  );
}
