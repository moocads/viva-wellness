import { EntityList } from "@/components/content/entity-list";
import { LAVO_CONTENT_SLUGS } from "@/lib/lavo-slugs";

export default function ProductsPage() {
  return (
    <EntityList
      slug={LAVO_CONTENT_SLUGS.product}
      title="Products"
      description="Products within a series (product)."
      labelKey="product_name"
      newHref="/products/new"
      editPathPrefix="/products/"
    />
  );
}
