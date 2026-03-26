"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export type NavbarCollectionItem = {
  slug: string;
  collection_name: string;
};

export function NavbarClient({
  collections,
}: {
  collections: NavbarCollectionItem[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  // 产品详情：/products/product/...（本地 JSON）或 /products/a/b/c（Strapi 三层路径）
  const isProductDetailPage = (() => {
    if (!pathname) return false;
    if (pathname.startsWith("/products/product/") && pathname !== "/products/product")
      return true;
    const parts = pathname.split("/").filter(Boolean);
    return parts[0] === "products" && parts.length === 4;
  })();

  useEffect(() => {
    const handleScroll = () => {
      if (isProductDetailPage) {
        setScrolled(true);
        return;
      }
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isProductDetailPage]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={scrolled ? "/lavo-logo-bk.png" : "/lavo-logo-white.png"}
              alt="Lavo Floors"
              width={200}
              height={100}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Products Dropdown (Collections) */}
            {collections.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <Link
                  href={
                    collections.length === 1
                      ? `/products/${collections[0].slug}`
                      : "/products"
                  }
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 flex items-center gap-1 ${
                    scrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  Products
                  {collections.length > 1 && <ChevronDown className="h-4 w-4" />}
                </Link>

                {productsDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50">
                    <div className="bg-white shadow-lg border border-border">
                      {collections.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/products/${c.slug}`}
                          className="block px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors"
                        >
                          {c.collection_name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Get Quote Button */}
          <div className="hidden md:block">
            <Link
              href="#"
              className={`px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                scrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-white text-foreground hover:bg-white/90"
              }`}
            >
              GET QUOTE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X
                className={`h-6 w-6 transition-colors duration-300 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 transition-colors duration-300 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm font-medium text-foreground hover:text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Products Menu */}
              {collections.length > 0 && (
                <div>
                  <Link
                    href={
                      collections.length === 1
                        ? `/products/${collections[0].slug}`
                        : "/products"
                    }
                    className="block text-sm font-medium text-foreground hover:text-muted-foreground mb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <div className="pl-4 space-y-2">
                    {collections.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/products/${c.slug}`}
                        className="block text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {c.collection_name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="#"
                className="block px-4 py-2 text-sm font-medium text-center bg-primary text-primary-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                GET QUOTE
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

