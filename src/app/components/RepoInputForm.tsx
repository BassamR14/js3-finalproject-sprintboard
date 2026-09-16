"use client";

import { useState } from "react";

interface RepoInputFormProps {
  onSubmitRepo: (repo: string) => void;
}

export default function RepoInputForm({ onSubmitRepo }: RepoInputFormProps) {
  const [repo, SetRepo] = useState<string>("");

  function handleRepoChange(e: React.ChangeEvent<HTMLInputElement>) {
    SetRepo(e.target.value);
  }

  return (
    <div className="repo-input">
      <input
        type="text"
        placeholder="Add Repo"
        value={repo}
        onChange={handleRepoChange}
      />
      <button
        onClick={() => {
          onSubmitRepo(repo);
        }}>
        Get Repo Issues
      </button>
    </div>
  );
}
