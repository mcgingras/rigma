import PageDetailsData from "@/components/PageDataDetails";

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageDetailsData />
      <div className="relative z-0">{children}</div>
    </>
  );
}
