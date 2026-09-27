import { useContext } from "react";
import { IssuesContext } from "@/app/context/IssuesContext";

export function useIssues() {
  const context = useContext(IssuesContext);
  if (!context) throw new Error("useIssues must be used inside IssuesProvider");
  return context;
}
