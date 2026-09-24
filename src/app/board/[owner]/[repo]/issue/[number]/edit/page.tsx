import EditIssueLoader from "@/app/components/EditIssueLoader";

export default async function EditIssuePage({
  params,
}: {
  params: Promise<{ owner: string; repo: string; number: string }>;
}) {
  const { owner, repo, number } = await params;

  return <EditIssueLoader owner={owner} repo={repo} number={Number(number)} />;
}
