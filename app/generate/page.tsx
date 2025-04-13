"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  generateContent,
  saveContentResult,
  ContentGenerationParams,
} from "@/lib/services/contentService";
import {
  getPlatformName,
  getContentTypeName,
  getAudienceName,
  getToneName,
} from "@/lib/utils";
import {
  trackEvent,
  trackContentGeneration,
  AnalyticsEventType,
} from "@/lib/services/analyticsService";
import {
  handleError,
  validateRequiredParams,
  AppError,
  ErrorType,
} from "@/lib/services/errorService";

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const platform = searchParams.get("platform") || "";
  const contentType = searchParams.get("contentType") || "";
  const audience = searchParams.get("audience") || "";
  const audienceCategory =
    searchParams.get("audienceCategory") || "demographic";
  const tone = searchParams.get("tone") || "informative";
  const description = searchParams.get("description") || "";
  const keywords = searchParams.get("keywords") || "";
  const imageRequired = searchParams.get("imageRequired") !== "false";
  const language = searchParams.get("language") || "tr";

  // Additional parameters
  const purpose = searchParams.get("purpose") || "engagement";
  const industry = searchParams.get("industry") || "";
  const contentLength = searchParams.get("contentLength") || "medium";
  const targetAgeRange = searchParams.get("targetAgeRange") || "";
  const targetGender = searchParams.get("targetGender") || "all";
  const targetLocation = searchParams.get("targetLocation") || "";

  // Platform specific parameters
  const instagramFilter = searchParams.get("instagramFilter") || "";
  const twitterCharLimit = searchParams.get("twitterCharLimit") || "280";
  const facebookPrivacy = searchParams.get("facebookPrivacy") || "public";

  // User profile information
  const username = searchParams.get("username") || "";
  const profilePhotoUrl = searchParams.get("profilePhotoUrl") || "";

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Hazırlanıyor...");
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Function to update status and progress
  const updateProgress = (statusMessage: string, progressValue: number) => {
    setStatus(statusMessage);
    setProgress(progressValue);
  };

  useEffect(() => {
    const statusMessages = [
      "Parametreler analiz ediliyor...",
      "İçerik stratejisi belirleniyor...",
      "Hedef kitle analizi yapılıyor...",
      "Sektör özelliklerine göre içerik hazırlanıyor...",
      "AI modeli hazırlanıyor...",
      "Metin içeriği üretiliyor...",
      "Görsel üretiliyor...",
      "İçerik optimize ediliyor...",
      "Platform özelliklerine göre düzenleniyor...",
      "Son düzenlemeler yapılıyor...",
    ];

    // Validate required parameters
    try {
      validateRequiredParams({ platform, contentType, audience, description }, [
        "platform",
        "contentType",
        "audience",
        "description",
      ]);
    } catch (validationError) {
      if (
        validationError instanceof AppError &&
        validationError.type === ErrorType.MISSING_PARAMETERS
      ) {
        console.error("Missing parameters:", validationError);
        router.push("/wizard");
        return;
      }
    }

    // Track content generation started
    trackEvent(AnalyticsEventType.CONTENT_GENERATION_STARTED, {
      platform,
      content_type: contentType,
      audience_category: audienceCategory,
      tone,
      industry,
      purpose,
      content_length: contentLength,
    });

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const generateContentProcess = async () => {
      try {
        // Initial steps with delays for UX
        updateProgress(statusMessages[0], 10);
        await delay(600);

        updateProgress(statusMessages[1], 20);
        await delay(600);

        updateProgress(statusMessages[2], 25);
        await delay(600);

        updateProgress(statusMessages[3], 30);
        await delay(600);

        // Create content generation params
        const contentParams: ContentGenerationParams = {
          platform,
          contentType,
          audience,
          audienceCategory,
          tone,
          description,
          keywords,
          purpose,
          industry,
          contentLength,
          targetAgeRange,
          targetGender,
          targetLocation,
          imageRequired,
          instagramFilter,
          twitterCharLimit,
          facebookPrivacy,
          language,
        };

        // Generate content with progress updates
        const contentResult = await generateContent(
          contentParams,
          updateProgress
        );

        // Add profile information if provided
        if (username) {
          contentResult.profileInfo = {
            username,
            photoUrl:
              profilePhotoUrl ||
              `https://i.pravatar.cc/150?u=${encodeURIComponent(username)}`,
          };
        }

        setProgress(100);

        // Track successful generation
        trackContentGeneration(platform, contentType, true);

        // Save result and redirect
        setTimeout(() => {
          setIsRedirecting(true);
          try {
            saveContentResult(contentResult);

            const profileParams = username
              ? `&username=${encodeURIComponent(
                  username
                )}&profilePhotoUrl=${encodeURIComponent(profilePhotoUrl || "")}`
              : "";

            router.push(
              `/result?platform=${platform}&contentType=${contentType}&audience=${audience}&audienceCategory=${audienceCategory}&tone=${tone}${profileParams}`
            );
          } catch (redirectError) {
            console.error("Yönlendirme hatası:", redirectError);
            setError(
              "Sonuç sayfasına yönlendirilirken bir hata oluştu. Lütfen tekrar deneyin."
            );
            setIsRedirecting(false);

            // Track error
            trackEvent(AnalyticsEventType.CONTENT_GENERATION_ERROR, {
              error_type: "redirect_error",
              platform,
              content_type: contentType,
            });
          }
        }, 1500);
      } catch (err) {
        // Handle errors
        const errorInfo = handleError(
          err,
          "İçerik oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
        );
        console.error("İçerik üretim hatası:", err);
        setError(errorInfo.message);

        // Track error
        trackContentGeneration(platform, contentType, false);
      }
    };

    generateContentProcess();
  }, [
    platform,
    contentType,
    audience,
    audienceCategory,
    tone,
    description,
    keywords,
    imageRequired,
    purpose,
    industry,
    contentLength,
    targetAgeRange,
    targetGender,
    targetLocation,
    instagramFilter,
    twitterCharLimit,
    facebookPrivacy,
    language,
    username,
    profilePhotoUrl,
    router,
  ]);

  // This function returns target audience info
  const getTargetAudienceInfo = () => {
    let base = getAudienceName(audience);

    if (targetAgeRange) {
      base += `, ${targetAgeRange} yaş`;
    }

    if (targetGender && targetGender !== "all") {
      base += `, ${targetGender === "male" ? "Erkek" : "Kadın"}`;
    }

    if (targetLocation) {
      base += `, ${targetLocation}`;
    }

    return base;
  };

  return (
    <div className="container max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-8">İçeriğiniz Oluşturuluyor</h1>

      <div className="p-8 bg-background border rounded-lg shadow-sm">
        {error ? (
          <div className="text-red-500 mb-4">
            <p className="text-lg font-medium">{error}</p>
            <Link
              href="/wizard"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Sihirbaza Geri Dön
            </Link>
          </div>
        ) : isRedirecting ? (
          <>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
            <p className="text-lg font-medium mb-2">
              Sonuç sayfasına yönlendiriliyorsunuz...
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Bu işlem biraz zaman alabilir, lütfen bekleyin...
            </p>
          </>
        ) : (
          <>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>

            <Progress value={progress} className="mb-6" />

            <p className="text-lg font-medium mb-2">{status}</p>
            <p className="text-sm text-muted-foreground mb-6">
              Google Gemini ve Imagen modelleri ile içeriğiniz üzerinde
              çalışıyoruz...
            </p>
          </>
        )}

        <div className="text-sm text-muted-foreground">
          <p className="mb-1">
            <span className="font-medium">Platform:</span>{" "}
            {getPlatformName(platform)}
          </p>
          <p className="mb-1">
            <span className="font-medium">İçerik Türü:</span>{" "}
            {getContentTypeName(contentType)}
          </p>
          <p className="mb-1">
            <span className="font-medium">Sektör:</span>{" "}
            {industry === "tech"
              ? "Teknoloji"
              : industry === "finance"
              ? "Finans & Bankacılık"
              : industry === "healthcare"
              ? "Sağlık"
              : industry === "education"
              ? "Eğitim"
              : industry === "retail"
              ? "Perakende"
              : industry || "Belirtilmemiş"}
          </p>
          <p className="mb-1">
            <span className="font-medium">Hedef Kitle:</span>{" "}
            {getTargetAudienceInfo()}
          </p>
          <p className="mb-1">
            <span className="font-medium">Ton:</span> {getToneName(tone)}
          </p>
          <p className="mb-1">
            <span className="font-medium">İçerik Uzunluğu:</span>{" "}
            {contentLength === "short"
              ? "Kısa"
              : contentLength === "long"
              ? "Uzun"
              : "Orta"}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/wizard"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          İptal Et ve Sihirbaza Dön
        </Link>
      </div>
    </div>
  );
}
