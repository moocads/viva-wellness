"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "#", label: "Resources" },
    { href: "#", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
         
              <Image src={scrolled ? "/lavo-logo-bk.png" : "/lavo-logo-white.png"} alt="Lavo Floors" width={200} height={100} />
           
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
