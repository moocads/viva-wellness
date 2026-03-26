import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import type { StrapiProductDetailVM } from "@/lib/strapi-mappers";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";
import { ProductImageSlider } from "@/components/products/product-image-slider";

type Props = {
  detail: StrapiProductDetailVM;
  backHref: string;
  backLabel: string;
  relatedProducts: Product[];
};

export function StrapiProductDetail({
  detail,
  backHref,
  backLabel,
  relatedProducts,
}: Props) {
  const firstDoc = detail.documents[0];
  const sliderImages = [
    detail.productImageUrl,
    detail.renderingImageUrl,
  ].filter(Boolean);

  return (
    <>
      <section className="pt-24 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>
      </section>

      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-center md:text-left mb-10">
            {detail.name}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: slider + thumbnails */}
            <div>
              <ProductImageSlider images={sliderImages} productName={detail.name} />
            </div>

            {/* Right: specs table + button */}
            <div className="flex flex-col">
              <div className="border border-border rounded-sm overflow-hidden mb-8">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold w-[40%]">
                        Specification
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                      
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.specRows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className="py-8 px-4 text-center text-muted-foreground"
                        >
                          No specifications available.
                        </td>
                      </tr>
                    ) : (
                      detail.specRows.map((row, i) => (
                        <tr
                          key={`${row.label}-${i}`}
                          className="border-b border-border last:border-0"
                        >
                          <td className="py-3 px-4 text-muted-foreground align-top">
                            {row.label}
                          </td>
                          <td className="py-3 px-4 font-medium align-top">
                            {row.value}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {firstDoc ? (
                <a
                  href={firstDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={firstDoc.name}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
                >
                  <Download className="h-4 w-4 shrink-0" />
                  Download Product Specs
                </a>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No product specs available.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold tracking-wide mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.detailPath ?? p.slug}
                  product={p}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
