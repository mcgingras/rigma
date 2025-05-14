import PageDetailsData from "@/components/PageDataDetails";
import Link from "next/link";

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageDetailsData />
      <div className="relative z-0">
        <Link
          className="text-xs text-black rounded-md fixed top-4 left-4 z-50 bg-gray-100 px-2 py-1"
          href="/"
        >
          Home
        </Link>
        {children}
      </div>
    </>
  );
}
