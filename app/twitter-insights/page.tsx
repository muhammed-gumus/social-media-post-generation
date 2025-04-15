"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TwitterInsightsPage() {
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 bg-gradient-to-b from-white to-blue-100">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-block p-2 px-4 bg-blue-100 text-blue-800 rounded-full mb-4">
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
              Twitter Analytics
            </span>
          </div>
          <div>
            <h1 className="font-bold text-center mb-4 text-[#1DA1F2] mt-4 text-3xl md:text-4xl lg:text-5xl">
              Twitter(X) İçerik Analizi
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Twitter hesabınızı analiz ederek etkileşiminizi artıracak
              içgörüler elde edin. Kullanıcı adınızı girerek detaylı grafikler,
              etkileşim analizi ve kişiselleştirilmiş içerik stratejileri alın.
            </p>
          </div>
        </div>

        {showTutorial && (
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="overflow-hidden shadow-xl rounded-xl  transition-all  gap-0 p-0">
              <div className="relative pb-[56.25%] h-0 overflow-hidden bg-gray-900">
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

              <div className="px-6 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white p-2 rounded-full mr-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">
                      Bu özellik yakında aktif edilecektir. Heyecanla
                      bekleyiniz!
                    </p>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Haberdar Ol
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {!showTutorial && (
          <div className="text-center my-8">
            <Button
              onClick={() => setShowTutorial(true)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Tanıtım Videosunu Göster
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="text-blue-600"
                viewBox="0 0 16 16"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m3.5-9.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Etkileşim Analizi</h3>
            <p className="text-gray-600">
              Tweet&apos;lerinizin aldığı beğeni, retweet ve yanıtları analiz
              ederek en iyi performans gösteren içerikleri keşfedin.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="text-green-600"
                viewBox="0 0 16 16"
              >
                <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Takipçi İstatistikleri
            </h3>
            <p className="text-gray-600">
              Takipçilerinizin demografik özelliklerini ve ilgi alanlarını
              öğrenerek hedef kitlenizi daha iyi tanıyın.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="text-purple-600"
                viewBox="0 0 16 16"
              >
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">İçerik Önerileri</h3>
            <p className="text-gray-600">
              Yapay zeka destekli içerik önerileri ile etkileşiminizi artıracak
              tweet fikirleri ve stratejileri oluşturun.
            </p>
          </Card>
        </div>

        <div className="pt-8 text-center">
          <div className="bg-blue-50 p-6 rounded-xl mb-6 max-w-3xl mx-auto">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">
              Gizlilik Garantisi
            </h3>
            <p className="text-gray-600 text-sm">
              Bu analiz aracı, Twitter(X) verilerinizi alır ve Gelişmiş Yapay
              Zeka asistanı ile içgörüler oluşturur. Tüm veri analizleri tamamen
              gizlidir ve herhangi bir kişisel veri saklanmamaktadır.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
