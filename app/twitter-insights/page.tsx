"use client";

import {
  ArrowLeft,
  BarChart3,
  FileText,
  Info,
  LineChart,
  Megaphone,
  Play,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TwitterInsightsPage() {
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 bg-gray-50">
      <div className="w-full max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-block p-2 px-4 bg-[#ffde59] text-black rounded-none mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="flex items-center gap-2 font-bold">
              <Megaphone size={20} />
              Çok Yakında...
            </span>
          </div>
          <div>
            <h1 className="font-black text-center mb-4 text-5xl md:text-6xl leading-[1.1] tracking-tight">
              Twitter(X){" "}
              <span className="bg-black text-white px-2">İçerik Analizi</span>
            </h1>
            <p className="text-xl mb-8 font-medium text-gray-800 max-w-2xl mx-auto">
              Twitter hesabınızı analiz ederek etkileşiminizi artıracak
              içgörüler elde edin. Kullanıcı adınızı girerek detaylı grafikler,
              etkileşim analizi ve kişiselleştirilmiş içerik stratejileri alın.
            </p>
          </div>
        </div>

        {showTutorial && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="rounded-none border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="p-5 bg-white border-b-2 border-black">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-black flex items-start gap-2">
                    <Video className="h-6 w-6" />
                    Twitter İçerik Analizi Nasıl Çalışır?
                  </h3>
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="text-gray-600 cursor-pointer hover:text-black focus:outline-none"
                    aria-label="Tanıtımı kapat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-gray-700 mb-0">
                  Twitter içerik analiz aracımızı kullanmaya başlamadan önce,
                  kısa tanıtım videosunu izleyerek özelliklerini keşfedin. Bu
                  video, Twitter hesabınızdan nasıl değerli içgörüler elde
                  edebileceğinizi ve içerik stratejinizi nasıl
                  geliştirebileceğinizi göstermektedir.
                </p>
              </div>

              <div className="relative pb-[56.25%] h-0 overflow-hidden border-b-2 border-black">
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/disabled-feature.mp4"
                >
                  <source src="/disabled-feature.mp4" type="video/mp4" />
                  Tarayıcınız video formatını desteklemiyor.
                </video>
              </div>

              <div className="px-6 py-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center mb-3 sm:mb-0">
                    <div className="bg-[#ffde59] text-black p-2 border-2 border-black mr-3">
                      <Info size={20} />
                    </div>
                    <p className="text-sm text-gray-700">
                      Kullanmaya başlamak için Twitter kullanıcı adınızı girin
                      ve &quot;Analiz Et&quot; butonuna tıklayın.
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-[#ffde59] text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300">
                    Haberdar Ol
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showTutorial && (
          <div className="text-center my-8">
            <button
              onClick={() => setShowTutorial(true)}
              className="px-4 py-2 bg-white text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300 inline-flex items-center"
            >
              <Play className="h-5 w-5 mr-2" />
              Tanıtım Videosunu Göster
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
              <FileText size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Etkileşim Analizi</h3>
            <p className="text-gray-700 mb-4">
              Tweet&apos;lerinizin aldığı beğeni, retweet ve yanıtları analiz
              ederek en iyi performans gösteren içerikleri keşfedin.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-4 w-4 rounded-full bg-black"></div>
                En çok etkileşim alan içerikler
              </li>rut
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-4 w-4 rounded-full bg-black"></div>
                En iyi performans gösteren zamanlar
              </li>
            </ul>
          </div>

          <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
              <BarChart3 size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Takipçi İstatistikleri</h3>
            <p className="text-gray-700 mb-4">
              Takipçilerinizin demografik özelliklerini ve ilgi alanlarını
              öğrenerek hedef kitlenizi daha iyi tanıyın.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-4 w-4 rounded-full bg-black"></div>
                Demografik analiz
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-4 w-4 rounded-full bg-black"></div>
                İlgi alanları ve tercihler
              </li>
            </ul>
          </div>

          <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
              <LineChart size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">İçerik Önerileri</h3>
            <p className="text-gray-700 mb-4">
              Yapay zeka destekli içerik önerileri ile etkileşiminizi artıracak
              tweet fikirleri ve stratejileri oluşturun.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-4 w-4 rounded-full bg-black"></div>
                AI destekli içerik önerileri
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-4 w-4 rounded-full bg-black"></div>
                İçerik takvimi oluşturma
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 text-center">
          <div className="bg-white p-8 rounded-none border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 max-w-3xl mx-auto">
            <div className="mb-4 w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mx-auto">
              <Megaphone size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Çok Yakında...</h3>
            <p className="text-gray-700">
              Twitter analizi özelliğimiz çok yakında hizmetinizde olacak. Bu
              analiz aracı, Twitter(X) verilerinizi alır ve Gelişmiş Yapay Zeka
              asistanı ile içgörüler oluşturur.
            </p>
          </div>
          <p className="text-gray-600 font-medium max-w-3xl mx-auto text-center my-8">
            Bu analiz aracı, Twitter(X) verilerinizi alır ve Gelişmiş Yapay Zeka
            asistanı ile içgörüler oluşturur. Tüm veri analizleri tamamen
            gizlidir ve herhangi bir kişisel veri saklanmamaktadır.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-[#ffde59] text-black font-bold hover:translate-y-[-4px] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-flex items-center"
          >
            <ArrowLeft className="mr-2" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}
