// Google'ın Gemini 2.0 Flash API'si için yardımcı fonksiyonlar

interface GeminiRequest {
  model: string;
  contents: {
    parts: {
      text: string;
    }[];
    role: string;
  }[];
  generationConfig: {
    temperature: number;
    topK: number;
    topP: number;
    maxOutputTokens: number;
    stopSequences?: string[];
  };
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
  }[];
  promptFeedback?: any;
}

/**
 * Dil kodunu tam dil adına dönüştürür
 * @param languageCode Dil kodu (tr, en, de, vb.)
 * @returns Dil adı
 */
function getLanguageName(languageCode: string): string {
  const languageNames: Record<string, string> = {
    tr: "Türkçe",
    en: "İngilizce (English)",
    de: "Almanca (Deutsch)",
    fr: "Fransızca (Français)",
    es: "İspanyolca (Español)",
    it: "İtalyanca (Italiano)",
    ru: "Rusça (Русский)",
    ar: "Arapça (العربية)",
    zh: "Çince (中文)",
  };
  return languageNames[languageCode] || languageCode;
}

/**
 * Gemini API ile metin içeriği oluşturur
 * @param prompt Metin oluşturma için prompt
 * @returns Oluşturulan metin içeriği
 */
export async function generateText(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("Google API anahtarı bulunamadı.");
      return "API anahtarı eksik. İçerik üretilemedi.";
    }

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
          role: "user",
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    try {
      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `API isteği başarısız (${response.status}): ${errorText}`
        );
        return "API çağrısı sırasında hata oluştu. İçerik üretilemedi.";
      }

      const data = await response.json();

      if (data?.candidates?.[0]?.content?.parts) {
        const text = data.candidates[0].content.parts
          .map((part: any) => part.text || "")
          .join("");
        return text || "İçerik üretilemedi.";
      } else {
        console.error("API yanıt formatı beklendiği gibi değil:", data);
        return "İçerik üretilemedi. API yanıt formatı beklenenden farklı.";
      }
    } catch (fetchError) {
      console.error("Fetch işlemi sırasında hata:", fetchError);
      return "Bağlantı hatası. İçerik üretilemedi.";
    }
  } catch (error) {
    console.error("Gemini API hatası:", error);
    return "İçerik oluşturulamadı. Lütfen daha sonra tekrar deneyin.";
  }
}

/**
 * Sosyal medya metni oluşturur
 * @param platform Sosyal medya platformu (instagram, twitter, linkedin, vb.)
 * @param contentType İçerik türü (post, story, thread, vb.)
 * @param audience Hedef kitle
 * @param description İçerik açıklaması
 * @param language İçerik dili (tr, en, de, vb.)
 * @returns Sosyal medya için oluşturulan metin
 */
export async function generateSocialMediaText(
  platform: string,
  contentType: string,
  audience: string,
  description: string,
  language: string = "tr" // Varsayılan dil Türkçe
): Promise<string> {
  const prompt = `
    Aşağıdaki parametrelere göre bir sosyal medya içeriği hazırla:
    
    - Platform: ${platform}
    - İçerik Türü: ${contentType}
    - Hedef Kitle: ${audience}
    - Konu Açıklaması: ${description}
    - İçerik Dili: ${language}

    ${
      contentType === "thread"
        ? "Thread formatında yaz. Her tweet'i '1/X:' formatında numaralandır. Her tweet 280 karakteri geçmemeli. Konuyu mantıklı bir sırayla anlat. Son tweet'te özet veya çağrı ekle."
        : contentType === "article"
        ? "Makale formatında ve profesyonel bir dille yaz. Önemli noktaları vurgula."
        : contentType === "guide"
        ? "Adım adım rehber formatında yaz. Her adımı numaralandır ve detaylı açıkla."
        : ""
    }

    Platformun özelliklerine ve hedef kitleye uygun, dikkat çekici ve etkileşim alabilecek bir içerik oluştur.
    ${
      platform === "twitter" && contentType !== "thread"
        ? "280 karakteri geçmemeli."
        : ""
    }
    ${platform === "linkedin" ? "Profesyonel bir tonda" : ""}
    
    ÖNEMLİ: İçeriği ${getLanguageName(language)} dilinde oluştur.
    İçeriği düz metin olarak formatla, kesinlikle Markdown formatı (*, #, -, >>, vb. işaretler) kullanma. Alt başlıklar gerekiyorsa, onları numaralandır veya büyük harflerle yaz, ama # sembolü kullanma.
    
    Yanıtı doğrudan içerik olarak ver, ekstra açıklama ekleme.
  `;

  return generateText(prompt);
}

