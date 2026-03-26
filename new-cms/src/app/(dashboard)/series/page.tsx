import { EntityList } from "@/components/content/entity-list";
import { LAVO_CONTENT_SLUGS } from "@/lib/lavo-slugs";

export default function SeriesPage() {
  return (
    <EntityList
      slug={LAVO_CONTENT_SLUGS.series}
      title="Series"
      description="Series within collections (col-series)."
      labelKey="title"
      newHref="/series/new"
      editPathPrefix="/series/"
    />
  );
}
