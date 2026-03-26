import { SeriesForm } from "@/components/content/series-form";

export default async function EditSeriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SeriesForm id={id} />;
}
