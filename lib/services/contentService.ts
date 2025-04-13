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
  } = params;

  try {
    // Step 1: Generate all text content in parallel
    if (progressCallback) progressCallback("AI modeli hazırlanıyor...", 35);

    const textPromises = [
      generateSocialMediaText(
        platform,
        contentType,
        audience,
        description,
        language
      ),
      generateSocialMediaTitle(platform, contentType, description),
      generateSocialMediaHashtags(platform, description),
      generateContentSuggestions(platform),
    ];

    if (progressCallback) progressCallback("Metin içeriği üretiliyor...", 45);
    const textResults = await Promise.allSettled(textPromises);

    const text =
      textResults[0].status === "fulfilled"
        ? (textResults[0].value as string)
        : "İçerik oluşturulamadı. Lütfen tekrar deneyin.";

    const title =
      textResults[1].status === "fulfilled"
        ? (textResults[1].value as string)
        : "Oluşturulan İçerik";

    const hashtags =
      textResults[2].status === "fulfilled"
        ? (textResults[2].value as string[])
        : ["#içerik", "#sosyalmedya"];

    const suggestions =
      textResults[3].status === "fulfilled"
        ? (textResults[3].value as string[])
        : [
            "İçeriğinizi düzenli olarak paylaşın",
            "Hedef kitlenizle etkileşime geçin",
          ];

    if (progressCallback) progressCallback("İçerik optimize ediliyor...", 60);

    // Step 2: Handle platform-specific settings
    const platformSpecificSettings = {
      ...(platform === "instagram" && instagramFilter
        ? { filter: instagramFilter }
        : {}),
      ...(platform === "twitter" ? { charLimit: twitterCharLimit } : {}),
      ...(platform === "facebook" ? { privacy: facebookPrivacy } : {}),
    };

    // Step 3: Generate image if required
    let imageUrl = "/file.svg";

    if (imageRequired) {
      if (progressCallback) progressCallback("Görsel üretiliyor...", 80);

      try {
        imageUrl = await generateSocialMediaImage(
          platform,
          contentType,
          description,
          industry // Pass industry information to image generation
        );
        if (imageUrl === "/file.svg") {
          console.warn("Görsel oluşturulamadı, varsayılan ikon kullanılacak.");
        }
      } catch (imageError) {
        console.error("Görsel oluşturma sırasında hata:", imageError);
      }
    }

    if (progressCallback) progressCallback("Son düzenlemeler yapılıyor...", 90);

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
      platformSpecificSettings:
        Object.keys(platformSpecificSettings).length > 0
          ? platformSpecificSettings
          : undefined,
    };

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
    console.error("Content generation error:", error);
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
    localStorage.setItem("contentResult", JSON.stringify(content));
  } catch (error) {
    console.error("Content saving error:", error);
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
    console.error("Error retrieving stored content:", error);
    return null;
  }
}
