// Gemini API ile görsel içerik oluşturma için yardımcı fonksiyonlar
import { GoogleGenAI } from "@google/genai";

// Platform ve içerik türüne göre format detayları
function getFormatDetails(platform: string, contentType: string): string {
  if (platform === "instagram") {
    if (contentType === "story") {
      return "Dikey formatta (9:16 oranında), Instagram hikayesi için uygun olmalı.";
    } else if (contentType === "carousel") {
      return "Kare formatta (1:1 oranında), Instagram carousel için her görselin aynı temada ama farklı açılardan olmalı.";
    } else {
      return "Kare formatta (1:1 oranında), Instagram gönderi formatına uygun olmalı.";
    }
  } else if (platform === "twitter") {
    return "16:9 oranında yatay formatta, Twitter gönderileri için optimize edilmiş.";
  } else if (platform === "linkedin") {
    return "2:1 oranında profesyonel görünümlü, LinkedIn görselleri için uygun, kurumsal tarzda.";
  } else if (platform === "facebook") {
    if (contentType === "event") {
      return "16:9 oranında yatay format, etkinlik duyurusuna uygun, çekici ve bilgilendirici.";
    } else if (contentType === "album") {
      return "4:3 oranında, albüm formatında birbiriyle ilişkili görseller.";
    } else {
      return "1200x630 piksel boyutunda, Facebook gönderileri için optimize edilmiş.";
    }
  } else if (platform === "tiktok") {
    return "9:16 dikey formatta, tam ekran TikTok videosu için kapak görseli olarak kullanılabilecek şekilde.";
  }
  return "Standart web görseli formatında, paylaşıma uygun boyutlarda.";
}

// Platform özelliklerine göre stil detayları
function getPlatformStyle(
  platform: string,
  contentType: string,
  industry: string = ""
): string {
  let style = "";

  // Platform bazlı stil
  switch (platform) {
    case "instagram":
      style = "modern, estetik ve çekici";
      break;
    case "twitter":
      style = "net, öz ve dikkat çekici";
      break;
    case "linkedin":
      style = "profesyonel, kurumsal ve güven verici";
      break;
    case "facebook":
      style = "samimi, ulaşılabilir ve etkileşimi teşvik eden";
      break;
    case "tiktok":
      style = "canlı, enerjik ve dinamik";
      break;
    default:
      style = "profesyonel ve çekici";
  }

  // İçerik türüne göre stil eklentileri
  if (contentType === "story" || contentType === "guide") {
    style += ", hikaye anlatımını destekleyen";
  } else if (contentType === "article" || contentType === "document") {
    style += ", bilgilendirici ve detaylı";
  }

  // Sektöre göre stil eklentileri
  if (industry === "tech") {
    style += ", teknolojik ve yenilikçi";
  } else if (industry === "finance") {
    style += ", güven verici ve profesyonel";
  } else if (industry === "healthcare") {
    style += ", sağlıklı ve güven verici";
  } else if (industry === "fashion") {
    style += ", modaya uygun ve trend";
  }

  return style;
}

// Metin filtreleme fonksiyonu - görseldeki yazı riskini azaltmak için
function filterTextRelatedWords(description: string): string {
  // Yazı ile ilgili kelimeleri filtrele
  const textRelatedTerms = [
    "yazı",
    "metin",
    "text",
    "slogan",
    "başlık",
    "alt yazı",
    "caption",
    "logo",
    "marka adı",
    "yazılı",
    "imza",
    "kelime",
    "harf",
    "numara",
    "rakam",
    "sayı",
    "font",
    "tipografi",
    "başlık",
    "etiket",
    "label",
    "yazıt",
    "imza",
    "kitabe",
    "altyazı",
    "üstyazı",
    "dergi",
    "afiş",
    "kitap",
    "reklam",
    "banner",
    "tabela",
    "poster",
    "yazım",
    "kaligraf",
    "işaret",
  ];

  let filteredDesc = description;

  for (const term of textRelatedTerms) {
    // Kelimeleri basit bir şekilde temizle
    const regex = new RegExp(`\\b${term}\\b`, "gi");
    filteredDesc = filteredDesc.replace(regex, "");
  }

  return filteredDesc.trim();
}

/**
 * Sosyal medya görseli oluşturur
 * @param platform Sosyal medya platformu (instagram, twitter, linkedin, vb.)
 * @param contentType İçerik türü (post, story)
 * @param description İçerik açıklaması
 * @param industry Sektör bilgisi
 * @returns Base64 formatında görsel
 */
