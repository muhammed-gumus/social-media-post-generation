"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Zap,
  LayoutTemplate,
  Twitter,
  ArrowRight,
  LogIn,
} from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header
        className={`w-full py-2 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#ffde59] border-b-4 border-black" : "bg-gray-50"
        }`}
      >
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-5xl text-black socreate-logo">socreate</span>
          </Link>

          {/* Right Side: Navigation + CTA Button */}
          <div className="hidden md:flex items-center gap-12">
            {/* Navigation Links */}
            <nav className="flex items-center gap-8">
              <Link
                href="/wizard"
                className="font-semibold text-base relative group transition-colors hover:text-black flex items-center"
              >
                <div className="w-6">
                  <Zap className="w-4 h-4 text-black hidden group-hover:inline-block" />
                </div>
                <span className="transition-transform group-hover:translate-x-2">
                  İçerik Oluştur
                </span>
              </Link>
              <Link
                href="/templates"
                className="font-semibold text-base relative group transition-colors hover:text-black flex items-center"
              >
                <div className="w-6">
                  <LayoutTemplate className="w-4 h-4 text-black hidden group-hover:inline-block" />
                </div>
                <span className="transition-transform group-hover:translate-x-2">
                  Hazır İçerikler
                </span>
              </Link>
              <Link
                href="/twitter-insights"
                className="font-semibold text-base relative group transition-colors hover:text-black flex items-center"
              >
                <div className="w-6">
                  <Twitter className="w-4 h-4 text-black hidden group-hover:inline-block" />
                </div>
                <span className="transition-transform group-hover:translate-x-2">
                  Twitter Analizi
                </span>
              </Link>
            </nav>

            {/* Auth Button - Direct link to login page */}
            <Link
              href="/auth/login"
              className="bg-white text-black font-bold text-base px-2 py-1 border-2 border-black flex items-center shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition-shadow"
            >
              <span>Giriş / Kayıt</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button - improved with accessibility */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 border-2 border-black bg-white shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] transition-shadow"
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
          className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] bg-[#ffde59] border-4 border-black"
        >
          <div className="w-full py-5 border-b-4 border-black flex items-center justify-between px-4 sm:px-6 max-w-6xl mx-auto">
            {/* Logo - Left Side */}
            <Link href="/" className="flex items-center gap-3">
              <span className="text-5xl text-black socreate-logo">
                socreate
              </span>
            </Link>

            {/* Close Button */}
            <button
              className="flex items-center justify-center w-12 h-12 border-2 border-black bg-white shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] transition-shadow"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Menüyü Kapat"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col p-8 h-[calc(100%-85px)] animate-in fade-in duration-200">
            <div className="space-y-8">
              <Link
                href="/wizard"
                className="block text-lg font-bold px-4 py-3 border-2 border-black bg-white shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>İçerik Oluştur</span>
                <Zap className="w-5 h-5" />
              </Link>

              <Link
                href="/templates"
                className="block text-lg font-bold px-4 py-3 border-2 border-black bg-white shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Hazır İçerikler</span>
                <LayoutTemplate className="w-5 h-5" />
              </Link>

              <Link
                href="/twitter-insights"
                className="block text-lg font-bold px-4 py-3 border-2 border-black bg-white shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Twitter Analizi</span>
                <Twitter className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-auto pt-10">
              <Link
                href="/auth/login"
                className="flex items-center justify-between px-4 bg-white text-black font-bold text-xl py-3 w-full border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Giriş / Kayıt</span>
                <LogIn className="w-5 h-5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
