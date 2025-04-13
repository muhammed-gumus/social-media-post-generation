import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full py-8 border-t mt-auto bg-background/50">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="relative w-6 h-6">
                <Image
                  src="/file.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg">Sosyal Medya İçerik Üretici</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Yapay zeka destekli araçlarımız ile sosyal medya için etkileyici
              içerikler oluşturun ve dijital varlığınızı güçlendirin.
            </p>

            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Teknoloji</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  <span>Google Imagen 3</span>
                </div>
                <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  <span>Gemini 2.0 Flash</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-3 text-sm">Hızlı Erişim</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wizard"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Adım Adım Sihirbaz
                  </Link>
                </li>
                <li>
                  <Link
                    href="/result"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Son İçerikler
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-sm">Platformlar</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground text-sm">
                    Instagram
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">Twitter</span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">
                    LinkedIn
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">
                    Facebook
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} İçerik Üretici | Tüm hakları
              saklıdır
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/wizard"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Şimdi Başla
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
