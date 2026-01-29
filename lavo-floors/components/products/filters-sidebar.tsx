"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { filterOptions } from "@/lib/products";

interface FiltersSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: {
    colours: string[];
    collections: string[];
    sizes: string[];
    thicknesses: string[];
    lengths: string[];
    widths: string[];
  };
  toggleFilter: (category: keyof FiltersSidebarProps["selectedFilters"], value: string) => void;
}

interface FilterGroupProps {
  title: string;
  options: { value: string; count: number }[];
  selected: string[];
  onToggle: (value: string) => void;
  defaultOpen?: boolean;
}

function FilterGroup({ title, options, selected, onToggle, defaultOpen = true }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold uppercase tracking-wide"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground group-hover:text-muted-foreground flex-1">
                {option.value}
              </span>
              <span className="text-xs text-muted-foreground">({option.count})</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export function FiltersSidebar({
  searchQuery,
  setSearchQuery,
  selectedFilters,
  toggleFilter,
}: FiltersSidebarProps) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-24 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Enter a keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Filter Groups */}
        <div className="space-y-2">
          <FilterGroup
            title="Colour"
            options={filterOptions.colours}
            selected={selectedFilters.colours}
            onToggle={(value) => toggleFilter("colours", value)}
          />
          <FilterGroup
            title="Collections"
            options={filterOptions.collections}
            selected={selectedFilters.collections}
            onToggle={(value) => toggleFilter("collections", value)}
          />
          <FilterGroup
            title="Size"
            options={filterOptions.sizes}
            selected={selectedFilters.sizes}
            onToggle={(value) => toggleFilter("sizes", value)}
          />
          <FilterGroup
            title="Thickness"
            options={filterOptions.thicknesses}
            selected={selectedFilters.thicknesses}
            onToggle={(value) => toggleFilter("thicknesses", value)}
          />
          <FilterGroup
            title="Length"
            options={filterOptions.lengths}
            selected={selectedFilters.lengths}
            onToggle={(value) => toggleFilter("lengths", value)}
          />
          <FilterGroup
            title="Width"
            options={filterOptions.widths}
            selected={selectedFilters.widths}
            onToggle={(value) => toggleFilter("widths", value)}
            defaultOpen={false}
          />
        </div>
      </div>
    </aside>
  );
}
