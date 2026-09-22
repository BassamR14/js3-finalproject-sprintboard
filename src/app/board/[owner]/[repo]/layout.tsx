import { IssuesProvider } from "@/app/context/IssuesContext";

export default function BoardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <IssuesProvider>
      {children}
      {modal}
    </IssuesProvider>
  );
}