export async function generateSocialMediaImage(
  platform: string,
  contentType: string,
  description: string,
  industry: string = ""
): Promise<string> {
  console.log(
    `Görsel oluşturma başladı - Platform: ${platform}, İçerik: ${contentType}, Sektör: ${industry}`
  );

  // Platform ve içerik türüne göre detayları belirle
  const platformStyle = getPlatformStyle(platform, contentType, industry);
  const formatDetails = getFormatDetails(platform, contentType);

  // Yazı içermemesi için metni filtrele
  const filteredDescription = filterTextRelatedWords(description);

  // Platforma uygun görsel prompt'u oluştur
  const prompt = `
    Benim için ${filteredDescription} hakkında ${platformStyle} tarzında, profesyonel ve yüksek kaliteli bir sosyal medya görseli oluştur. 

    ${formatDetails}

    ÇOK ÖNEMLİ KURALLAR:
    1. Görselde KESİNLİKLE HİÇBİR METİN, YAZI, TEXT, LOGO, HARF veya SAYI OLMAMALIDIR. Bu hayati önem taşır!
    2. YAZILMIŞ hiçbir kelime, harf, rakam veya sembol içermemelidir - tamamen yazısız olmalı.
    3. Sadece görsel öğeler (fotoğraf, çizim, şekil, doku, vb.) kullanılmalıdır.
    4. Marka logoları, yazılı işaretler veya metin olarak algılanabilecek hiçbir öğe yer almamalıdır.
    5. Kitap, dergi, tabela, poster gibi normalde yazı içeren öğeler varsa, bulanıklaştırılmalı veya yazılar tamamen kaldırılmalıdır.
    6. Görselde harflere veya yazıya benzeyen hiçbir sembol veya şekil bulunmamalıdır.
    7. Klavye, klavye tuşları, ekran görüntüleri veya yazılı her türlü öğeyi içermemelidir.
    8. İmza, damga, mühür, barkod veya QR kod olmamalıdır.
    9. Elle yazılmış notlar, dövmeler veya yazı ile ilgili desenler içermemelidir.
    10. Haritaların üzerindeki yer isimleri veya yön işaretleri gibi içerikler görünmemelidir.

    Görsel net, çekici ve konuyu iyi temsil etmeli.
    Dikkat çekici, estetik ve paylaşılabilir olmalı.
    Lütfen fotoğrafik kalitede, gerçekçi ve profesyonel bir görsel oluştur.
  `;

  try {
    const result = await generateImage(prompt);
    console.log(
      `Görsel oluşturma tamamlandı: ${
        result.startsWith("data:")
          ? "Görsel başarıyla üretildi"
          : "Görsel üretilemedi"
      }`
    );
    return result;
  } catch (error) {
    console.error("Görsel oluşturma hatası:", error);
    return "/file.svg";
  }
}

/**
 * Gemini API ile görsel içerik oluşturur
 * @param prompt Görsel oluşturma için prompt
 * @returns Base64 formatında görsel
 */
export async function generateImage(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("API anahtarı bulunamadı.");
      return "/file.svg";
    }

    console.log("Gemini API isteği gönderiliyor...");
    const genAI = new GoogleGenAI({ apiKey });

    try {
      // Örnek koddan alınan yeni istek formatı
      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-exp-image-generation",
        contents: prompt,
        config: {
          responseModalities: ["Text", "Image"],
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });

      console.log(
        "Gemini API yanıtı alındı",
        response && response.candidates ? "başarılı" : "boş yanıt"
      );

      if (
        response &&
        response.candidates &&
        response.candidates.length > 0 &&
        response.candidates[0].content &&
        response.candidates[0].content.parts
      ) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const imageData = part.inlineData.data;
            console.log("Görsel verisi başarıyla alındı");
            return `data:${part.inlineData.mimeType};base64,${imageData}`;
          }
        }
      }

      console.warn("API yanıtında görsel bulunamadı.");
      return "/file.svg";
    } catch (apiError: unknown) {
      const error = apiError as Error;
      console.error("Gemini API hatası:", error.message || error);
      return "/file.svg";
    }
  } catch (error) {
    console.error("Gemini görsel oluşturma hatası:", error);
    return "/file.svg";
  }
}
