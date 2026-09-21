"use client";

import { useState } from "react";

interface IssueInputFormProps {
  onSubmitIssue: (title: string, body: string, label: string) => void;
}

export default function IssueForm({ onSubmitIssue }: IssueInputFormProps) {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [label, setLabel] = useState<string>("");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleBodyChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
  }

  function handleLabelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLabel(e.target.value);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmitIssue(title, body, label);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <textarea
        placeholder="Add Description"
        value={body}
        onChange={handleBodyChange}
      />
      <select
        name="labels"
        id="labels"
        value={label}
        onChange={handleLabelChange}
        required>
        <option value="">Select Label</option>
        <option value="to-do">To Do</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <button>Create Issue</button>
    </form>
  );
}
