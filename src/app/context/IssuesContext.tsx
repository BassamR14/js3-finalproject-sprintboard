"use client";

import { createContext, useContext, useState } from "react";
import { Issue } from "@/app/lib/groupIssuesByColumn";

interface IssuesContextValue {
  issues: Issue[] | null;
  setIssues: React.Dispatch<React.SetStateAction<Issue[] | null>>;
  addIssue: (issue: Issue) => void;
  editIssue: (issue: Issue) => void;
}

export const IssuesContext = createContext<IssuesContextValue | null>(null);

export function IssuesProvider({ children }: { children: React.ReactNode }) {
  const [issues, setIssues] = useState<Issue[] | null>(null);

  function addIssue(issue: Issue) {
    setIssues((prev) => (prev ? [issue, ...prev] : prev));
  }

  function editIssue(updated: Issue) {
    setIssues((prev) =>
      prev
        ? prev.map((i) => (i.number === updated.number ? updated : i))
        : prev,
    );
  }

  return (
    <IssuesContext.Provider value={{ issues, setIssues, addIssue, editIssue }}>
      {children}
    </IssuesContext.Provider>
  );
}
