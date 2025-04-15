import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Mail,
  ChevronRight,
  ArrowRight,
  Zap,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-8 sm:py-12 mt-auto bg-muted/20 border-t">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-8 sm:mb-12">
          {/* Branding and newsletter */}
          <div className="sm:col-span-2 md:col-span-5">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="relative w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center overflow-hidden group-hover:bg-primary/20 transition-colors">
                <Image
                  src="/file.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none">
                  İçerik Üretici
                </span>
                <span className="text-muted-foreground text-xs">
                  AI Destekli İçerikler
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Yapay zeka destekli araçlarımız ile sosyal medya için etkileyici
              içerikler oluşturun ve dijital varlığınızı güçlendirin.
            </p>

            <div className="bg-background rounded-xl p-4 sm:p-5 border shadow-sm">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Güncellemelerden Haberdar Ol
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="bg-muted/30 rounded-lg py-2 px-3 text-sm flex-1 border focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30"
                />
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-3 flex items-center justify-center transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 md:col-span-2">
            <h4 className="font-medium mb-4 text-sm tracking-wide uppercase text-muted-foreground">
              Hızlı Erişim
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-foreground/80 hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-primary/60 group-hover:translate-x-1 transition-transform"
                  />
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/wizard"
                  className="text-foreground/80 hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-primary/60 group-hover:translate-x-1 transition-transform"
                  />
                  Adım Adım Sihirbaz
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-foreground/80 hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-primary/60 group-hover:translate-x-1 transition-transform"
                  />
                  Hazır İçerikler
                </Link>
              </li>
              <li>
                <Link
                  href="/result"
                  className="text-foreground/80 hover:text-primary text-sm transition-colors flex items-center gap-1 group"
                >
                  <ChevronRight
                    size={14}
                    className="text-primary/60 group-hover:translate-x-1 transition-transform"
                  />
                  Son İçerikler
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="sm:col-span-1 md:col-span-2">
            <h4 className="font-medium mb-4 text-sm tracking-wide uppercase text-muted-foreground">
              Platformlar
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary text-sm transition-colors flex items-center gap-2"
                >
                  <Instagram size={14} className="text-pink-500" />
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary text-sm transition-colors flex items-center gap-2"
                >
                  <Twitter size={14} className="text-blue-500" />
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary text-sm transition-colors flex items-center gap-2"
                >
                  <Linkedin size={14} className="text-blue-700" />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-foreground/80 hover:text-primary text-sm transition-colors flex items-center gap-2"
                >
                  <Facebook size={14} className="text-blue-600" />
                  Facebook
                </Link>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div className="sm:col-span-2 md:col-span-3">
            <h4 className="font-medium mb-4 text-sm tracking-wide uppercase text-muted-foreground">
              Teknolojiler
            </h4>

            <div className="space-y-3">
              <div className="bg-background p-3 rounded-lg border flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap size={18} className="text-primary" />
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-0.5">
                    Google Gemini 2.0 Flash
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    SEO dostu, dönüşüm odaklı içerik üretimi
                  </p>
                </div>
              </div>

              <div className="bg-background p-3 rounded-lg border flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Image
                    src="/globe.svg"
                    alt="Imagen"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-0.5">
                    Google Imagen 3
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    Yüksek kaliteli görseller ve tasarımlar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-4 sm:pt-6 border-t flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} İçerik Üretici | Tüm hakları
              saklıdır
            </p>
            <div className="hidden md:flex w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
            <Link href="#" className="hover:text-primary transition-colors">
              Gizlilik Politikası
            </Link>
            <div className="hidden md:flex w-1 h-1 bg-muted-foreground/30 rounded-full"></div>
            <Link href="#" className="hover:text-primary transition-colors">
              Kullanım Şartları
            </Link>
          </div>

          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-background border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
            >
              <Instagram size={14} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-background border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
            >
              <Twitter size={14} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-background border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
            >
              <Linkedin size={14} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-background border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors"
            >
              <Facebook size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
