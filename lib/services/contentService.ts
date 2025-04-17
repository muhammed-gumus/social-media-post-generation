/**
 * Content Generation Service
 * Centralized service for handling content generation requests
 */

import {
  generateSocialMediaText,
  generateSocialMediaTitle,
  generateSocialMediaHashtags,
  generateContentSuggestions,
} from "@/lib/gemini";
import { generateSocialMediaImage } from "@/lib/imagen";

// Gelişmiş API istek sırası ve hız sınırlaması yönetimi
const apiRequestManager = {
  // Temel ayarlar
  textRequestQueue: [] as Array<() => Promise<unknown>>,
  lastTextRequestTime: 0,
  minTimeBetweenTextRequests: 1500, // 1.5 saniye
  requestsInProgress: 0,
  maxConcurrentRequests: 2, // Aynı anda en fazla 2 istek yapabilir
  isProcessingQueue: false,

  // Sıraya istek ekle
  enqueue: async function <T>(
    requestFn: () => Promise<T>,
    priority = false
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const queuedRequest = async () => {
        try {
          await this.delayIfNeeded();
          this.requestsInProgress++;
          console.log("API isteği başlatılıyor...");
          const result = await requestFn();
          console.log(
            "API isteği tamamlandı:",
            result ? "Başarılı" : "Başarısız"
          );
          this.lastTextRequestTime = Date.now();
          resolve(result);
          return result;
        } catch (error) {
          console.error("API isteği sırasında hata oluştu:", error);
          reject(error);
          throw error;
        } finally {
          this.requestsInProgress--;
        }
      };

      // Öncelikli istekleri sıranın başına, diğerlerini sonuna ekle
      if (priority) {
        this.textRequestQueue.unshift(queuedRequest);
      } else {
        this.textRequestQueue.push(queuedRequest);
      }

      // İşlem zaten çalışmıyorsa, sıra işlemeyi başlat
      if (!this.isProcessingQueue) {
        this.processQueue();
      }
    });
  },

  // Sıradaki istekleri işle
  processQueue: async function () {
    if (this.textRequestQueue.length === 0) {
      this.isProcessingQueue = false;
      return;
    }

    this.isProcessingQueue = true;

    // Aynı anda işlenebilecek istek sayısını kontrol et
    while (
      this.textRequestQueue.length > 0 &&
      this.requestsInProgress < this.maxConcurrentRequests
    ) {
      const request = this.textRequestQueue.shift();
      if (request) {
        // İsteği async olarak başlat ama bekleme
        request().catch((error) => {
          console.error("İstek işleme hatası:", error);
        });
      }
    }

    // Eğer hala sırada istek varsa, durum kontrolü için bekle ve tekrar kontrol et
    if (this.textRequestQueue.length > 0) {
      setTimeout(() => this.processQueue(), 500);
    } else if (this.requestsInProgress === 0) {
      this.isProcessingQueue = false;
    } else {
      // Hala işlemde istek varsa, onlar bitince tekrar kontrol et
      setTimeout(() => this.processQueue(), 1000);
    }
  },

  // API isteği yapmadan önce gecikme ekle
  delayIfNeeded: async function (): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastTextRequestTime;

    if (timeSinceLastRequest < this.minTimeBetweenTextRequests) {
      const delayTime = this.minTimeBetweenTextRequests - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delayTime));
    }
  },
};

// Define the content generation parameters interface
export interface ContentGenerationParams {
  platform: string;
  contentType: string;
  audience: string;
  audienceCategory: string;
  tone: string;
  description: string;
  keywords?: string;
  purpose?: string;
  industry?: string;
  contentLength?: string;
  targetAgeRange?: string;
  targetGender?: string;
  targetLocation?: string;
  imageRequired?: boolean;
  instagramFilter?: string;
  twitterCharLimit?: string;
  facebookPrivacy?: string;
  language?: string;
  templateId?: string;
  templatePrompt?: string;
  templateFields?: Record<string, string>;
  uploadedImage?: string | null; // Kullanıcının yüklediği görsel
}

// Define the content result interface
export interface ContentResult {
  title: string;
  text: string;
  imageUrl: string;
  hashtags: string[];
  suggestions: string[];
  profileInfo?: {
    username: string;
    photoUrl: string;
  };
  metaData?: {
    targetAgeRange?: string;
    targetGender?: string;
    targetLocation?: string;
    industry?: string;
    purpose?: string;
    contentLength?: string;
    audienceCategory?: string;
    language?: string;
    templateId?: string;
    platformSpecificSettings?: {
      filter?: string;
      charLimit?: string;
      privacy?: string;
      [key: string]: string | undefined;
    };
  };
}

