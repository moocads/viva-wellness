"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  Rows3,
  Package,
  Images,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { listContent } from "@/lib/content-client";
import { LAVO_CONTENT_SLUGS } from "@/lib/lavo-slugs";

export function Dashboard() {
  const [counts, setCounts] = useState<{ collections: number; series: number; products: number }>({
    collections: 0,
    series: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [c, s, p] = await Promise.all([
        listContent(LAVO_CONTENT_SLUGS.collection),
        listContent(LAVO_CONTENT_SLUGS.series),
        listContent(LAVO_CONTENT_SLUGS.product),
      ]);
      setCounts({
        collections: c.length,
        series: s.length,
        products: p.length,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reach the API");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const cards = [
    {
      href: "/collections",
      title: "Collections",
      count: counts.collections,
      description: "col-collection",
      icon: Layers,
      color: "bg-blue-100 text-blue-700",
    },
    {
      href: "/series",
      title: "Series",
      count: counts.series,
      description: "col-series",
      icon: Rows3,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      href: "/products",
      title: "Products",
      count: counts.products,
      description: "product",
      icon: Package,
      color: "bg-violet-100 text-violet-700",
    },
  ];

  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600">
          Lavo Floor content synced with the MoocAds tenant API: collections, series, and products.
        </p>
      </div>

      {error ? (
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Connection failed</p>
            <p className="mt-1 text-sm">{error}</p>
            <p className="mt-2 text-sm text-amber-800/90">
              Create <code className="rounded bg-white/80 px-1">.env.local</code> in the project root
              and set <code className="rounded bg-white/80 px-1">MOOCADS_TENANT_TOKEN</code>. If the
              API enforces origin checks, also set{" "}
              <code className="rounded bg-white/80 px-1">MOOCADS_REQUEST_ORIGIN</code>.
            </p>
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading counts…
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={`rounded-lg p-3 ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{card.title}</h2>
                <p className="mt-1 text-sm text-gray-500">{card.description}</p>
                <p className="mt-4 text-3xl font-bold text-gray-900">{card.count}</p>
                <p className="text-xs text-gray-500">records</p>
              </Link>
            );
          })}
        </div>
      )}

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Quick links</h2>
        <Link
          href="/media"
          className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="rounded-lg bg-orange-100 p-3 text-orange-700">
            <Images className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Media library</p>
            <p className="text-sm text-gray-500">Upload images or files; use the returned path in content fields</p>
          </div>
          <ArrowRight className="ml-auto h-5 w-5 text-gray-400" />
        </Link>
      </section>
    </div>
  );
}
