import { CollectionForm } from "@/components/content/collection-form";

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CollectionForm id={id} />;
}