/**
 * Generate content based on provided parameters
 */
export async function generateContent(
  params: ContentGenerationParams,
  progressCallback?: (status: string, progress: number) => void
): Promise<ContentResult> {
  const {
    platform,
    contentType,
    audience,
    audienceCategory,
    description,
    purpose = "engagement",
    industry = "",
    contentLength = "medium",
    targetAgeRange = "",
    targetGender = "all",
    targetLocation = "",
    imageRequired = true,
    instagramFilter = "",
    twitterCharLimit = "280",
    facebookPrivacy = "public",
    language = "tr",
    templateId = "",
    uploadedImage = null, // Kullanıcının yüklediği görsel
  } = params;

  try {
    console.log("İçerik oluşturma başladı - Parametreler:", {
      platform,
      contentType,
      audience,
      description: description.substring(0, 30) + "...",
      language,
    });

    // API anahtarını kontrol et
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    console.log("API anahtarı mevcut:", apiKey ? "Evet" : "Hayır");

    if (!apiKey) {
      throw new Error("API anahtarı bulunamadı. İçerik oluşturulamıyor.");
    }

    // Step 1: Generate text content - İstekleri sıralı şekilde yaparak aşırı yüklemeyi önlüyoruz
    if (progressCallback) progressCallback("AI modeli hazırlanıyor...", 15);
    await new Promise((resolve) => setTimeout(resolve, 800)); // UI güncellemesi için bekle

    if (progressCallback) progressCallback("İçerik analiz ediliyor...", 25);
    await new Promise((resolve) => setTimeout(resolve, 800)); // UI güncellemesi için bekle

    if (progressCallback) progressCallback("Metin içeriği üretiliyor...", 35);

    // İstekleri paralel olarak başlat fakat düzgün sıraya koyarak
    console.log("Metin içeriği oluşturma isteği başlatılıyor...");
    const textPromise = apiRequestManager.enqueue(() =>
      generateSocialMediaText(
        platform,
        contentType,
        audience,
        description,
        language
      )
    );

    console.log("Başlık oluşturma isteği başlatılıyor...");
    const titlePromise = apiRequestManager.enqueue(() =>
      generateSocialMediaTitle(platform, contentType, description)
    );

    console.log("Hashtag oluşturma isteği başlatılıyor...");
    const hashtagsPromise = apiRequestManager.enqueue(() =>
      generateSocialMediaHashtags(platform, description)
    );

    console.log("İçerik önerileri isteği başlatılıyor...");
    const suggestionsPromise = apiRequestManager.enqueue(() =>
      generateContentSuggestions(platform)
    );

    // İsteklerin sonuçlarını bekle ve hataları yönet
    let text;
    try {
      text = await textPromise;
      console.log(
        "Metin içeriği başarıyla oluşturuldu:",
        text ? "Başarılı" : "Başarısız"
      );
      if (progressCallback) progressCallback("İçerik oluşturuluyor...", 45);
    } catch (error) {
      console.error("Metin oluşturma hatası:", error);
      text = "İçerik oluşturulamadı. Lütfen tekrar deneyin.";
    }

    let title;
    try {
      title = await titlePromise;
      console.log("Başlık başarıyla oluşturuldu:", title);
      if (progressCallback) progressCallback("Başlık oluşturuluyor...", 55);
    } catch (error) {
      console.error("Başlık oluşturma hatası:", error);
      title = "Oluşturulan İçerik";
    }

    let hashtags;
    try {
      hashtags = await hashtagsPromise;
      console.log("Hashtag'ler başarıyla oluşturuldu:", hashtags);
      if (progressCallback)
        progressCallback("Hashtag'ler oluşturuluyor...", 65);
    } catch (error) {
      console.error("Hashtag oluşturma hatası:", error);
      hashtags = ["#içerik", "#sosyalmedya"];
    }

    let suggestions;
    try {
      suggestions = await suggestionsPromise;
      console.log("Öneriler başarıyla oluşturuldu:", suggestions);
      if (progressCallback) progressCallback("Öneriler hazırlanıyor...", 75);
    } catch (error) {
      console.error("Öneri oluşturma hatası:", error);
      suggestions = [
        "İçeriğinizi düzenli olarak paylaşın",
        "Hedef kitlenizle etkileşime geçin",
      ];
    }

    // Step 2: Handle platform-specific settings
    const platformSpecificSettings = {
      ...(platform === "instagram" && instagramFilter
        ? { filter: instagramFilter }
        : {}),
      ...(platform === "twitter" ? { charLimit: twitterCharLimit } : {}),
      ...(platform === "facebook" ? { privacy: facebookPrivacy } : {}),
    };

    // Step 3: Handle image - Use uploaded image if available, otherwise generate
    let imageUrl = "/file.svg";

    // Eğer kullanıcı bir görsel yüklediyse, doğrudan o görseli kullan
    if (uploadedImage) {
      imageUrl = uploadedImage;
      console.log("Kullanıcının yüklediği görsel kullanılıyor");
      if (progressCallback)
        progressCallback("Yüklenen görsel kullanılıyor...", 85);
    }
    // Aksi takdirde AI ile görsel oluştur
    else if (imageRequired) {
      if (progressCallback) progressCallback("Görsel üretiliyor...", 85);
      try {
        console.log("Görsel oluşturma isteği başlatılıyor...");
        // Görsel isteğini kuyruğa ekle ve ön sıraya al (forceGeneration=true)
        imageUrl = await generateSocialMediaImage(
          platform,
          contentType,
          description,
          industry,
          true // Force generation - ilk içerik üretiminde rate limit olsa bile atlayıp görsel oluştur
        );
        console.log("Görsel URL:", imageUrl);

        // Hala varsayılan görsel dönerse, bir kez daha deneme yap
        if (imageUrl === "/file.svg") {
          console.warn(
            "İlk görsel denemesi başarısız oldu, tekrar deneniyor..."
          );
          if (progressCallback)
            progressCallback("Görsel oluşturulamadı, tekrar deneniyor...", 85);

          // Kısa bir beklemeden sonra tekrar dene
          await new Promise((resolve) => setTimeout(resolve, 1000));

          imageUrl = await generateSocialMediaImage(
            platform,
            contentType,
            description,
            industry,
            true // İkinci denemede de force generation kullan
          );

          // Yine başarısız olursa kullanıcıyı bilgilendir
          if (imageUrl === "/file.svg") {
            console.warn(
              "Görsel oluşturulamadı veya rate limit aşıldı, varsayılan ikon kullanılacak."
            );
            if (progressCallback)
              progressCallback(
                "Görsel oluşturulamadı, varsayılan ikon kullanılacak",
                85
              );
          }
        }
      } catch (imageError) {
        console.error("Görsel oluşturma sırasında hata:", imageError);
        if (progressCallback)
          progressCallback("Görsel üretilemiyor - API hatası", 85);
      }
    }

    if (progressCallback) progressCallback("Son düzenlemeler yapılıyor...", 95);
    await new Promise((resolve) => setTimeout(resolve, 800)); // UI güncellemesi için bekle

    // Step 4: Create the complete result object
    const metaData = {
      targetAgeRange: targetAgeRange || undefined,
      targetGender: targetGender !== "all" ? targetGender : undefined,
      targetLocation: targetLocation || undefined,
      industry,
      purpose,
      contentLength,
      audienceCategory,
      language,
      templateId: templateId || undefined,
      platformSpecificSettings:
        Object.keys(platformSpecificSettings).length > 0
          ? platformSpecificSettings
          : undefined,
    };

    // Final progress update
    if (progressCallback) progressCallback("İçerik hazır!", 100);

    console.log("İçerik oluşturma tamamlandı!");

    // Return the final content result
    return {
      title,
      text,
      imageUrl,
      hashtags,
      suggestions,
      metaData,
    };
  } catch (error) {
    console.error("İçerik oluşturma hatası (en üst seviye):", error);
    throw new Error(
      "İçerik üretimi sırasında bir hata oluştu. Lütfen tekrar deneyin."
    );
  }
}

/**
 * Save generated content to localStorage for persistence
 */
export function saveContentResult(content: ContentResult): void {
  try {
    console.log("İçerik sonuçları localStorage'a kaydediliyor");
    localStorage.setItem("contentResult", JSON.stringify(content));
  } catch (error) {
    console.error("İçerik kaydetme hatası:", error);
  }
}

/**
 * Get stored content result from localStorage
 */
export function getStoredContentResult(): ContentResult | null {
  try {
    const stored = localStorage.getItem("contentResult");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Kayıtlı içerik alınırken hata:", error);
    return null;
  }
}
