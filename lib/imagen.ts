// Gelişmiş yapay zeka görsel üretim API'si için yardımcı fonksiyonlar
import { GoogleGenAI } from "@google/genai";

// API isteği için hız sınırlaması kontrolü
const imageGenerationRateLimits = {
  lastRequestTime: 0,
  minTimeBetweenRequests: 3000, // 3 saniye minimum bekleme süresi (daha dengeli bir süre)
  isRateLimited: false,
  retryDelay: 0,
  maxRetries: 3, // Daha fazla yeniden deneme imkanı
  currentRetries: 0,
  firstRequest: true, // İlk istek kontrolü için
  pendingRequests: 0, // Bekleyen isteklerin sayısını takip etmek için
  maxPendingRequests: 2, // Aynı anda en fazla bekleyen istek sayısı
};

// Görsel isteklerini yönetmek için yeni queue sistemi
const imageRequestQueue = {
  queue: [] as Array<{
    requestFn: () => Promise<string>;
    resolve: (value: string) => void;
    reject: (reason: Error | unknown) => void;
    priority: boolean;
  }>,
  isProcessing: false,

  // Sıraya istek ekle
  enqueue: async function (
    requestFn: () => Promise<string>,
    priority = false
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      // Eğer sırada çok fazla istek varsa ve öncelikli değilse varsayılan döndür
      if (
        !priority &&
        this.queue.length >= imageGenerationRateLimits.maxPendingRequests
      ) {
        console.log(
          "Görsel kuyruğunda çok fazla istek var, varsayılan görsel kullanılacak"
        );
        return resolve("/file.svg");
      }

      // İsteği kuyruğa ekle
      const queuedRequest = { requestFn, resolve, reject, priority };

      // Öncelikli istekleri sıranın başına, diğerlerini sonuna ekle
      if (priority) {
        this.queue.unshift(queuedRequest);
      } else {
        this.queue.push(queuedRequest);
      }

      // İşlem zaten çalışmıyorsa, sıra işlemeyi başlat
      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  },

  // Sıradaki istekleri işle
  processQueue: async function () {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const nextRequest = this.queue.shift();

    if (nextRequest) {
      try {
        // Rate limit kontrolü
        await this.enforceRateLimit();

        // İsteği işle
        const result = await nextRequest.requestFn();
        imageGenerationRateLimits.lastRequestTime = Date.now();
        nextRequest.resolve(result);
      } catch (error) {
        console.error("Görsel isteği işleme hatası:", error);
        nextRequest.reject(error);
      } finally {
        // Sıradaki isteği işle
        setTimeout(() => this.processQueue(), 500);
      }
    } else {
      this.isProcessing = false;
    }
  },

  // API istekleri arasında hız sınırlamasını uygula
  enforceRateLimit: async function (): Promise<void> {
    const now = Date.now();
    const elapsed = now - imageGenerationRateLimits.lastRequestTime;

    if (elapsed < imageGenerationRateLimits.minTimeBetweenRequests) {
      const delayTime =
        imageGenerationRateLimits.minTimeBetweenRequests - elapsed;
      console.log(`Görsel istekleri arasında ${delayTime}ms bekleniyor...`);
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }
  },
};

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
 * @param forceGeneration İçerik ilk üretildiğinde zorunlu görsel oluşturma için
 * @returns Base64 formatında görsel
 */
