"use client";

import { useWizard } from "../wizardContext";
import { useEffect, useState } from "react";

export default function ContentDetailsStep() {
  const { state, setState } = useWizard();
  const [contextualTip, setContextualTip] = useState("");

  // Generate contextual tips based on previous wizard selections
  useEffect(() => {
    // Generate contextual tip based on the combination of selections
    let tip = "";

    // Platform and content type specific tips
    if (state.selectedPlatform && state.selectedContentType) {
      if (
        state.selectedPlatform === "instagram" &&
        state.selectedContentType === "carousel"
      ) {
        tip =
          "Instagram Carousel'lerde her slayta tek bir önemli bilgi ekleyin. İlk slayt mutlaka dikkat çekici olmalı.";
      } else if (
        state.selectedPlatform === "instagram" &&
        state.selectedContentType === "story"
      ) {
        tip =
          "Instagram Hikayelerinde daha spontane ve samimi içerikler daha çok etkileşim alır.";
      } else if (
        state.selectedPlatform === "linkedin" &&
        state.selectedContentType === "article"
      ) {
        tip =
          "LinkedIn makalelerinde sektör istatistiklerini ve gerçek vaka çalışmalarını paylaşmak profesyonelliği artırır.";
      } else if (
        state.selectedPlatform === "twitter" &&
        state.selectedContentType === "thread"
      ) {
        tip =
          "Twitter Thread'lerinde ana konuyu ilk tweet'te net bir şekilde belirtin ve sonraki tweetlerde derinleştirin.";
      }
    }

    // Industry and purpose specific tips
    if (state.selectedIndustry && state.selectedPurpose) {
      if (
        state.selectedIndustry === "tech" &&
        state.selectedPurpose === "thought_leadership"
      ) {
        tip =
          "Teknoloji sektöründe düşünce liderliği için gelecek trendlere dair öngörüleri paylaşmak etkilidir.";
      } else if (
        state.selectedIndustry === "healthcare" &&
        state.selectedPurpose === "education"
      ) {
        tip =
          "Sağlık sektöründe eğitici içeriklerde karmaşık bilgileri görsellerle basitleştirmek faydalı olur.";
      } else if (
        state.selectedIndustry === "finance" &&
        state.selectedPurpose === "conversion"
      ) {
        tip =
          "Finans sektöründe dönüşüm odaklı içeriklerde rakamsal değerleri ve somut faydaları vurgulamak etkilidir.";
      }
    }

    // Audience and tone specific tips
    if (state.selectedAudience && state.selectedTone) {
      if (
        state.selectedAudience === "gen_z" &&
        state.selectedTone === "humorous"
      ) {
        tip =
          "Z kuşağına mizahi içerik oluştururken güncel pop kültür referansları ve dürüst, kendinden emin bir ton kullanın.";
      } else if (
        state.selectedAudience === "executives" &&
        state.selectedTone === "professional"
      ) {
        tip =
          "Yöneticilere yönelik profesyonel içeriklerde kısa, öz ve stratejik değeri vurgulayan bir yaklaşım daha etkilidir.";
      } else if (
        state.selectedAudience === "eco_conscious" &&
        state.selectedTone === "emotional"
      ) {
        tip =
          "Çevre bilinci yüksek kitleye duygusal içerikler oluştururken, somut etki ve çözümleri vurgulamak önemlidir.";
      }
    }

    setContextualTip(tip);
  }, [
    state.selectedPlatform,
    state.selectedContentType,
    state.selectedIndustry,
    state.selectedPurpose,
    state.selectedAudience,
    state.selectedTone,
  ]);

  // Generate custom placeholder based on selected options
  const getCustomPlaceholder = () => {
    // Default example with more detail based on settings
    let placeholder =
      "İçeriğiniz için detaylı bir açıklama yazın. Ana konuyu, hedeflenen mesajı ve vurgulanması gereken noktaları belirtin.";

    if (state.selectedPlatform && state.selectedContentType) {
      if (
        state.selectedPlatform === "twitter" &&
        state.selectedContentType === "thread"
      ) {
        placeholder =
          "Yapay zeka trendleri hakkında bir thread. Önemli gelişmeleri, etkileri ve geleceğe dair öngörüleri içeren 5-10 tweet'lik bir seri.";
      } else if (
        state.selectedPlatform === "instagram" &&
        state.selectedContentType === "guide"
      ) {
        placeholder =
          "Sağlıklı beslenme hakkında kapsamlı bir rehber. Her bölümde farklı bir beslenme önerisi ve pratik tarifler.";
      } else if (
        state.selectedPlatform === "linkedin" &&
        state.selectedContentType === "article"
      ) {
        placeholder =
          "İş dünyasında yapay zeka kullanımı hakkında detaylı bir analiz. Sektörel örnekler ve istatistiklerle desteklenmiş.";
      } else if (
        state.selectedPlatform === "facebook" &&
        state.selectedContentType === "event"
      ) {
        placeholder =
          "Şirketinizin yıllık teknoloji konferansı için etkinlik duyurusu. Konuşmacılar, program ve katılım detayları.";
      } else if (state.selectedIndustry === "fashion") {
        placeholder = `${
          state.selectedIndustry === "fashion" ? "Moda" : "Sektörünüz"
        } ile ilgili içeriğinizi açıklayın. Yeni trendler, öne çıkan ürünler veya ilgi çekici bir hikaye paylaşabilirsiniz.`;
      } else if (state.selectedIndustry === "tech") {
        placeholder = `Teknoloji içeriğinizde ele almak istediğiniz konuları, ürünleri veya çözümleri detaylandırın.`;
      }
    }

    return placeholder;
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="description" className="block mb-2 font-medium">
          İçeriğinizi detaylı açıklayın:
        </label>
        <textarea
          id="description"
          rows={5}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={getCustomPlaceholder()}
          value={state.contentDescription}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              contentDescription: e.target.value,
            }))
          }
          required
        />
      </div>

      <div>
        <label htmlFor="keywords" className="block mb-2 font-medium">
          Anahtar Kelimeler:
        </label>
        <input
          id="keywords"
          type="text"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Virgülle ayırarak anahtar kelimeleri girin (ör: yapay zeka, teknoloji, inovasyon)"
          value={state.contentKeywords}
          onChange={(e) =>
            setState((prev) => ({ ...prev, contentKeywords: e.target.value }))
          }
        />
        <p className="mt-2 text-sm text-gray-500">
          Anahtar kelimeler içeriğinizin odak noktalarını belirler ve hashtag
          önerilerini şekillendirir.
        </p>
      </div>

      {/* İçerik uzunluğu tercihi */}
      <div className="space-y-4 border rounded-lg p-4">
        <label className="block mb-2 font-medium">İçerik Uzunluğu</label>
        <div className="flex flex-wrap gap-3">
          <div
            className={`p-3 border rounded-lg cursor-pointer ${
              state.contentLength === "short"
                ? "border-primary bg-primary/10"
                : ""
            }`}
            onClick={() =>
              setState((prev) => ({ ...prev, contentLength: "short" }))
            }
          >
            <div className="font-medium">Kısa</div>
            <div className="text-sm text-gray-500">Özlü ve kısa içerik</div>
          </div>
          <div
            className={`p-3 border rounded-lg cursor-pointer ${
              state.contentLength === "medium"
                ? "border-primary bg-primary/10"
                : ""
            }`}
            onClick={() =>
              setState((prev) => ({ ...prev, contentLength: "medium" }))
            }
          >
            <div className="font-medium">Orta</div>
            <div className="text-sm text-gray-500">Dengeli uzunlukta</div>
          </div>
          <div
            className={`p-3 border rounded-lg cursor-pointer ${
              state.contentLength === "long"
                ? "border-primary bg-primary/10"
                : ""
            }`}
            onClick={() =>
              setState((prev) => ({ ...prev, contentLength: "long" }))
            }
          >
            <div className="font-medium">Uzun</div>
            <div className="text-sm text-gray-500">Detaylı ve kapsamlı</div>
          </div>
        </div>
      </div>

      {/* Platform özel seçenekler */}
      {state.selectedPlatform === "instagram" && (
        <div className="space-y-4 border rounded-lg p-4">
          <label htmlFor="instagramFilter" className="block mb-2 font-medium">
            Instagram Filtresi
          </label>
          <select
            id="instagramFilter"
            className="w-full p-2 border rounded-md"
            value={state.instagramFilter}
            onChange={(e) =>
              setState((prev) => ({ ...prev, instagramFilter: e.target.value }))
            }
          >
            <option value="">Filtre yok</option>
            <option value="clarendon">Clarendon</option>
            <option value="gingham">Gingham</option>
            <option value="moon">Moon</option>
            <option value="lark">Lark</option>
            <option value="reyes">Reyes</option>
          </select>
          <p className="text-sm text-gray-500">
            Instagram görseliniz için tercih edilen filtre
          </p>
        </div>
      )}

      {state.selectedPlatform === "twitter" && (
        <div className="space-y-4 border rounded-lg p-4">
          <label htmlFor="twitterCharLimit" className="block mb-2 font-medium">
            Karakter Limiti
          </label>
          <select
            id="twitterCharLimit"
            className="w-full p-2 border rounded-md"
            value={state.twitterCharLimit}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                twitterCharLimit: Number(e.target.value),
              }))
            }
          >
            <option value="280">Standart (280)</option>
            <option value="140">Kısa (140)</option>
            <option value="200">Orta (200)</option>
          </select>
          <p className="text-sm text-gray-500">
            Tweet başına maksimum karakter sayısı
          </p>
        </div>
      )}

      {state.selectedPlatform === "facebook" && (
        <div className="space-y-4 border rounded-lg p-4">
          <label htmlFor="facebookPrivacy" className="block mb-2 font-medium">
            Görünürlük
          </label>
          <select
            id="facebookPrivacy"
            className="w-full p-2 border rounded-md"
            value={state.facebookPrivacy}
            onChange={(e) =>
              setState((prev) => ({ ...prev, facebookPrivacy: e.target.value }))
            }
          >
            <option value="public">Herkese Açık</option>
            <option value="friends">Arkadaşlar</option>
            <option value="specific">Belirli Gruplar</option>
          </select>
          <p className="text-sm text-gray-500">
            İçeriğin Facebook üzerinde kimler tarafından görülebileceği
          </p>
        </div>
      )}

      {/* Görsel tercihi */}
      {state.selectedContentType !== "textOnly" &&
        state.selectedContentType !== "thread" && (
          <div className="space-y-4 border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="imageToggle"
                className="w-4 h-4"
                checked={state.imageRequired}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    imageRequired: e.target.checked,
                  }))
                }
              />
              <label htmlFor="imageToggle" className="text-sm font-medium">
                Bu içerik için görsel oluşturulsun mu?
              </label>
            </div>

            {/* No text in images notice */}
            {state.imageRequired && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700 flex items-center">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Oluşturulacak görsellerin hiçbirinde yazı, metin, harf veya
                  sayı bulunmayacaktır. Yalnızca görsel öğeler içereceklerdir.
                </p>
              </div>
            )}

            <p className="text-sm text-gray-500 ml-6">
              {state.selectedPlatform === "instagram"
                ? "Instagram'da görsel içerik önemlidir. Yüksek kaliteli ve ilgi çekici görseller etkileşimi artırır."
                : state.selectedPlatform === "linkedin"
                ? "LinkedIn'de profesyonel görseller içeriğinizin etkisini güçlendirir."
                : state.selectedPlatform === "facebook"
                ? "Facebook'ta görsel içerikler daha fazla etkileşim alır ve akışta daha fazla dikkat çeker."
                : state.selectedPlatform === "twitter"
                ? "Twitter'da görsel içerikler tweet'lerinizin görünürlüğünü artırır."
                : "Görsel içerikler paylaşımlarınızın etkisini artırır ve akılda kalıcılığı güçlendirir."}
            </p>
          </div>
        )}

      {/* Contextual tips based on previous selections */}
      {contextualTip && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Kişiselleştirilmiş İpucu:
          </h3>
          <p className="text-sm text-gray-700">{contextualTip}</p>
        </div>
      )}

      {/* İçerik türüne özel ipuçları */}
      <div className="mt-4 p-4 bg-primary/5 rounded-lg">
        <h3 className="font-medium mb-2">İçerik Türü İpuçları:</h3>
        <p className="text-sm text-gray-600">
          {state.selectedContentType === "thread"
            ? "• Thread'ler için numaralandırma yapılacak (1/X formatında)\n• Her tweet 280 karakteri geçmeyecek\n• Konuyu mantıklı bir sırayla anlat\n• Son tweet'te özet veya çağrı ekle"
            : state.selectedContentType === "article"
            ? "• Giriş, gelişme ve sonuç bölümlerini belirgin yap\n• Alt başlıklar kullan\n• Önemli noktaları vurgula\n• Profesyonel bir dil kullan"
            : state.selectedContentType === "guide"
            ? "• Adım adım talimatlar ver\n• Her bölümü numaralandır\n• Pratik öneriler ekle\n• Örneklerle zenginleştir"
            : "• Ana mesajı net ifade et\n• Hedef kitleye uygun dil kullan\n• Çağrı ifadesi (call-to-action) ekle"}
        </p>
      </div>
    </div>
  );
}
