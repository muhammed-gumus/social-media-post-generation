import { CheckCircle, Layers, PieChart, FileText } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ana <span className="bg-[#ffde59] px-2">Özellikler</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Sosyal medya varlığınızı güçlendiren kapsamlı araç setiyle tanışın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* İçerik Oluşturma - Aktif */}

          <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
                <FileText size={24} className="text-black" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">İçerik Oluşturma</h3>
            <p className="text-gray-700 mb-4">
              Yapay zeka ile desteklenen sosyal medya içerik üretimi. Her
              platformun gereksinimlerine ve hedef kitlenize uyarlanmış
              profesyonel içerikler.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-black" />
                Platforma özel içerik boyutlandırma
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-black" />
                Görseller ve metinlerin akıllı optimizasyonu
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-black" />
                Hedef kitleye uyarlanmış ton ve dil
              </li>
            </ul>
          </div>

          {/* Hazır İçerik Şablonları - Yakında */}
          <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="absolute -top-3 -right-3 bg-black text-white text-xs font-bold px-3 py-1 transform rotate-12">
              YAKINDA
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 border-2 border-black flex items-center justify-center mb-4">
                <Layers size={24} className="text-gray-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-500">
              Hazır İçerik Şablonları
            </h3>
            <p className="text-gray-500 mb-4">
              Hızlı içerik üretimi için sektörlere ve platformlara özel
              hazırlanmış şablonlar. Saniyeler içinde özelleştirebileceğiniz
              profesyonel tasarımlar.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={16} className="text-gray-400" />
                30+ özelleştirilebilir şablon
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={16} className="text-gray-400" />
                Sektörel içerik stratejileriyle uyumlu
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={16} className="text-gray-400" />
                &ldquo;Doldur ve yayınla&rdquo; kolaylığı
              </li>
            </ul>
          </div>

          {/* Twitter Analizi - Yakında */}
          <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
            <div className="absolute -top-3 -right-3 bg-black text-white text-xs font-bold px-3 py-1 transform rotate-12">
              YAKINDA
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 border-2 border-black flex items-center justify-center mb-4">
                <PieChart size={24} className="text-gray-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-500">
              Twitter (X) Analizi
            </h3>
            <p className="text-gray-500 mb-4">
              Twitter hesabınızın performansını derinlemesine analiz edin.
              İçeriklerinizin etkisini ölçün ve takipçi etkileşimlerini optimize
              edin.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={16} className="text-gray-400" />
                Etkileşim ve erişim analizleri
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={16} className="text-gray-400" />
                En iyi performans gösteren içerik raporları
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={16} className="text-gray-400" />
                İzleyici demografisi ve davranış analizi
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
