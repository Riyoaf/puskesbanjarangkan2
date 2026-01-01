import EditActivityPage from "@/components/pages/edit-activity-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditActivityPage id={id} />;
}
