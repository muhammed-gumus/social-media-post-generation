import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Yardımcı fonksiyonlar

/**
 * Platform kimliğinden platform adını döndürür
 * @param id Platform kimliği
 */
export function getPlatformName(platform: string): string {
  switch (platform) {
    case "twitter":
      return "X (Twitter)";
    case "instagram":
      return "Instagram";
    case "linkedin":
      return "LinkedIn";
    case "facebook":
      return "Facebook";
    case "tiktok":
      return "TikTok";
    default:
      return platform;
  }
}

/**
 * İçerik türü kimliğinden içerik türü adını döndürür
 * @param id İçerik türü kimliği
 */
export function getContentTypeName(contentType: string): string {
  switch (contentType) {
    case "post":
      return "Gönderi";
    case "story":
      return "Hikaye";
    case "thread":
      return "Thread (Flood)";
    case "article":
      return "Makale";
    case "guide":
      return "Rehber";
    case "event":
      return "Etkinlik";
    case "series":
      return "Seri İçerik";
    case "newsletter":
      return "Bülten";
    case "textOnly":
      return "Sadece Metin";
    case "longPost":
      return "Uzun Gönderi";
    default:
      return contentType;
  }
}

/**
 * Hedef kitle kimliğinden kitle adını döndürür
 * @param id Hedef kitle kimliği
 */
export function getAudienceName(id: string): string {
  const audiences: Record<string, string> = {
    // Demografi
    general: "Genel",
    youth: "Gençler",
    adults: "Yetişkinler",
    seniors: "45+ Yaş",

    // Profesyonel
    professionals: "Profesyoneller",
    executives: "Yöneticiler",
    entrepreneurs: "Girişimciler",
    jobSeekers: "İş Arayanlar",

    // İlgi Alanı
    tech: "Teknoloji Meraklıları",
    fashion: "Moda Takipçileri",
    health: "Sağlık Odaklı",
    finance: "Finans Odaklı",
  };
  return audiences[id] || id;
}

/**
 * İçerik tonu kimliğinden ton adını döndürür
 * @param id İçerik tonu kimliği
 */
export function getToneName(id: string): string {
  const tones: Record<string, string> = {
    informative: "Bilgilendirici",
    professional: "Profesyonel",
    friendly: "Samimi",
    humorous: "Esprili",
    inspirational: "İlham Verici",
  };
  return tones[id] || id;
}

/**
 * Gemini ve Imagen için prompt oluşturur
 * @param platform Sosyal medya platformu
 * @param contentType İçerik türü
 * @param audience Hedef kitle
 * @param description İçerik açıklaması
 * @param tone İçerik tonu
 * @param keywords Anahtar kelimeler
 */
export function buildPrompt(
  platform: string,
  contentType: string,
  audience: string,
  description: string,
  tone: string = "informative",
  keywords: string = ""
): string {
  return `
    Aşağıdaki parametrelere göre bir sosyal medya içeriği hazırla:
    
    - Platform: ${platform}
    - İçerik Türü: ${contentType}
    - Hedef Kitle: ${audience}
    - Ton: ${tone}
    - Konu: ${description}
    ${keywords ? `- Anahtar Kelimeler: ${keywords}` : ""}

    ${platformSpecificInstructions(platform, contentType)}
    ${contentTypeInstructions(platform, contentType)}
    ${toneInstructions(tone)}
    ${audienceInstructions(audience)}
  `;
}

/**
 * Platform özelinde talimatlar
 */
function platformSpecificInstructions(
  platform: string,
  contentType: string
): string {
  switch (platform) {
    case "instagram":
      if (contentType === "guide") {
        return "Instagram rehber formatında, adım adım anlatımlı, açık ve anlaşılır bir içerik hazırla.";
      }
      return "Instagram için görsel odaklı ve çekici bir içerik hazırla. Hashtag kullanımına özen göster.";

    case "twitter":
      if (contentType === "thread") {
        return "Twitter için bir thread hazırla. Her tweet'i 1/X formatında numaralandır. Tweet'ler 280 karakteri geçmemeli ve konu akıcı şekilde ilerlemeli. Son tweet'te özet veya çağrı olmalı.";
      } else if (contentType === "textOnly") {
        return "Twitter için yalnızca metinden oluşan, görselsiz bir içerik hazırla. 280 karakter sınırını aşma.";
      }
      return "Twitter için kısa, öz ve dikkat çekici bir içerik hazırla. 280 karakter sınırını göz önünde bulundur.";

    case "linkedin":
      if (contentType === "article") {
        return "LinkedIn için derinlemesine, profesyonel ve bilgi dolu bir makale hazırla. Alt başlıklar kullan, önemli noktaları vurgula.";
      } else if (contentType === "newsletter") {
        return "LinkedIn Newsletter için bülten formatında, okunması kolay bölümlere ayrılmış bir içerik hazırla. Profesyonel ton kullan.";
      }
      return "LinkedIn için profesyonel bir tonda, endüstri bilgisi içeren bir içerik hazırla.";

    case "facebook":
      if (contentType === "longPost") {
        return "Facebook için daha uzun bir içerik oluştur, bilgilendirici ama dikkat çekici olmalı. Başlıkları ve paragrafları düzenli kullan.";
      } else if (contentType === "event") {
        return "Facebook için bir etkinlik tanıtımı içeriği oluştur. Etkinliğin zamanı, yeri ve detayları net olarak vurgulanmalı.";
      }
      return "Facebook için etkileşim alabilecek, samimi tonda bir içerik hazırla.";

    case "tiktok":
      if (contentType === "series") {
        return "TikTok için bir seri içerik planı hazırla. Her bölüm kısa ve öz olmalı, konuyu parçalara böl.";
      }
      return "TikTok için kısa, dinamik ve ilgi çekici bir içerik hazırla.";

    default:
      return "Platform özelliklerine uygun, hedef kitleye yönelik içerik oluştur.";
  }
}

