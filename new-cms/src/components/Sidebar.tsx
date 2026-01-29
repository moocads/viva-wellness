"use client";

import { 
  LayoutDashboard,
  BookOpen,
  Mail,
  Handshake,
  MapPin,
  Newspaper,
  Tag,
  FolderTree,
  Image as ImageIcon,
  Images,
  Ticket
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: BookOpen, label: "Blog", href: "/blog" },
  { icon: Mail, label: "contact form", href: "/contact-form" },
  { icon: Handshake, label: "deal", href: "/deal" },
  { icon: MapPin, label: "location", href: "/location" },
  { icon: Newspaper, label: "newsletter", href: "/newsletter" },
  { icon: Tag, label: "promotion", href: "/promotion" },
  { icon: FolderTree, label: "ServiceCategory", href: "/service-category" },
  { icon: ImageIcon, label: "slide", href: "/slide" },
  { icon: Images, label: "Media Library", href: "/media" },
  { icon: Ticket, label: "Ticket Center", href: "/submit-ticket" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-[#005daa] text-white flex flex-col z-50">
      {/* Logo Section */}
      <div className="p-6 border-b border-blue-700">
        <div className="mb-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
        <h1 className="text-[18px] font-bold">Axcellent Communication</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-purple-100 text-blue-600 font-medium"
                  : "text-gray-200 hover:bg-blue-700/50 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