/**
 * Sosyal medya başlığı oluşturur
 * @param platform Sosyal medya platformu
 * @param contentType İçerik türü
 * @param description İçerik açıklaması
 * @returns Sosyal medya için oluşturulan başlık
 */
export async function generateSocialMediaTitle(
  platform: string,
  contentType: string,
  description: string
): Promise<string> {
  const prompt = `
    "${description}" konusu için ${platform} platformunda ${contentType} içeriği için dikkat çekici bir başlık oluştur.
    
    ${platform === "linkedin" ? "Profesyonel ve bilgilendirici" : ""}
    ${platform === "twitter" ? "Kısa ve öz" : ""}
    ${contentType === "thread" ? "Thread'in ana konusunu yansıtan" : ""}
    
    Sadece başlığı yaz, başka açıklama ekleme.
  `;

  return generateText(prompt);
}

/**
 * Sosyal medya hashtag'leri oluşturur
 * @param platform Sosyal medya platformu
 * @param description İçerik açıklaması
 * @returns Sosyal medya için oluşturulan hashtag'ler
 */
export async function generateSocialMediaHashtags(
  platform: string,
  description: string
): Promise<string[]> {
  const prompt = `
    "${description}" konusu için ${platform} platformuna uygun 5-8 adet ilgili hashtag oluştur.
    
    ${
      platform === "linkedin"
        ? "Profesyonel ve sektöre uygun hashtag'ler kullan."
        : platform === "twitter"
        ? "Trend olan ve ilgili hashtag'leri kullan."
        : platform === "instagram"
        ? "Keşfet'te öne çıkan popüler hashtag'leri kullan."
        : ""
    }
    
    Sadece hashtag'leri liste halinde ver, başka açıklama ekleme.
    Her hashtag'i # işaretiyle başlat.
  `;

  const response = await generateText(prompt);
  return response
    .split(/[\n,]/)
    .map((tag) => tag.trim())
    .filter((tag) => tag.startsWith("#") && tag.length > 1);
}

/**
 * İçerik paylaşımı için öneriler üretir
 * @param platform Sosyal medya platformu
 * @returns Öneriler dizisi
 */
export async function generateContentSuggestions(
  platform: string
): Promise<string[]> {
  const prompt = `
    ${platform} platformu için içerik oluşturma ve paylaşma konusunda 5 pratik öneri ver.
    
    ${platform === "linkedin" ? "İş dünyasına yönelik" : ""}
    ${platform === "instagram" ? "Görsel odaklı" : ""}
    ${platform === "twitter" ? "Thread ve etkileşim odaklı" : ""}
    
    Önerileri maddeler halinde ver, başka açıklama ekleme.
  `;

  const response = await generateText(prompt);
  return response
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter((line) => line.length > 10)
    .slice(0, 5);
}

/**
 * LinkedIn için özel olarak daha özlü içerik oluşturur
 * @param contentType İçerik türü (post, article vb.)
 * @param audience Hedef kitle
 * @param description İçerik açıklaması
 * @param language İçerik dili (tr, en, de, vb.)
 * @returns LinkedIn için optimize edilmiş içerik
 */
export async function generateLinkedInOptimizedContent(
  contentType: string,
  audience: string,
  description: string,
  language: string = "tr"
): Promise<string> {
  const prompt = `
    LinkedIn platformu için "${description}" konusunda profesyonel bir içerik oluştur.
    İçerik Türü: ${contentType}
    Hedef Kitle: ${audience}
    İçerik Dili: ${getLanguageName(language)}

    ÇOK ÖNEMLİ TALİMATLAR:
    1. Maksimum 1300 karakter kullan (URL'ler, boşluklar ve emojiler dahil)
    2. İçeriği birkaç paragraf halinde yapılandır, her bir paragraf kısa olsun
    3. Profesyonel bir dil ve ton kullan, burada hedef kitle: ${audience}
    4. Eğer bir URL veya link eklenecekse, sadece bir tane ekle ve parantez içinde göster
    5. İçeriği doğrudan giriş yap, "Merhaba LinkedIn bağlantılarım" gibi gereksiz ifadelerden kaçın
    6. Sonunda tavsiye sorusu ekle (Ne düşünüyorsunuz? gibi)
    
    Yanıtı doğrudan içerik olarak ver, ekstra açıklama ekleme.
  `;

  return generateText(prompt);
}