/**
 * İçerik türüne göre talimatlar
 */
function contentTypeInstructions(
  platform: string,
  contentType: string
): string {
  switch (contentType) {
    case "thread":
      return "Her tweet'i numaralandır (1/X formatı). Konuyu mantıksal bir sırayla anlat. Son tweet'te özet veya çağrı ekle.";
    case "article":
      return "Giriş, gelişme ve sonuç bölümlerini belirgin yap. Alt başlıklar kullan. Önemli noktaları vurgula.";
    case "guide":
      return "Adım adım talimatlar ver. Her bölümü numaralandır. Pratik öneriler ve örnekler ekle.";
    case "event":
      return "Etkinlik detaylarını (tarih, saat, yer) belirgin şekilde belirt. Katılım şartlarını ve programı açıkça anlat.";
    case "series":
      return "İçeriği mantıklı bölümlere ayır. Her bölümün ana mesajını belirle. Bölümler arası geçişi sağla.";
    default:
      return "İçeriği hedef kitleye uygun formatta yapılandır. Ana mesajı net ifade et.";
  }
}

/**
 * İçerik tonuna göre talimatlar
 */
function toneInstructions(tone: string): string {
  switch (tone) {
    case "informative":
      return "Bilgilendirici bir ton kullan. Konuyla ilgili gerçekleri ve bilgileri paylaş, eğitici ol.";
    case "professional":
      return "Profesyonel ve resmi bir ton kullan. İş diline uygun, saygılı ve net ifadeler seç.";
    case "friendly":
      return "Samimi ve arkadaşça bir ton kullan. Okuyucuyla doğrudan konuşur gibi, içten bir dil kullan.";
    case "humorous":
      return "Esprili ve mizahi bir ton kullan. Hafif, eğlenceli ve konu ile ilgili şakalar içermeli.";
    case "inspirational":
      return "İlham verici bir ton kullan. Motive edici, cesaretlendirici ve pozitif bir dil seç.";
    default:
      return "Hedef kitleye uygun, dengeli bir ton kullan.";
  }
}

/**
 * Hedef kitleye göre talimatlar
 */
function audienceInstructions(audience: string): string {
  switch (audience) {
    case "general":
      return "Geniş bir kitleye hitap eden, anlaşılır bir dil kullan.";
    case "youth":
      return "Gençlere hitap eden, güncel dil ve trendleri içeren bir ton kullan.";
    case "adults":
      return "25-45 yaş arası yetişkinlere hitap eden, dengeli ve olgun bir dil kullan.";
    case "seniors":
      return "45+ yaş grubuna hitap eden, saygılı ve açık bir dil kullan. Teknik jargondan kaçın.";
    case "professionals":
      return "Profesyonellere hitap eden, teknik bilgi ve sektör terminolojisi içerebilir.";
    case "executives":
      return "Yöneticilere hitap eden, stratejik düşünce, liderlik ve iş sonuçlarına odaklanan bir dil kullan.";
    case "entrepreneurs":
      return "Girişimcilere hitap eden, yenilikçi, risk ve fırsat odaklı bir dil kullan.";
    case "tech":
      return "Teknoloji meraklılarına hitap eden, teknolojik terimlere aşina bir kitle için hazırla.";
    case "fashion":
      return "Moda takipçilerine hitap eden, trend ve stil odaklı bir dil kullan.";
    case "health":
      return "Sağlık bilinci yüksek kişilere hitap eden, wellness ve sağlıklı yaşam odaklı bir dil kullan.";
    case "finance":
      return "Finans odaklı kişilere hitap eden, yatırım, tasarruf ve finansal kavramları içeren bir dil kullan.";
    default:
      return "Hedef kitlenin ilgi alanlarına göre dikkat çekici bir içerik hazırla.";
  }
}

/**
 * Sosyal medya platformları için paylaşım URL'lerini oluşturur
 * @param platform - Sosyal medya platformu
 * @param text - Paylaşılacak metin
 * @param title - İçerik başlığı (varsa)
 * @param imageUrl - Görsel URL'i (varsa)
 * @returns - Paylaşım URL'i
 */
export function getSharingUrl(
  platform: string,
  text: string,
  title?: string,
  imageUrl?: string
): string {
  // Metin içeriğini kısalt (LinkedIn için özellikle gerekli)
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  };

  // Platform özelinde metin kısaltma
  const getEncodedText = (platform: string, text: string): string => {
    switch (platform) {
      case "linkedin":
        return encodeURIComponent(truncateText(text, 250));
      case "twitter":
        return encodeURIComponent(truncateText(text, 280));
      default:
        return encodeURIComponent(text);
    }
  };

  const encodedText = getEncodedText(platform, text);
  const encodedTitle = title
    ? encodeURIComponent(truncateText(title, 100))
    : "";
  const encodedImageUrl =
    imageUrl && imageUrl !== "/file.svg" ? encodeURIComponent(imageUrl) : "";
  const dummyUrl = encodeURIComponent("https://example.com/content");

  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${encodedText}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}&quote=${encodedText}`;
    case "linkedin":
      // LinkedIn paylaşım URL'si için daha kısa veriler kullan
      return `https://www.linkedin.com/sharing/share-offsite/?url=${dummyUrl}&title=${encodedTitle}`;
    case "instagram":
      // Instagram doğrudan paylaşım linkini desteklemez, kullanıcıya bir bilgi verilecek
      return "";
    default:
      return "";
  }
}
