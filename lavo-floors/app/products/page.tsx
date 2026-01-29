import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductsClient } from "@/components/products/products-client";

export const metadata = {
  title: "Products - Lavo Floors",
  description: "Browse our collection of premium engineered hardwood floors.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://placehold.co/1920x600/4a4035/4a4035?text=')",
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative h-full flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
              Our Collection
            </h1>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
              <ProductsClient />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
