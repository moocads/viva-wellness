import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getCollectionBySlug, getCollections } from "@/lib/api/collections";
import { getSeriesByCollection } from "@/lib/api/series";
import { getStrapiMedia } from "@/lib/strapi";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Build/CI 有时 env 未注入时会导致这里直接抛错。
  // 返回空数组即可：页面仍会在运行时按需渲染。
  if (!process.env.NEXT_PUBLIC_CMS_API_URL) return [];

  try {
    const collections = await getCollections();
    return collections.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  const collection = await getCollectionBySlug(slug);
  if (!collection) return notFound();

  // Collection → Series → Product：允许暂无 series（不 404，只显示空状态）
  const seriesList = (await getSeriesByCollection(slug)) ?? [];

  const bannerUrl = getStrapiMedia(collection.cover_image?.url);

  return (
    <>
      <Navbar />
      <main>
        {/* Banner */}
        <section className="relative h-[400px] w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: bannerUrl
                ? `url('${bannerUrl}')`
                : "url('https://placehold.co/1920x600/4a4035/4a4035?text=')",
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative h-full flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
              {collection.collection_name}
            </h1>
          </div>
        </section>

        {/* Collection 文案：整页只出现一次（来自 Collection，不是 Series） */}
        {collection.description ? (
          <section className="px-4 pb-4 py-12">
            <div className="max-w-3xl mx-auto text-md text-muted-foreground leading-relaxed text-center">
              {collection.description}
            </div>
          </section>
        ) : null}

        {/*
          Series 列表：网格里每一项是一条 Series。
          - 图 / 主标题：必须用该 Series 的 cover_image、seriesName（不是 Collection 的图）
          - 小字可标当前所属 Collection（collection_name），表示语境
        */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {seriesList.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                该 Collection 下暂无 Series，请在 Strapi 中为 Series 关联此 Collection。
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {seriesList.map((seriesItem) => {
                  const seriesCardCoverUrl = getStrapiMedia(
                    seriesItem.cover_image?.url
                  );
                  return (
                    <Link
                      key={seriesItem.id}
                      href={`/products/${collection.slug}/${seriesItem.slug}`}
                      className="group block bg-card overflow-hidden rounded-lg border border-border"
                    >
                      <div className="relative aspect-[4/3] bg-muted">
                        <Image
                          src={seriesCardCoverUrl || "/placeholder.svg"}
                          alt={seriesItem.seriesName}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          {collection.collection_name}
                        </p>
                        <h2 className="text-base font-semibold mb-2">
                         Series - {seriesItem.seriesName}
                        </h2>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {seriesItem.short_description ?? ""}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

