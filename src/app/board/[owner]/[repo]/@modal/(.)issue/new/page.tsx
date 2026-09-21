import CreateIssueContainer from "@/app/components/CreateIssueContainer";
import Modal from "@/app/components/Modal";

export default async function ModalCreateIssuePage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;

  return (
    <Modal>
      <CreateIssueContainer owner={owner} repo={repo} isModal />
    </Modal>
  );
}
