# Sprintboard- GitHub Issues Kanban Board

## Description

Sprintboard is a Kanban board built with **Next.js (App Router) and React** that visualizes the issues of any public (or private, with a token) GitHub repository as cards on a three-column board: **To do**, **Ongoing**, and **Completed**.

You paste a GitHub repository URL on the home page, and the app fetches that repo's issues via the **GitHub REST API** and sorts them into columns based on their labels. Cards can be dragged between columns to change their label, clicked to open a detail view, and (with a GitHub Personal Access Token added) created or edited directly from the app — changes are written back to the real GitHub issue.

## Features

- Paste any `github.com/owner/repo` URL and view its issues as a board
- Issues are grouped into columns based on the labels `to-do`, `ongoing`, and `completed`
- **Drag and drop** cards between columns — the issue's label is updated on GitHub automatically
- Click a card to see the full issue detail (title, description, state, labels)
- Create new issues and edit existing ones through a form, when a GitHub token is provided
- Last used repository and token are remembered between visits (stored in `localStorage`)
- Loading and error states while data is being fetched from GitHub

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + React + TypeScript
- [@dnd-kit](https://dndkit.com/) for drag-and-drop
- GitHub REST API
- CSS Modules

## Getting started

### Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/BassamR14/js3-finalproject-sprintboard.git
   cd js3-finalproject-sprintboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Use the deployed version

You can also try the app without installing anything: **https://js3-finalproject-sprintboard-ezip.vercel.app/**

## Adding a GitHub Personal Access Token (PAT)

Viewing a board works without any token — it uses the public GitHub API. To **create or edit issues**, you need to add a GitHub Personal Access Token in the field on the home page. You can use either a **classic** token or a **fine-grained** token.

### Option 1: Classic token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Give it a name and select the **`repo`** scope (this gives read/write access to issues).
4. Generate the token and paste it into the PAT field on the Sprintboard home page.

### Option 2: Fine-grained token

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**.
2. Click **Generate new token**.
3. Under **Repository access**, choose **Only select repositories** and pick the exact repository you'll be using with Sprintboard.
4. Under **Permissions** → **Repository permissions**, set **Issues** to **Read and write**.
5. Generate the token and paste it into the PAT field on the Sprintboard home page.

> ⚠️ If you use a fine-grained token, make sure it's scoped to the **same repository** you enter on the home page and that the **Issues** permission is set to **Read and write** — otherwise creating/editing issues will fail with an authorization error.

The token is stored only in your browser's `localStorage` and can be removed at any time using the "Clear token" button in the navigation bar.

## Requirements fulfilled

- **Component structure:** More than 5 clearly scoped components, each with a single responsibility (`Navigation`, `RepoInputForm`, `KanbanBoard`, `KanbanColumn`, `IssueCard`, `IssueDetail`, `IssueForm`, `Modal`, `CloseButton`, etc.), organized into `components/`, `context/`, `hooks/`, and `lib/`.
- **Routing:** Multiple views connected via Next.js App Router — home page, board view, issue detail view, create-issue view, and edit-issue view (plus modal variants for each) — navigated without full page reloads.
- **State management:** Global state (fetched issues) is shared across components via `IssuesContext`/`useIssues` (used by the board, cards, and the create/edit forms), while form input (title, body, label, repo URL, token) is kept as local component state.
- **External API calls:** `lib/github.ts` fetches issues, a single issue, and creates/updates issues via the GitHub REST API, with loading states (`Loading…`) and error handling (e.g. rejected/expired token, non-OK responses).
- **Forms and validation:** `RepoInputForm` validates the repo URL and PAT format; `IssueForm` requires a non-empty title, enforces max lengths, and shows inline error messages.
- **Persistence:** The last used repository and the GitHub token are saved to `localStorage` and restored on future visits — the "Board" link in the navigation bar takes you straight back to that repository's board without having to re-enter the URL.
- **Code quality:** Consistent naming/formatting, no leftover `console.log` statements, code committed to Git with incremental commit history.
- **Extended error handling:** Each Kanban column shows a "No issues" empty state, and API errors (e.g. an invalid/expired token returning 401, or other non-OK responses) are caught and surfaced to the user instead of failing silently.
- **Thought-out component architecture:** Shared state lives in IssuesContext, accessed through a custom hook (useIssues) rather than components reaching into the context directly, and presentation is separated from data-fetching/mutation logic (e.g. `IssueForm` is a pure presentational component reused by both `CreateIssueContainer` and `EditIssueContainer`, which handle the actual API calls), and components like `IssueCard` are reused in multiple contexts (board card and drag overlay).
- **Extended functionality relevant to the idea:** Drag-and-drop support (via `@dnd-kit`) lets users move issue cards between columns, which updates the issue's label on GitHub in real time.
- **Responsive design:** The interface is styled for both the standard desktop layout and a mobile layout (tested at 425px), so the board and forms remain usable at both sizes.

## Known limitations

- Only issues that already have one of the exact labels `to-do`, `ongoing`, or `completed` are shown on the board. Issues without one of these labels (or with differently-cased/spelled variants) are not displayed.

## Known bugs

- Navigating directly to an "edit issue" view (e.g. via a hard page refresh, rather than opening it as a modal from the board) gets stuck on a "Loading…" state and never loads the edit form. This happens because the edit view currently relies on the shared `IssuesContext`, which is empty until the board page has fetched the issues in the same session.

## Possible improvements

- Use a GitHub App / OAuth App for authorization instead of asking the user to manually create and paste a Personal Access Token, for a smoother and safer sign-in flow.
- Let the user configure which labels correspond to each column, or add a 4th column that collects all unmatched issues so the user can manually sort them into To do / Ongoing / Completed.
- Support more label spelling/casing variations (e.g. `To-do`, `To Do`, `to do`) instead of requiring an exact match.
- When an issue's label is changed to completed (e.g. by dragging it into that column), also update the issue's state on GitHub to closed instead of leaving it open.
- Allow adding additional labels to an issue beyond the three status labels (to-do, ongoing, completed).
