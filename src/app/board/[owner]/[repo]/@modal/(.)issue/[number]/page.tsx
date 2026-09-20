import Modal from "@/app/components/Modal";
import IssueLoader from "@/app/components/IssueLoader";

export default async function IssueModalPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string; number: string }>;
}) {
  const { owner, repo, number } = await params;

  return (
    <Modal>
      <IssueLoader owner={owner} repo={repo} number={Number(number)} />
    </Modal>
  );
}
