import IssueDetail from "@/app/components/IssueDetail";
import Modal from "@/app/components/Modal";
import { fetchIssueData } from "@/app/lib/github";

export default async function IssueModalPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string; number: string }>;
}) {
  const { owner, repo, number } = await params;
  const issue = await fetchIssueData(owner, repo, Number(number));

  return (
    <Modal>
      <IssueDetail issue={issue} />
    </Modal>
  );
}