export async function generateSocialMediaImage(
  platform: string,
  contentType: string,
  description: string,
  industry: string = "",
  forceGeneration = false // İçerik ilk üretildiğinde zorunlu görsel oluşturma için
): Promise<string> {
  console.log(
    `Görsel oluşturma başladı - Platform: ${platform}, İçerik: ${contentType}, Sektör: ${industry}, Zorunlu oluştur: ${forceGeneration}`
  );

  // Görsel özellikleri hazırla
  const platformStyle = getPlatformStyle(platform, contentType, industry);
  const formatDetails = getFormatDetails(platform, contentType);
  const filteredDescription = filterTextRelatedWords(description);

  // Bu görsel üretimi için request fonksiyonunu oluştur
  const generateImageRequest = async (): Promise<string> => {
    // Rate limit durumu kontrolü - forceGeneration true ise yine de dene
    if (!forceGeneration && imageGenerationRateLimits.isRateLimited) {
      console.log(
        "Görsel API hız sınırlaması nedeniyle atlanıyor. Varsayılan görsel kullanılacak."
      );
      return "/file.svg";
    }

    // İstek zamanını güncelle ve ilk istek durumunu kaldır
    imageGenerationRateLimits.firstRequest = false;

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
      // Görsel üretme isteğini gönder
      const result = await generateImage(prompt);
      console.log(
        `Görsel oluşturma tamamlandı: ${
          result.startsWith("data:") ? "Başarılı" : "Başarısız"
        }`
      );

      // Görsel başarıyla oluşturuldu, retry sayısını sıfırla
      imageGenerationRateLimits.currentRetries = 0;

      return result;
    } catch (error) {
      // Hata durumunda retry sayısını artır
      imageGenerationRateLimits.currentRetries++;
      console.error(
        `Görsel oluşturma hatası (Deneme ${imageGenerationRateLimits.currentRetries}/${imageGenerationRateLimits.maxRetries}):`,
        error
      );

      // Eğer maksimum retry sayısına ulaşmadıysak ve forceGeneration true ise yeniden dene
      if (
        forceGeneration &&
        imageGenerationRateLimits.currentRetries <
          imageGenerationRateLimits.maxRetries
      ) {
        console.log("Yeniden görsel oluşturma denemesi yapılıyor...");
        return generateImageRequest(); // Rekursif olarak tekrar dene
      }

      return "/file.svg";
    }
  };

  // İsteği kuyruğa ekle ve işle
  return imageRequestQueue.enqueue(generateImageRequest, forceGeneration);
}

/**
 * Görsel içerik oluşturma API'si ile görsel üretir
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

    console.log("Görsel oluşturma API isteği gönderiliyor...");
    const genAI = new GoogleGenAI({ apiKey });

    try {
      // Görsel üretim modeline istek gönderme
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
        "API yanıtı alındı",
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
            // Rate limit durumunu sıfırla
            imageGenerationRateLimits.isRateLimited = false;
            imageGenerationRateLimits.retryDelay = 0;
            return `data:${part.inlineData.mimeType};base64,${imageData}`;
          }
        }
      }

      console.warn("API yanıtında görsel bulunamadı.");
      return "/file.svg";
    } catch (apiError: unknown) {
      const error = apiError as Error;
      console.error("API hatası:", error.message || error);

      // 429 hatası (rate limiting) için hız sınırlamasını aktifleştir
      const errorStr = String(error);
      if (errorStr.includes("429")) {
        // Hata mesajından bekleme süresini çıkarmaya çalış
        const retryMatch = errorStr.match(/retryDelay":"(\d+)s/);
        if (retryMatch && retryMatch[1]) {
          const retrySeconds = parseInt(retryMatch[1]);
          imageGenerationRateLimits.retryDelay = retrySeconds * 1000;
          imageGenerationRateLimits.isRateLimited = true;

          console.log(
            `Rate limit tespit edildi - ${retrySeconds} saniye bekleme gerekiyor`
          );

          // Belirli bir süre sonra rate limit durumunu otomatik olarak sıfırla
          setTimeout(() => {
            imageGenerationRateLimits.isRateLimited = false;
            console.log(
              "Rate limit süresi doldu, yeni isteklere izin veriliyor"
            );
          }, imageGenerationRateLimits.retryDelay + 1000); // Güvenli olması için 1 saniye ek süre
        } else {
          // Varsayılan bekleme süresi
          imageGenerationRateLimits.isRateLimited = true;
          imageGenerationRateLimits.retryDelay = 15000; // 15 saniye (daha makul süre)

          // 15 saniye sonra rate limit durumunu otomatik olarak sıfırla
          setTimeout(() => {
            imageGenerationRateLimits.isRateLimited = false;
            console.log(
              "Rate limit süresi doldu, yeni isteklere izin veriliyor"
            );
          }, 15000);
        }
      }

      throw error; // Hatayı yukarı fırlat, retry mekanizması yönetecek
    }
  } catch (error) {
    console.error("Görsel oluşturma hatası:", error);
    return "/file.svg";
  }
}
