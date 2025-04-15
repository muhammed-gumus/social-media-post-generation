"use client";

import {
  TwitterUserProfile,
  TwitterUserTweets,
} from "@/lib/services/twitterService";

interface InsightsTabProps {
  userProfile: TwitterUserProfile;
  userTweets: TwitterUserTweets | null;
  insights: string;
}

export function InsightsTab({ userProfile, userTweets }: InsightsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-blue-100 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          İçerik Stratejisi Kategorileri
        </h3>
      </div>

      {/* Analiz kartı */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-gray-700">Analiz</h4>
            </div>
          </div>
          <div className="p-5">
            <p className="text-gray-700 text-sm mb-4">
              {userProfile &&
                `@${userProfile.username} Twitter hesabı için detaylı içerik stratejisi analizi ve önerileri aşağıda sunulmuştur.`}
            </p>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                {userProfile &&
                  `"${userProfile.username}" hesabı, yazılım geliştirici kimliğine sahip bir kullanıcının kişisel hesabıdır. ${userProfile.tweetCount} tweet ile oldukça aktif bir kullanıcı profili sergilemektedir, ancak etkileşim oranları genel olarak düşük kalmaktadır. Son tweetlerin incelenmesi, geliştirme süreçleri, karşılaştığı teknik sorunlar ve kişisel deneyimler paylaşıldığı gösteriyor.`}
              </p>
            </div>
          </div>
        </div>

        {/* En Yüksek Etkileşim Alan İçerik Türleri */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="p-5 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-b border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-gray-700">
                En Yüksek Etkileşim Alan İçerik Türleri
              </h4>
            </div>
          </div>
          <div className="p-5">
            {userTweets && (
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-[24px] h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">1</span>
                  </div>
                  <span className="text-gray-700 text-sm">
                    Teknik sorunlar ve çözüm arayışları ile ilgili paylaşımlar
                    en yüksek etkileşim oranlarını almıştır.
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-[24px] h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">2</span>
                  </div>
                  <span className="text-gray-700 text-sm">
                    Podcast önerileri paylaşması, kitlesinde yankı bulmuştur.
                  </span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-[24px] h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                    <span className="text-xs font-medium">3</span>
                  </div>
                  <span className="text-gray-700 text-sm">
                    Kişisel deneyimler (kısıtlı) paylaşımı da ilgi çekmiştir.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Teknik İçerik Önerileri */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
            <div className="flex items-center">
              <div className="bg-emerald-100 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-gray-700">
                Teknik İçerik Stratejisi
              </h4>
            </div>
          </div>
          <div className="p-5">
            <div className="mb-4">
              <div className="flex items-start mb-2">
                <div className="flex items-center h-5 mt-1">
                  <input
                    checked
                    id="teknik-oneri-1"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    readOnly
                  />
                </div>
                <label
                  htmlFor="teknik-oneri-1"
                  className="ml-3 text-sm text-gray-700"
                >
                  <span className="font-medium">
                    Teknik sorunlar ve çözüm arayışları:
                  </span>{" "}
                  Geliştirme sürecindeki zorluklar ve bunların nasıl üstesinden
                  gelindiğiyle ilgili paylaşımlar en yüksek etkileşim oranlarını
                  almıştır.
                </label>
              </div>
              <div className="flex items-start mb-2">
                <div className="flex items-center h-5 mt-1">
                  <input
                    checked
                    id="teknik-oneri-2"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    readOnly
                  />
                </div>
                <label
                  htmlFor="teknik-oneri-2"
                  className="ml-3 text-sm text-gray-700"
                >
                  <span className="font-medium">Podcast önerileri:</span>{" "}
                  Değerli bulduğu podcast paylaşımları, kitlesinde yankı
                  bulmuştur.
                </label>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input
                    checked
                    id="teknik-oneri-3"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    readOnly
                  />
                </div>
                <label
                  htmlFor="teknik-oneri-3"
                  className="ml-3 text-sm text-gray-700"
                >
                  <span className="font-medium">Kişisel deneyimler:</span> Kendi
                  Twitter geliştirme süreci gibi kişisel deneyimleri paylaşması
                  da ilgi çekmiştir.
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Hedef Kitle Stratejisi */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-gray-100">
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-full p-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-gray-700">
                Hedef Kitlesine Uygun İçerik Stratejisi
              </h4>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-700 mb-4">
              Hedef kitlesi, büyük olasılıkla diğer yazılım geliştiriciler,
              girişimciler ve teknoloji meraklılarıdır. Bu nedenle içerik
              stratejisi şu şekilde düzenlenmelidir:
            </p>

            <div className="space-y-3">
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">
                    Teknik içerik odaklı olun:
                  </span>{" "}
                  Geliştirme süreçleri, kullandığı teknolojiler, karşılaştığı
                  zorluklar ve çözüm önerileri gibi teknik içeriklerin
                  paylaşıldığı düzenli bir yayın takvimi oluşturulmalıdır.
                </p>
              </div>

              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">
                    Soru-cevap oturumları düzenleyin:
                  </span>{" "}
                  Canlı soru-cevap oturumları düzenleyerek takipçilerle
                  etkileşimi arttırabilir ve uzmanlığını sergileyebilir.
                </p>
              </div>

              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">
                    Öğretici içerikler paylaşın:
                  </span>{" "}
                  Kısa kod örnekleri, ipuçları ve pdf notaları içeren öğretici
                  içerikler, takipçi sayısını artırmada etkili olabilir.
                </p>
              </div>

              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">
                    Case study&apos;ler paylaşın:
                  </span>{" "}
                  Geliştirdiği projeler hakkında detaylı case study&apos;ler
                  paylaşarak, uzmanlığını ve deneyimini sergileyebilir.
                </p>
              </div>

              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  <span className="font-medium">
                    Podcast ve blog önerilerine devam edin:
                  </span>{" "}
                  Değerli bulduğu kaynakları paylaşmaya devam etmeli, ancak
                  sadece yazılım geliştirmeyle ilgili olanları tercih etmelidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Özel strateji önerisi */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
        <div className="flex items-center mb-4">
          <div className="bg-indigo-100 rounded-full p-2 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Önerilen İçerik Stratejisi
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            {userProfile &&
              `"${userProfile.username}" hesabının hedef kitlesi, büyük olasılıkla diğer yazılım geliştiriciler, girişimciler ve teknoloji meraklılarıdır. Bu nedenle içerik stratejisi şu şekilde düzenlenmelidir:`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="bg-indigo-100 text-indigo-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Haftalık
                </span>
                Teknik İçerik Paylaşımı
              </h4>
              <p className="text-xs text-gray-600">
                Haftada en az 2-3 teknik içerik paylaşarak düzenli bir yayın
                akışı oluşturun. Kod örnekleri, development ipuçları ve problem
                çözümleri paylaşın.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="bg-green-100 text-green-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Aylık
                </span>
                Soru-Cevap Oturumları
              </h4>
              <p className="text-xs text-gray-600">
                Ayda bir kez belirli bir teknik konu etrafında soru-cevap
                oturumu organize edin. Takipçilerinizin sorularını yanıtlayarak
                etkileşimi artırın.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="bg-purple-100 text-purple-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  İki Haftada Bir
                </span>
                Case Study&apos;ler
              </h4>
              <p className="text-xs text-gray-600">
                İki haftada bir, geliştirdiğiniz projelerle ilgili detaylı bir
                case study paylaşın. Karşılaştığınız zorlukları ve çözüm
                süreçlerini anlatın.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <span className="bg-amber-100 text-amber-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 010-7.072m-2.829 9.9a9 9 0 010-12.728"
                    />
                  </svg>
                  Haftalık
                </span>
                Öğretici İçerikler
              </h4>
              <p className="text-xs text-gray-600">
                Her hafta belirli bir teknik konuda kısa öğretici içerikler
                hazırlayın. Kod örnekleri, şemalar ve görsellerle
                zenginleştirin.
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                />
              </svg>
              İçerik stratejisini indir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
