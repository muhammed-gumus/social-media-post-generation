import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent inline-block">
            Sosyal Medya İçerik Üretici
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-muted-foreground">
            Yapay zeka destekli araçlarımızla sosyal medya için etkileyici
            içerikler oluşturun. Platformunuzu seçin, hedef kitlenizi tanımlayın
            ve Google&apos;ın Imagen ve Gemini teknolojileriyle hazırlanan
            içeriklerinizi anında alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/wizard"
              className="rounded-full bg-primary text-primary-foreground px-8 py-4 font-medium text-lg hover:bg-primary/90 transition-colors flex items-center"
            >
              Adım Adım İlerle
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl border border-muted">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-600/30 mix-blend-overlay z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-full">
                {/* Mockup platfform örnekleri */}
                <div className="aspect-square bg-white/90 rounded-lg shadow-lg p-2 transform hover:scale-105 transition-transform">
                  <div className="h-full border rounded flex items-center justify-center">
                    <span className="font-medium text-sm">Instagram</span>
                  </div>
                </div>
                <div className="aspect-square bg-white/90 rounded-lg shadow-lg p-2 transform hover:scale-105 transition-transform">
                  <div className="h-full border rounded flex items-center justify-center">
                    <span className="font-medium text-sm">Twitter</span>
                  </div>
                </div>
                <div className="aspect-square bg-white/90 rounded-lg shadow-lg p-2 transform hover:scale-105 transition-transform">
                  <div className="h-full border rounded flex items-center justify-center">
                    <span className="font-medium text-sm">LinkedIn</span>
                  </div>
                </div>
                <div className="aspect-square bg-white/90 rounded-lg shadow-lg p-2 transform hover:scale-105 transition-transform">
                  <div className="h-full border rounded flex items-center justify-center">
                    <span className="font-medium text-sm">Facebook</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Neler Yapabilirsiniz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="mb-4 p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                <Image src="/file.svg" alt="İçerik" width={24} height={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Çoklu Platform Desteği</h3>
              <p className="text-muted-foreground">
                Instagram, Twitter, LinkedIn ve Facebook gibi farklı sosyal
                medya platformları için özelleştirilmiş içerikler oluşturun.
              </p>
            </div>

            <div className="bg-background border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="mb-4 p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                <Image src="/globe.svg" alt="Görsel" width={24} height={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Destekli Görseller</h3>
              <p className="text-muted-foreground">
                Google Imagen teknolojisi ile içeriğinize uygun profesyonel
                görseller oluşturun ve sosyal medya içeriklerinizi
                zenginleştirin.
              </p>
            </div>

            <div className="bg-background border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="mb-4 p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                <Image src="/window.svg" alt="Analiz" width={24} height={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Akıllı İçerik Üretimi</h3>
              <p className="text-muted-foreground">
                Google Gemini AI ile hedef kitlenize uygun, etkileşim oranı
                yüksek ve SEO dostu içerikler oluşturun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Nasıl Çalışır?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">
                Hedef Kitlenizi Belirleyin
              </h3>
              <p className="text-muted-foreground">
                Sektörünüzü, hedef kitlenizi ve içeriğinizin amacını
                belirleyerek süreci başlatın.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">İçerik Tipini Seçin</h3>
              <p className="text-muted-foreground">
                İhtiyacınız olan içerik tipini ve paylaşacağınız platformu
                belirleyin.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">İçeriğinizi Alın</h3>
              <p className="text-muted-foreground">
                AI tarafından oluşturulan içeriğiniz ve görseliniz hazır.
                İsterseniz düzenleyebilir veya hemen kullanabilirsiniz.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/wizard"
              className="rounded-full bg-foreground text-background px-6 py-3 font-medium hover:bg-foreground/90 transition-colors"
            >
              Şimdi Başlayın
            </Link>
          </div>
        </div>
      </section>

      {/* Options Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            İçerik Üretim Seçenekleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-xl p-6 bg-background hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                </svg>
                Adım Adım İlerle
              </h3>
              <p className="mb-6 text-muted-foreground">
                Sizi yönlendiren bir sihirbaz ile hedef kitlenizi, içerik
                türünüzü ve platformunuzu seçerek ihtiyacınıza tam olarak uygun
                içerikler oluşturun.
              </p>
              <Link
                href="/wizard"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Sihirbazı Başlat <span className="ml-1">→</span>
              </Link>
            </div>

            <div className="border rounded-xl p-6 bg-background hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary/10 text-primary text-xs px-2 py-1 rounded-bl-lg">
                Yakında
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 3v12"></path>
                  <path d="m8 11 4 4 4-4"></path>
                  <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"></path>
                </svg>
                Hazır İçerikler
              </h3>
              <p className="mb-6 text-muted-foreground">
                Sektörünüze ve platformunuza özel hazırlanmış içerik şablonları
                ile hızlıca içerik oluşturabilirsiniz.
              </p>
              <span className="text-muted-foreground text-sm italic">
                Bu özellik yakında hizmetinizde olacak
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-8">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full">
              <Image src="/file.svg" alt="Logo" width={16} height={16} />
              <p className="text-sm text-muted-foreground">
                Google Imagen 3 teknolojisiyle desteklenmektedir
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full">
              <Image src="/globe.svg" alt="Logo" width={16} height={16} />
              <p className="text-sm text-muted-foreground">
                Gemini 2.0 Flash teknolojisiyle desteklenmektedir
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
