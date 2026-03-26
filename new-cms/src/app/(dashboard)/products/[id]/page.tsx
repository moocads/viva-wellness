import { ProductForm } from "@/components/content/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductForm id={id} />;
}
