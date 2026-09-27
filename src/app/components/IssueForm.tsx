"use client";

import { useState } from "react";
import styles from "./IssueForm.module.css";
import CloseButton from "./CloseButton";

interface IssueInputFormProps {
  onSubmitIssue: (title: string, body: string, label: string) => void;
  pageTitle: string;
  submitText: string;
  initialTitle?: string;
  initialBody?: string;
  initialLabel?: string;
}

const TITLE_MAX_LENGTH = 256;
const BODY_MAX_LENGTH = 65536;

export default function IssueForm({
  onSubmitIssue,
  pageTitle,
  submitText,
  initialTitle = "",
  initialBody = "",
  initialLabel = "",
}: IssueInputFormProps) {
  const [title, setTitle] = useState<string>(initialTitle);
  const [body, setBody] = useState<string>(initialBody);
  const [label, setLabel] = useState<string>(initialLabel);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle) {
      setError("Title cannot be empty.");
      return;
    }

    if (trimmedTitle.length > TITLE_MAX_LENGTH) {
      setError(`Title must be ${TITLE_MAX_LENGTH} characters or fewer.`);
      return;
    }

    if (trimmedBody.length > BODY_MAX_LENGTH) {
      setError(`Description must be ${BODY_MAX_LENGTH} characters or fewer.`);
      return;
    }

    onSubmitIssue(trimmedTitle, trimmedBody, label);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <CloseButton />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={handleTitleChange}
          className={styles.input}
          maxLength={TITLE_MAX_LENGTH}
          required
        />
        <textarea
          placeholder="Add Description"
          value={body}
          onChange={handleBodyChange}
          className={`${styles.input} ${styles.textarea}`}
          maxLength={BODY_MAX_LENGTH}
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
          {submitText}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
