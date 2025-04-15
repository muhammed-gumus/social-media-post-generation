import Link from "next/link";
import { LayoutTemplate } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Modern tasarım ile yenilendi */}
      <section className="py-12 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/5 z-0" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 -mr-20 -mt-20" />
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl opacity-30 -ml-10 -mb-10" />

        <div className="container max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <span className="px-3 sm:px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-xs sm:text-sm inline-flex items-center gap-1.5 sm:gap-2">
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
                className="hidden sm:inline"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
              Yapay Zeka Destekli İçerik Üretimi
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent inline-block">
            Sosyal Medya İçerik Üretici
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Yapay zeka destekli araçlarımızla sosyal medya için etkileyici
            içerikler oluşturun. Platformunuzu seçin, hedef kitlenizi tanımlayın
            ve Google&apos;ın{" "}
            <span className="text-primary font-medium">Imagen</span> ve{" "}
            <span className="text-primary font-medium">Gemini</span>{" "}
            teknolojileriyle hazırlanan içeriklerinizi anında alın.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/wizard"
              className="rounded-full bg-primary text-primary-foreground px-8 py-4 font-medium text-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 hover:scale-105 flex items-center"
            >
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
                className="mr-2"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg>
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

            <Link
              href="/templates"
              className="rounded-full border border-primary/30 bg-transparent text-foreground px-8 py-4 font-medium text-lg hover:bg-primary/10 transition-all flex items-center"
            >
              <LayoutTemplate className="mr-2" />
              Hazır Şablonlar
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="flex items-center -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-background"></div>
              <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-background"></div>
              <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-background"></div>
              <div className="w-8 h-8 rounded-full bg-red-400 border-2 border-background"></div>
            </div>
            <span className="text-sm text-muted-foreground">
              1000+ memnun kullanıcı
            </span>
          </div>
        </div>
      </section>

      {/* Hero Image Section - Modernize edildi ve gerçek mockup'lar eklendi */}
      <section className="py-10 px-4 sm:p-12 md:p-28 relative">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-muted bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-8">
              <div className="flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  Tüm platformlara uygun içerikler
                </h3>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Hedef kitlenize uygun, her platforma özel optimum boyut ve
                  formatta içerikler üretin. İster hızlı şablonlar, ister adım
                  adım sihirbaz ile profesyonel içerikler oluşturun.
                </p>

                <div className="flex items-center space-x-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
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
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Yapay zeka destekli</p>
                    <p className="text-sm text-muted-foreground">
                      Modern AI teknolojileri
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center space-x-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">SEO dostu içerikler</p>
                    <p className="text-sm text-muted-foreground">
                      Etkileşim oranı yüksek
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4">
                {/* Gerçekçi sosyal medya mockup'ları */}
                <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-3 transform hover:scale-105 transition-all overflow-hidden relative group">
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium text-sm bg-black/60 px-2 py-1 rounded">
                      Instagram
                    </span>
                  </div>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-white"></div>
                      <span className="text-xs text-white font-medium">
                        markablog
                      </span>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-pink-200 to-purple-300 rounded-md"></div>
                    <div className="flex justify-between mt-2">
                      <div className="flex gap-2">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-3 transform hover:scale-105 transition-all overflow-hidden relative group">
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium text-sm bg-black/60 px-2 py-1 rounded">
                      Twitter
                    </span>
                  </div>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-white"></div>
                      <span className="text-xs text-white font-medium">
                        @markablog
                      </span>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md p-1">
                      <div className="w-full h-1 bg-white/30 rounded mb-1"></div>
                      <div className="w-2/3 h-1 bg-white/30 rounded"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="flex gap-2">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="aspect-square bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl shadow-lg p-3 transform hover:scale-105 transition-all overflow-hidden relative group">
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium text-sm bg-black/60 px-2 py-1 rounded">
                      LinkedIn
                    </span>
                  </div>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-white"></div>
                      <span className="text-xs text-white font-medium">
                        Marka Blog
                      </span>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-blue-200 to-blue-300 rounded-md"></div>
                    <div className="flex justify-between mt-2">
                      <div className="flex gap-2">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-800 rounded-xl shadow-lg p-3 transform hover:scale-105 transition-all overflow-hidden relative group">
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium text-sm bg-black/60 px-2 py-1 rounded">
                      Facebook
                    </span>
                  </div>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-white"></div>
                      <span className="text-xs text-white font-medium">
                        Marka Blog
                      </span>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md"></div>
                    <div className="flex justify-between mt-2">
                      <div className="flex gap-2">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern ikonlarla zenginleştirildi */}
      <section className="py-20 bg-muted/20">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Özellikler
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Neler Yapabilirsiniz?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Platforma özel içerik üretiminden SEO optimizasyonuna kadar
              ihtiyacınız olan her şey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background border rounded-xl p-8 shadow hover:shadow-md transition-all hover:shadow-primary/5 hover:border-primary/20 group">
              <div className="mb-6 p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Çoklu Platform Desteği</h3>
              <p className="text-muted-foreground mb-4">
                Instagram, Twitter, LinkedIn ve Facebook gibi farklı sosyal
                medya platformları için özelleştirilmiş içerikler oluşturun.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Platform özelinde boyutlandırma
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Platforma özel format optimizasyonu
                </li>
              </ul>
            </div>

            <div className="bg-background border rounded-xl p-8 shadow hover:shadow-md transition-all hover:shadow-primary/5 hover:border-primary/20 group">
              <div className="mb-6 p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                  <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                  <line x1="8" x2="16" y1="12" y2="12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Destekli Görseller</h3>
              <p className="text-muted-foreground mb-4">
                Google Imagen teknolojisi ile içeriğinize uygun profesyonel
                görseller oluşturun ve sosyal medya içeriklerinizi
                zenginleştirin.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Yüksek kaliteli görseller
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  İçerik odaklı görsel üretimi
                </li>
              </ul>
            </div>

            <div className="bg-background border rounded-xl p-8 shadow hover:shadow-md transition-all hover:shadow-primary/5 hover:border-primary/20 group">
              <div className="mb-6 p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M9 13v-1h6v1" />
                  <path d="M11 18.5a1.5 1.5 0 1 0 2 0v-5a1.5 1.5 0 1 0-2 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Akıllı İçerik Üretimi</h3>
              <p className="text-muted-foreground mb-4">
                Google Gemini AI ile hedef kitlenize uygun, etkileşim oranı
                yüksek ve SEO dostu içerikler oluşturun.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  SEO dostu içerik oluşturma
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Kitlenize özel içerik stratejisi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Görseller zenginleştirildi ve daha açıklayıcı hale getirildi */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Hızlı ve Kolay
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Nasıl Çalışır?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              İçerik üretim süreciniz sadece birkaç adımda tamamlanır
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-lg shadow-primary/10">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">
                Hedef Kitlenizi Belirleyin
              </h3>
              <p className="text-muted-foreground mb-4">
                Sektörünüzü, hedef kitlenizi ve içeriğinizin amacını
                belirleyerek süreci başlatın.
              </p>
              <div className="border border-dashed border-muted-foreground/30 p-4 rounded-xl w-full max-w-[200px] bg-background">
                <div className="flex justify-between items-center mb-3">
                  <div className="w-24 h-2 bg-primary/30 rounded"></div>
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-2 bg-muted rounded"></div>
                  <div className="w-5/6 h-2 bg-muted rounded"></div>
                  <div className="w-4/6 h-2 bg-muted rounded"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-lg shadow-primary/10">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">İçerik Tipini Seçin</h3>
              <p className="text-muted-foreground mb-4">
                İhtiyacınız olan içerik tipini ve paylaşacağınız platformu
                belirleyin.
              </p>
              <div className="border border-dashed border-muted-foreground/30 p-4 rounded-xl w-full max-w-[200px] bg-background">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 rounded bg-primary/10 text-xs font-medium text-center">
                    Instagram
                  </div>
                  <div className="p-2 rounded bg-muted text-xs font-medium text-center">
                    Twitter
                  </div>
                  <div className="p-2 rounded bg-muted text-xs font-medium text-center">
                    LinkedIn
                  </div>
                  <div className="p-2 rounded bg-muted text-xs font-medium text-center">
                    Facebook
                  </div>
                </div>
                <div className="w-full h-0.5 bg-muted mb-3"></div>
                <div className="w-full h-2 bg-primary/20 rounded"></div>
              </div>
            </div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-6 shadow-lg shadow-primary/10">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">İçeriğinizi Alın</h3>
              <p className="text-muted-foreground mb-4">
                AI tarafından oluşturulan içeriğiniz ve görseliniz hazır.
                İsterseniz düzenleyebilir veya hemen kullanabilirsiniz.
              </p>
              <div className="border border-dashed border-muted-foreground/30 p-4 rounded-xl w-full max-w-[200px] bg-background">
                <div className="w-full aspect-square rounded bg-gradient-to-br from-primary/10 to-blue-400/10 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-2 bg-muted rounded"></div>
                  <div className="w-5/6 h-2 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/wizard"
              className="rounded-full bg-foreground text-background px-8 py-4 font-medium text-lg hover:bg-foreground/90 transition-all flex items-center gap-2 mx-auto w-fit"
            >
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
                className="text-background"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Şimdi Başlayın
            </Link>
          </div>
        </div>
      </section>

      {/* Options Section - Detaylı tanıtımlarla zenginleştirildi */}
      <section className="py-20 bg-muted/20">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Seçenekler
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              İçerik Üretim Seçenekleri
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Sizin için en uygun yöntemi seçerek içerik üretimine başlayın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Adım Adım Sihirbaz - Detaylı tanıtım */}
            <div className="border rounded-2xl p-8 bg-background hover:shadow-lg transition-all group">
              <div className="bg-gradient-to-br from-primary/10 to-blue-400/5 p-6 rounded-xl mb-6 group-hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
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
                  </div>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    Kişiselleştirilmiş
                  </span>
                </div>

                <h3 className="text-2xl font-bold mt-6 mb-2 flex items-center gap-2">
                  Adım Adım Sihirbaz
                </h3>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                      1
                    </div>
                    <div className="text-sm">Hedef kitle ve sektör seçimi</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                      2
                    </div>
                    <div className="text-sm">
                      Platform ve içerik türü belirleme
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                      3
                    </div>
                    <div className="text-sm">Ton ve detay ayarlama</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                      4
                    </div>
                    <div className="text-sm">
                      Kişiselleştirilmiş içerik oluşturma
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-6 text-muted-foreground">
                Sizi yönlendiren bir sihirbaz ile hedef kitlenizi, içerik
                türünüzü ve platformunuzu seçerek ihtiyacınıza tam olarak uygun
                içerikler oluşturun. Her adımı özelleştirerek markanıza özel
                içerikler elde edin.
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                    10+ adım seçeneği
                  </span>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded ml-2">
                    Tam özelleştirme
                  </span>
                </div>
                <Link
                  href="/wizard"
                  className="inline-flex items-center text-primary font-medium hover:underline group-hover:text-primary/80"
                >
                  Sihirbazı Başlat{" "}
                  <span className="ml-1 group-hover:ml-2 transition-all">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Hazır İçerikler - Detaylı tanıtım */}
            <div className="border rounded-2xl p-8 bg-background hover:shadow-lg transition-all group">
              <div className="bg-gradient-to-br from-blue-400/10 to-primary/5 p-6 rounded-xl mb-6 group-hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center">
                    <LayoutTemplate className="text-blue-500" size={28} />
                  </div>
                  <span className="text-xs font-medium bg-blue-400/10 text-blue-500 px-3 py-1 rounded-full">
                    Hızlı Çözüm
                  </span>
                </div>

                <h3 className="text-2xl font-bold mt-6 mb-2 flex items-center gap-2">
                  Hazır İçerik Şablonları
                </h3>

                <div className="grid grid-cols-3 gap-2 mt-6">
                  <div className="border border-dashed p-1 rounded bg-white/80 text-xs text-center">
                    Finans
                  </div>
                  <div className="border border-dashed p-1 rounded bg-white/80 text-xs text-center">
                    E-ticaret
                  </div>
                  <div className="border border-dashed p-1 rounded bg-white/80 text-xs text-center">
                    Emlak
                  </div>
                  <div className="border border-dashed p-1 rounded bg-white/80 text-xs text-center">
                    Teknoloji
                  </div>
                  <div className="border border-dashed p-1 rounded bg-white/80 text-xs text-center">
                    Sağlık
                  </div>
                  <div className="border border-dashed p-1 rounded bg-white/80 text-xs text-center">
                    Turizm
                  </div>
                </div>
              </div>

              <p className="mb-6 text-muted-foreground">
                Sektörünüze ve platformunuza özel hazırlanmış içerik şablonları
                ile hızlıca içerik oluşturabilirsiniz. Profesyoneller tarafından
                tasarlanmış, etkileşim oranı yüksek şablonlarla zaman kazanın.
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                    30+ şablon
                  </span>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded ml-2">
                    12 kategori
                  </span>
                </div>
                <Link
                  href="/templates"
                  className="inline-flex items-center text-blue-500 font-medium hover:underline group-hover:text-blue-500/80"
                >
                  Şablonları Görüntüle{" "}
                  <span className="ml-1 group-hover:ml-2 transition-all">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h4 className="text-sm text-muted-foreground font-medium mb-4">
            GÜÇLÜ TEKNOLOJİLER
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-4">
            <div className="flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full">
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
                <path d="m21.21 15.89-8.49-8.49-8.49 8.49" />
                <path d="m7.88 3.4 8.51 8.49M16.39 3.4H7.88v8.51" />
              </svg>
              <p className="text-sm font-medium">
                Google Imagen 3 teknolojisiyle desteklenmektedir
              </p>
            </div>
            <div className="flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full">
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
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <p className="text-sm font-medium">
                Gemini 2.0 Flash teknolojisiyle desteklenmektedir
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Tüm veriler güvenle korunur ve KVKK ile uyumludur.
          </p>
        </div>
      </section>
    </div>
  );
}
