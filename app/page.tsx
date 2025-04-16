import Link from "next/link";
import {
  LayoutTemplate,
  WandSparkles,
  CheckCircle,
  Zap,
  ArrowRight,
  ImageIcon,
  FileText,
  Users,
  Layers,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="py-24 md:py-32 relative bg-gray-50 border-b-[8px] border-black ">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-full max-w-md relative hidden md:block">
                {/* Circle bottom left */}
                <div className="absolute -bottom-3 -left-2 w-5 h-5 rounded-full bg-white border-2 border-black z-10"></div>
              </div>
              <span className="mb-6 px-3 py-1 border-2 border-black bg-[#ffde59] text-black font-bold text-sm inline-flex items-center">
                YAPAY ZEKA DESTEKLİ İÇERİK ÜRETİMİ
              </span>

              <h1 className="text-5xl md:text-6xl font-black mb-6 text-black leading-[1.1] tracking-tight">
                Sosyal medya içerik üretimini{" "}
                <span className="bg-black text-white px-2">
                  otomatikleştirin
                </span>
              </h1>

              <p className="text-xl mb-8 font-medium text-gray-800">
                Yapay zeka destekli araçlarımızla sosyal medya platformları için
                profesyonel ve etkileyici içerikler oluşturun.
              </p>

              <div className="flex flex-col gap-4 w-full md:w-auto">
                <Link
                  href="/wizard"
                  className="px-6 py-3 bg-[#ffde59] text-black font-bold hover:translate-y-[-4px] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                >
                  <WandSparkles size={20} className="mr-2" />
                  Adım Adım İlerle
                </Link>

                <Link
                  href="/templates"
                  className="px-6 py-3 bg-white text-black font-bold hover:translate-y-[-4px] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                >
                  <LayoutTemplate size={20} className="mr-2" />
                  Hazır Şablonlar
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md relative">
                {/* Circle bottom left */}
                <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-white border-2 border-black z-10"></div>

                {/* Image with neubrutalist styling */}
                <div className="relative border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <Image
                    src="/banner-img.png"
                    alt="Hero Image"
                    width={800}
                    height={600}
                    className="w-full h-auto border-2 border-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Neler <span className="bg-[#ffde59] px-2">yapabilirsiniz?</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Platformunuza özel içerik üretiminden SEO optimizasyonuna kadar
              ihtiyacınız olan her şey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
                <Layers size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">Çoklu Platform Desteği</h3>
              <p className="text-gray-700 mb-4">
                Instagram, Twitter, LinkedIn ve Facebook gibi farklı sosyal
                medya platformları için özelleştirilmiş içerikler.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-black" />
                  Platform özelinde boyutlandırma
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-black" />
                  Platforma özel format optimizasyonu
                </li>
              </ul>
            </div>

            <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
                <ImageIcon size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Destekli Görseller</h3>
              <p className="text-gray-700 mb-4">
                İçeriğinize uygun profesyonel görseller oluşturun ve sosyal
                medya içeriklerinizi zenginleştirin.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-black" />
                  Yüksek kaliteli görseller
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-black" />
                  İçerik odaklı görsel üretimi
                </li>
              </ul>
            </div>

            <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
                <FileText size={24} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">Akıllı İçerik Üretimi</h3>
              <p className="text-gray-700 mb-4">
                Hedef kitlenize uygun, etkileşim oranı yüksek ve SEO dostu
                içerikler oluşturun.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-black" />
                  SEO dostu içerik oluşturma
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-black" />
                  Kitlenize özel içerik stratejisi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Examples Section */}
      <section className="py-20 bg-gray-50 border-y-[8px] border-black">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                <span className="bg-[#ffde59] px-2">Tüm platformlara</span>{" "}
                uygun içerikler
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Hedef kitlenize uygun, her platforma özel optimum boyut ve
                formatta içerikler üretin. İster hızlı şablonlar, ister adım
                adım sihirbaz ile profesyonel içerikler oluşturun.
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold">Yapay zeka destekli</p>
                  <p className="text-sm text-gray-600">
                    Modern AI teknolojileri
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold">SEO dostu içerikler</p>
                  <p className="text-sm text-gray-600">
                    Etkileşim oranı yüksek
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-[#E1306C] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold">
                  INSTAGRAM
                </div>
                <div className="h-full flex flex-col">
                  <div className="border-2 border-black bg-white flex flex-1 items-center justify-center ">
                    <InstagramIcon className="h-10 w-10" />
                  </div>
                </div>
              </div>

              <div className="aspect-square bg-[#14171A] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold">
                  X
                </div>
                <div className="h-full flex flex-col">
                  <div className="border-2 border-black bg-white flex flex-1 items-center justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="40"
                      height="40"
                      viewBox="0 0 30 30"
                    >
                      <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="aspect-square bg-[#0077B5] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold">
                  LINKEDIN
                </div>
                <div className="h-full flex flex-col">
                  <div className="border-2 border-black bg-white flex flex-1 items-center justify-center ">
                    <LinkedinIcon className="h-10 w-10" />
                  </div>
                </div>
              </div>

              <div className="aspect-square bg-[#4267B2] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold">
                  FACEBOOK
                </div>
                <div className="h-full flex flex-col">
                  <div className="border-2 border-black bg-white flex flex-1 items-center justify-center ">
                    <FacebookIcon className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Nasıl <span className="bg-[#ffde59] px-2">çalışır?</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              İçerik üretim süreciniz sadece birkaç adımda tamamlanır
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 border-2 border-black bg-black text-white flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">
                Hedef Kitlenizi Belirleyin
              </h3>
              <p className="text-gray-700">
                Markanıza, sektörünüze ve hedeflerinize uygun içerikler için ilk
                adım doğru kitleyi tanımlamaktır.
              </p>
              <div className="mt-4 p-4 border-2 border-black bg-gray-50 w-full">
                <div className="h-32 flex flex-col items-center justify-center">
                  <Users size={32} className="text-gray-700 mb-3" />
                  <div className="bg-[#ffde59] border-2 border-black text-xs font-bold text-center py-1 px-2">
                    HEDEF KİTLE ANALİZİ
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="w-12 h-12 border-2 border-black bg-black text-white flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">İçerik Tipini Seçin</h3>
              <p className="text-gray-700">
                Her platforma özel optimum format ve boyutta içerikler için
                doğru içerik tipini belirleyin.
              </p>
              <div className="mt-4 p-4 border-2 border-black bg-gray-50 w-full">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-[#ffde59] border-2 border-black text-xs font-bold text-center">
                    INSTAGRAM
                  </div>
                  <div className="p-2 bg-white border-2 border-black text-xs font-bold text-center">
                    TWITTER
                  </div>
                  <div className="p-2 bg-white border-2 border-black text-xs font-bold text-center">
                    LINKEDIN
                  </div>
                  <div className="p-2 bg-white border-2 border-black text-xs font-bold text-center">
                    FACEBOOK
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="w-12 h-12 border-2 border-black bg-black text-white flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">İçeriğinizi Alın</h3>
              <p className="text-gray-700">
                Yapay zeka tarafından oluşturulan etkileşimi yüksek içerik ve
                profesyonel görselinizi hemen kullanmaya başlayın.
              </p>
              <div className="mt-4 p-4 border-2 border-black bg-gray-50 w-full">
                <div className="h-32 flex flex-col items-center justify-center">
                  <FileText size={32} className="text-gray-700 mb-2" />
                  <div className="w-full h-3 bg-black mb-2"></div>
                  <div className="w-3/4 h-2 bg-gray-700"></div>
                  <div className="w-1/2 h-2 bg-gray-700 mt-1"></div>
                  <div className="mt-2 border-2 border-black bg-[#ffde59] px-2 py-1 text-xs font-bold">
                    HAZIR İÇERİK
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/wizard"
              className="px-6 py-3 bg-[#ffde59] text-black font-bold hover:translate-y-[-4px] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-flex items-center"
            >
              <WandSparkles size={20} className="mr-2" />
              Şimdi Başlayın
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Options Section */}
      <section className="py-20 bg-gray-50 border-t-[8px] border-black">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              İçerik Üretim{" "}
              <span className="bg-[#ffde59] px-2">Seçenekleri</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Sizin için en uygun yöntemi seçerek içerik üretimine başlayın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Adım Adım Sihirbaz */}
            <div className="border-2 border-black bg-white p-6 hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-6">
                <div className="w-16 h-16 bg-black flex items-center justify-center">
                  <WandSparkles size={32} className="text-white" />
                </div>
                <span className="bg-[#ffde59] border-2 border-black px-3 py-1 text-sm font-bold">
                  KİŞİSELLEŞTİRİLMİŞ
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4">Adım Adım Sihirbaz</h3>

              <p className="text-gray-700 mb-6">
                Sizi yönlendiren bir sihirbaz ile hedef kitlenizi, içerik
                türünüzü ve platformunuzu seçerek ihtiyacınıza tam olarak uygun
                içerikler oluşturun.
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-bold bg-gray-100 border-2 border-black px-2 py-1">
                  10+ ADIM SEÇENEĞİ
                </span>
                <Link
                  href="/wizard"
                  className="inline-flex items-center font-bold hover:underline"
                >
                  Sihirbazı Başlat
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Hazır İçerikler */}
            <div className="border-2 border-black bg-white p-6 hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-6">
                <div className="w-16 h-16 bg-black flex items-center justify-center">
                  <LayoutTemplate size={32} className="text-white" />
                </div>
                <span className="bg-[#ffde59] border-2 border-black px-3 py-1 text-sm font-bold">
                  HIZLI ÇÖZÜM
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Hazır İçerik Şablonları
              </h3>

              <p className="text-gray-700 mb-6">
                Sektörünüze ve platformunuza özel hazırlanmış içerik şablonları
                ile hızlıca içerik oluşturabilirsiniz.
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-bold bg-gray-100 border-2 border-black px-2 py-1">
                  30+ ŞABLON
                </span>
                <Link
                  href="/templates"
                  className="inline-flex items-center font-bold hover:underline"
                >
                  Şablonları Görüntüle
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-16  border-t-[4px] border-black">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-bold text-gray-700 mb-6">
            KULLANDIĞIMIZ TEKNOLOJİLER
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <div className="px-6 py-3 bg-[#ffde59] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 font-bold">
              <ImageIcon size={20} className="text-black" />
              <span>Gelişmiş Görsel Oluşturma Teknolojisi</span>
            </div>
            <div className="px-6 py-3 bg-[#ffde59] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 font-bold">
              <FileText size={20} className="text-black" />
              <span>Üstün Yapay Zeka Metin Modeli</span>
            </div>
          </div>
          <p className="text-xs text-gray-700 mt-6 border-t-2 border-black pt-4">
            Tüm veriler güvenle korunur ve KVKK ile uyumludur.
          </p>
        </div>
      </section>
    </div>
  );
}
