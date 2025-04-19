import Link from "next/link";
import { WandSparkles, ArrowRight, Users, FileText } from "lucide-react";

export default function ProcessSection() {
  return (
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
              Her platforma özel optimum format ve boyutta içerikler için doğru
              içerik tipini belirleyin.
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
  );
}
