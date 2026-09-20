import IssueLoader from "@/app/components/IssueLoader";

export default async function IssuePage({
  params,
}: {
  params: Promise<{ owner: string; repo: string; number: string }>;
}) {
  const { owner, repo, number } = await params;

  return <IssueLoader owner={owner} repo={repo} number={Number(number)} />;
}
