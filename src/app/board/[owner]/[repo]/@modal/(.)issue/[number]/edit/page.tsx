import EditIssueLoader from "@/app/components/EditIssueLoader";
import Modal from "@/app/components/Modal";

export default async function EditIssueModalPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string; number: string }>;
}) {
  const { owner, repo, number } = await params;

  return (
    <Modal>
      <EditIssueLoader
        owner={owner}
        repo={repo}
        number={Number(number)}
        isModal
      />
    </Modal>
  );
}
