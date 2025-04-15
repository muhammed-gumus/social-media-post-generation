"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Zap,
  LayoutTemplate,
  Twitter,
} from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header className="w-full py-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-primary/20 transition-colors">
              <Image
                src="/file.svg"
                alt="Logo"
                width={24}
                height={24}
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">
                İçerik Üretici
              </span>
              <span className="text-muted-foreground text-xs">
                AI Destekli İçerikler
              </span>
            </div>
          </Link>

          {/* Right Side: Navigation + CTA Button */}
          <div className="hidden md:flex items-center gap-6">
            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              <Link
                href="/wizard"
                className="text-foreground/80 hover:text-primary transition-colors relative group py-1 flex items-center gap-1"
              >
                <span>İçerik Oluştur</span>
                <Zap className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/templates"
                className="text-foreground/80 hover:text-primary transition-colors relative group py-1 flex items-center gap-1"
              >
                <span>Hazır İçerikler</span>
                <LayoutTemplate className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/twitter-insights"
                className="text-foreground/80 hover:text-primary transition-colors relative group py-1 flex items-center gap-1"
              >
                <span>Twitter(X) Analizi</span>
                <Twitter className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Call to Action Button */}
            <Link
              href="/wizard"
              className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-1 hover:shadow-md hover:shadow-primary/20 hover:translate-y-[-1px]"
            >
              <span>Başla</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button - improved with accessibility */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-foreground hover:bg-muted rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü Aç/Kapat"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Fixed for full-screen display */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] bg-background/95 backdrop-blur-md"
        >
          <div className="w-full py-4 border-b flex items-center justify-between px-4 sm:px-6 max-w-6xl mx-auto">
            {/* Logo - Left Side */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-primary/20 transition-colors">
                <Image
                  src="/file.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">
                  İçerik Üretici
                </span>
                <span className="text-muted-foreground text-xs">
                  AI Destekli İçerikler
                </span>
              </div>
            </Link>

            {/* Close Button */}
            <button
              className="flex items-center justify-center w-10 h-10 text-foreground hover:bg-muted rounded-full transition-colors"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Menüyü Kapat"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col p-6 h-[calc(100%-73px)] animate-in fade-in duration-200">
            <div className="space-y-2">
              <Link
                href="/wizard"
                className="text-lg font-medium text-foreground transition-all px-4 py-3.5 hover:bg-muted/50 active:bg-muted/60 rounded-xl flex items-center justify-between group"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Zap size={16} />
                  </div>
                  <span>Adım Adım Sihirbaz</span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                />
              </Link>
              <Link
                href="/templates"
                className="text-lg font-medium text-foreground transition-all px-4 py-3.5 hover:bg-muted/50 active:bg-muted/60 rounded-xl flex items-center justify-between group"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <LayoutTemplate size={16} />
                  </div>
                  <span>Hazır İçerikler</span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                />
              </Link>
              <Link
                href="/twitter-insights"
                className="text-lg font-medium text-foreground transition-all px-4 py-3.5 hover:bg-muted/50 active:bg-muted/60 rounded-xl flex items-center justify-between group"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Twitter size={16} />
                  </div>
                  <span>Twitter(X) Analizi</span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            </div>

            <div className="mt-auto pt-6 border-t border-muted/50">
              <Link
                href="/wizard"
                className="rounded-xl bg-primary text-primary-foreground py-4 text-base font-medium hover:bg-primary/90 active:bg-primary/80 transition-all flex items-center justify-center gap-2 w-full shadow-sm hover:translate-y-[-1px]"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Hemen Başla</span>
                <ChevronRight size={18} />
              </Link>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 py-3 w-full text-center text-muted-foreground hover:text-foreground transition-colors rounded-xl flex items-center justify-center gap-1.5 hover:bg-muted/30"
              >
                <X size={16} />
                <span>Kapat</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
