import CreateIssueContainer from "@/app/components/CreateIssueContainer";
import Navigation from "@/app/components/Navigation";

export default async function CreateIssuePage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;

  return (
    <>
      <Navigation />
      <CreateIssueContainer owner={owner} repo={repo} />
    </>
  );
}
