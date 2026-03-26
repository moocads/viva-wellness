"use client";

import {
  LayoutDashboard,
  Layers,
  Rows3,
  Package,
  Images,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: Layers, label: "Collections", href: "/collections" },
  { icon: Rows3, label: "Series", href: "/series" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: Images, label: "Media", href: "/media" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#005daa] text-white">
      <div className="border-b border-blue-700 p-6">
        <div className="mb-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
        <h1 className="text-[18px] font-bold">Lavo Floor</h1>
        <p className="mt-1 text-xs text-blue-200">Content</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors",
                isActive
                  ? "bg-purple-100 font-medium text-blue-600"
                  : "text-gray-200 hover:bg-blue-700/50 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
