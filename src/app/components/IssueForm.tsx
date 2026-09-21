"use client";

import { useState } from "react";
import styles from "./IssueForm.module.css";
import CloseButton from "./CloseButton";

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create Issue</h1>
        <CloseButton />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={handleTitleChange}
          className={styles.input}
          required
        />
        <textarea
          placeholder="Add Description"
          value={body}
          onChange={handleBodyChange}
          className={`${styles.input} ${styles.textarea}`}
        />
        <select
          name="labels"
          id="labels"
          value={label}
          onChange={handleLabelChange}
          className={styles.input}
          required>
          <option value="">Select Label</option>
          <option value="to-do">To Do</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className={styles.submit}>
          Create Issue
        </button>
      </form>
    </div>
  );
}
