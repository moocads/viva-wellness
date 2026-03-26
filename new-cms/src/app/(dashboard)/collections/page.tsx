import { EntityList } from "@/components/content/entity-list";
import { LAVO_CONTENT_SLUGS } from "@/lib/lavo-slugs";

export default function CollectionsPage() {
  return (
    <EntityList
      slug={LAVO_CONTENT_SLUGS.collection}
      title="Collections"
      description="Top-level groups (col-collection)."
      labelKey="title"
      newHref="/collections/new"
      editPathPrefix="/collections/"
    />
  );
}
