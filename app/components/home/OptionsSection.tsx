import Link from "next/link";
import {
  ArrowRight,
  Star,
  BarChart3,
  Zap,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OptionsSection() {
  return (
    <section className="py-20 bg-gray-50 border-t-[8px] border-black">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Platform <span className="bg-[#ffde59] px-2">Değer Önerisi</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Binlerce içerik üreticisi neden yapay zeka destekli platformumuzu
            tercih ediyor?
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="border-2 border-black bg-white p-6 text-center hover:translate-y-[-4px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black text-4xl mb-2">87%</p>
            <p className="text-sm text-gray-700">Zamandan Tasarruf</p>
          </div>

          <div className="border-2 border-black bg-white p-6 text-center hover:translate-y-[-4px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black text-4xl mb-2">5,000+</p>
            <p className="text-sm text-gray-700">Oluşturulan İçerik</p>
          </div>

          <div className="border-2 border-black bg-white p-6 text-center hover:translate-y-[-4px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black text-4xl mb-2">
              4.8<span className="text-xl">/5</span>
            </p>
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="text-[#ffde59] fill-[#ffde59]"
                />
              ))}
            </div>
          </div>

          <div className="border-2 border-black bg-white p-6 text-center hover:translate-y-[-4px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black text-4xl mb-2">15+</p>
            <p className="text-sm text-gray-700">Desteklenen Sektör</p>
          </div>
        </div>

        {/* Çift Bölüm (Sol: Metin, Sağ: Görsel) */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">
              İçerik Üretiminde{" "}
              <span className="bg-[#ffde59] px-2">Verimlilik</span>
            </h3>

            <p className="text-gray-700 mb-6">
              Günümüzde sosyal medya yöneticileri, pazarlama uzmanları ve içerik
              üreticileri zamanlarının %60&#39;ından fazlasını sadece içerik
              oluşturmaya harcıyor. Platformumuz bu süreci otomatize ederek
              yaratıcı çalışmalara daha fazla zaman ayırmanızı sağlıyor.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#ffde59] border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={18} className="text-black" />
                </div>
                <div>
                  <p className="font-bold">Zaman Tasarrufu</p>
                  <p className="text-sm text-gray-700">
                    İçerik oluşturma sürecini dakikalara indirin
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#ffde59] border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BarChart3 size={18} className="text-black" />
                </div>
                <div>
                  <p className="font-bold">Etkileşim Artışı</p>
                  <p className="text-sm text-gray-700">
                    Hedef kitleye özel içeriklerle etkileşimi artırın
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#ffde59] border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp size={18} className="text-black" />
                </div>
                <div>
                  <p className="font-bold">Tutarlı Marka Sesi</p>
                  <p className="text-sm text-gray-700">
                    Tüm kanallarda tutarlı içerik ve marka kimliği
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="md:w-1/2 relative">
            <div className="border-2 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Image
                src="/promotion-landing.png"
                alt="Platform Demo"
                width={500}
                height={300}
                className="w-full h-auto border rounded-lg border-gray-200"
              />
              <div className="mt-2 flex justify-end items-center">
                <Link href="/wizard">
                  <Button variant="brutalistPrimary">
                    Hemen Deneyin <ArrowRight size={12} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Müşteri Hikayeleri */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">
              Başarı <span className="bg-[#ffde59] px-2">Hikayeleri</span>
            </h3>
            {/* <div className="hidden md:flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-gray-800"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Başarı hikayesi 1 */}
            <div className="border-2 border-black p-6 bg-white hover:translate-y-[-4px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#ffde59] border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-black" />
                </div>
                <div>
                  <p className="font-bold">Mavi Ajans</p>
                  <p className="text-xs text-gray-600">
                    Dijital Pazarlama Ajansı
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 flex-grow">
                &quot;Platform sayesinde içerik üretim süremizi %70 azalttık ve
                müşterilerimize daha hızlı içerik sunabiliyoruz. Yapay zeka
                destekli içerikler etkileşim oranlarımızı artırdı.&quot;
              </p>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-[#ffde59] fill-[#ffde59]"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Başarı hikayesi 2 */}
            <div className="border-2 border-black p-6 bg-white hover:translate-y-[-4px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#ffde59] border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-black" />
                </div>
                <div>
                  <p className="font-bold">Bahar Butik</p>
                  <p className="text-xs text-gray-600">E-ticaret</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 flex-grow">
                &quot;Küçük bir ekip olarak birden fazla sosyal medya platformu için
                içerik üretmek zordu. Bu platform sayesinde Instagram ve
                Facebook içeriklerimizi tutarlı ve profesyonel bir şekilde
                oluşturabiliyoruz.&quot;
              </p>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < 4
                          ? "text-[#ffde59] fill-[#ffde59]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Başarı hikayesi 3 */}
            <div className="border-2 border-black p-6 bg-white hover:translate-y-[-4px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#ffde59] border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-black" />
                </div>
                <div>
                  <p className="font-bold">Yeşil Teknoloji</p>
                  <p className="text-xs text-gray-600">Teknoloji Firması</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 flex-grow">
                &quot;Teknik konuları anlaşılır bir dille sosyal medyada anlatmak
                bizim için zordu. Yapay zeka destekli içerik oluşturma, karmaşık
                ürünlerimizi basit ve etkileyici şekilde tanıtmamızı sağlıyor.&quot;
              </p>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < 5
                          ? "text-[#ffde59] fill-[#ffde59]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/wizard"
              className="px-6 py-3 bg-[#ffde59] text-black font-bold hover:translate-y-[-4px] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-flex items-center"
            >
              Kendi Başarı Hikayenizi Oluşturun
              <Zap size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
