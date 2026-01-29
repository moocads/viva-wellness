"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { products } from "@/lib/products";
import { FiltersSidebar } from "./filters-sidebar";
import { ProductGrid } from "./product-grid";

type FilterCategory = "colours" | "collections" | "sizes" | "thicknesses" | "lengths" | "widths";

interface SelectedFilters {
  colours: string[];
  collections: string[];
  sizes: string[];
  thicknesses: string[];
  lengths: string[];
  widths: string[];
}

interface ProductsClientProps {
  series?: string;
}

export function ProductsClient({ series }: ProductsClientProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showInteriorPictures, setShowInteriorPictures] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    colours: [],
    collections: [],
    sizes: [],
    thicknesses: [],
    lengths: [],
    widths: [],
  });

  // Initialize filters from URL params
  useEffect(() => {
    const collection = searchParams.get("collection");
    if (collection) {
      setSelectedFilters((prev) => ({
        ...prev,
        collections: [collection],
      }));
    }
  }, [searchParams]);

  const toggleFilter = (category: FilterCategory, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const removeFilter = (category: FilterCategory, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      colours: [],
      collections: [],
      sizes: [],
      thicknesses: [],
      lengths: [],
      widths: [],
    });
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Series filter - if series prop is provided, filter by that series
    if (series) {
      filtered = filtered.filter((p) => p.collection === series);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.collection.toLowerCase().includes(query) ||
          p.colour.toLowerCase().includes(query)
      );
    }

    // Category filters
    if (selectedFilters.colours.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.colours.includes(p.colour));
    }
    if (selectedFilters.collections.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.collections.includes(p.collection));
    }
    if (selectedFilters.sizes.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.sizes.includes(p.size));
    }
    if (selectedFilters.thicknesses.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.thicknesses.includes(p.thickness));
    }
    if (selectedFilters.lengths.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.lengths.includes(p.length));
    }
    if (selectedFilters.widths.length > 0) {
      filtered = filtered.filter((p) => selectedFilters.widths.includes(p.width));
    }

    // Sorting
    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [series, searchQuery, selectedFilters, sortBy]);

  const activeFilterCount = Object.values(selectedFilters).flat().length;
  const allActiveFilters = Object.entries(selectedFilters).flatMap(([category, values]) =>
    values.map((value) => ({ category: category as FilterCategory, value }))
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <FiltersSidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
        hideCollections={!!series}
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} of {products.length} floors shown
          </p>

          <div className="flex items-center gap-4">
            {/* Interior Pictures Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showInteriorPictures}
                onChange={(e) => setShowInteriorPictures(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm">Show interior pictures</span>
            </label>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring bg-background"
              >
                <option value="latest">Choose sorting</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {allActiveFilters.map(({ category, value }) => (
              <button
                type="button"
                key={`${category}-${value}`}
                onClick={() => removeFilter(category, value)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-sm hover:bg-secondary/80 transition-colors"
              >
                {value}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
