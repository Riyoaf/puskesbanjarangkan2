import EditNewsPage from "@/components/pages/edit-news-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditNewsPage id={id} />;
}
