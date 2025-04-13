import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="w-full py-4 border-b bg-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image src="/file.svg" alt="Logo" fill className="object-contain" />
          </div>
          <span className="font-bold text-xl">İçerik Üretici</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/wizard"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Adım Adım Sihirbaz
          </Link>
        </nav>

        <Link
          href="/wizard"
          className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
        >
          <span>Başla</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </header>
  );
}
