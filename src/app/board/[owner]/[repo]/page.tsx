import Navigation from "@/app/components/Navigation";
import fetchGithubData from "@/app/lib/github";
import KanbanBoard from "@/app/components/KanbanBoard";

export default async function Board({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;
  const issues = await fetchGithubData(owner, repo);

  return (
    <div>
      <Navigation />
      <KanbanBoard data={issues} />
    </div>
  );
}
