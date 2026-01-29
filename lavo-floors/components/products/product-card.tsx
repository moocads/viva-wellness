import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 truncate">
          {product.metaLine}
        </p>
        <h3 className="text-sm font-medium">{product.name}</h3>
      </div>
    </Link>
  );
}
