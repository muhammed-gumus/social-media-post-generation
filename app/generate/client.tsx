"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { useGenerateParams } from "./generateParams";
import { getTemplateById, ContentTemplate } from "@/lib/templateData";
import { Progress } from "@/components/ui/progress";

export default function GenerateClient() {
  const params = useGenerateParams();
  const router = useRouter();

  const {
    platform,
    contentType,
    audience,
    audienceCategory,
    tone,
    keywords,
    imageRequired,
    language,
    purpose,
    industry,
    contentLength,
    targetAgeRange,
    targetGender,
    targetLocation,
    instagramFilter,
    twitterCharLimit,
    facebookPrivacy,
    username,
    profilePhotoUrl,
    templateId,
    templatePrompt,
  } = params;

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Hazırlanıyor...");
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [templateInputs, setTemplateInputs] = useState<Record<string, string>>(
    {}
  );
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [templateDetails, setTemplateDetails] =
    useState<ContentTemplate | null>(null);
  const [description, setDescriptionText] = useState<string>(
    params.description || ""
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to update status and progress
  const updateProgress = (statusMessage: string, progressValue: number) => {
    setStatus(statusMessage);
    setProgress(progressValue);
  };

  // Get template details
  useEffect(() => {
    if (templateId) {
      // Use getTemplateById with the proper signature (no arguments)
      const template = getTemplateById();
      if (template) {
        setTemplateDetails(template);

        if (template.prompt) {
          // Extract field names from template prompt
          const fieldRegex = /{(\w+)}/g;
          const matches = Array.from(template.prompt.matchAll(fieldRegex));

          const fieldNames = matches.map((match) => match[1]);
          const initialInputs: Record<string, string> = {};

          fieldNames.forEach((field) => {
            initialInputs[field] = "";
          });

          setTemplateInputs(initialInputs);
          setShowTemplateForm(Object.keys(initialInputs).length > 0);
        }
      }
    }
  }, [templateId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) return; // Prevent multiple submissions
    setIsGenerating(true);
    startContentGeneration();
  };

  const startContentGeneration = useCallback(() => {
    const statusMessages = [
      "Parametreler analiz ediliyor...",
      "İçerik stratejisi belirleniyor...",
      "Hedef kitle analizi yapılıyor...",
      "Sektör özelliklerine göre içerik hazırlanıyor...",
      "Yapay zeka sistemi hazırlanıyor...",
      "Metin içeriği üretiliyor...",
      "Görsel üretiliyor...",
      "İçerik optimize ediliyor...",
      "Platform özelliklerine göre düzenleniyor...",
      "Son düzenlemeler yapılıyor...",
    ];

    // Validate required parameters based on whether using template or not
    try {
      if (templateId) {
        validateRequiredParams({ platform, contentType }, [
          "platform",
          "contentType",
        ]);
      } else {
        validateRequiredParams(
          { platform, contentType, audience, description },
          ["platform", "contentType", "audience", "description"]
        );
      }
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
      template_id: templateId || undefined,
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
          description: description,
          keywords,
          purpose,
          industry,
          contentLength,
          targetAgeRange,
          targetGender,
          targetLocation,
          // Görsel kontrolü - uploadedImage varsa imageRequired=false olmalı
          imageRequired: uploadedImage ? false : imageRequired,
          instagramFilter,
          twitterCharLimit,
          facebookPrivacy,
          language,
          templateId,
          templatePrompt,
          templateFields: templateInputs,
          // Yüklenen görseli doğru formatta aktarıyoruz
          uploadedImage: uploadedImage,
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

        // If user uploaded an image, use it instead of AI generated
        if (uploadedImage) {
          contentResult.imageUrl = uploadedImage;
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
        setIsGenerating(false);

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
    templateId,
    templatePrompt,
    templateInputs,
    uploadedImage,
    username,
    profilePhotoUrl,
    setProgress,
    setStatus,
    setError,
    setIsRedirecting,
    router,
  ]);

  // Sayfa yüklendiğinde otomatik olarak içerik oluşturma işlemini başlat
  useEffect(() => {
    let isMounted = true;

    // İçerik oluşturma işlemini başlat fonksiyonu
    const autoStartContentGeneration = () => {
      // Zaten içerik oluşturma işlemi başladıysa veya yönlendirme yapılıyorsa işlemi tekrarlama
      if (isGenerating || isRedirecting) return;

      // Eğer şablon formu gösterilmiyorsa (yani normal içerik oluşturma sayfasındaysak)
      // ve gerekli parametreler hazırsa, otomatik olarak başlat
      if (
        !showTemplateForm &&
        !error &&
        platform &&
        contentType &&
        !templateId && // Şablon ID'si yoksa normal içerik oluşturma
        (audience || templateId) &&
        isMounted
      ) {
        // İçerik oluşturmanın başladığını işaretle
        setIsGenerating(true);
        // İçerik oluştur
        startContentGeneration();
      }
    };

    // Kısa bir gecikme ekleyerek UI'ın hazırlanmasını bekle ve çoklu istekleri önle
    const timer = setTimeout(() => {
      autoStartContentGeneration();
    }, 500);

    // Component unmount olduğunda timer'ı temizle
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [
    platform,
    contentType,
    audience,
    showTemplateForm,
    templateId,
    isGenerating,
    isRedirecting,
    error,
    startContentGeneration, // Adding startContentGeneration to the dependency array
  ]);

  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      {showTemplateForm ? (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Şablonu Özelleştir</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {templateDetails?.title} şablonu için gerekli bilgileri girin. Bu
              bilgiler içeriğinizin oluşturulmasında kullanılacaktır.
            </p>
          </div>

          <div className="bg-background border rounded-xl p-8 shadow-sm">
            <form onSubmit={handleSubmitTemplate} className="space-y-8">
              {/* Template Header Info */}
              <div className="flex flex-col md:flex-row gap-6 pb-6 border-b">
                <div className="md:w-1/3">
                  <div className="h-40 rounded-lg bg-gradient-to-r from-primary/30 to-blue-600/30 relative flex items-center justify-center overflow-hidden">
                    {uploadedImage ? (
                      <Image
                        src={uploadedImage}
                        alt="Görsel Önizleme"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto mb-2 text-primary"
                        >
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                          <circle cx="12" cy="13" r="3"></circle>
                        </svg>
                        <p className="text-sm text-muted-foreground">
                          Görsel önizlemesi
                        </p>
                      </div>
                    )}
                  </div>
                  {imageRequired && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-1 text-center bg-primary text-white py-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors">
                        <span>Kendi Görselini Yükle</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="text-xs text-center text-muted-foreground mt-1">
                        Önerilen: PNG veya JPG, 1080×1080px
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:w-2/3 flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold mb-1">
                      {templateDetails?.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                        {getPlatformName(platform)}
                      </span>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                        {getContentTypeName(contentType)}
                      </span>
                      {templateDetails?.industry && (
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                          {templateDetails.industry}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      {templateDetails?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        İçerik Tonu{" "}
                        <span className="text-xs text-muted-foreground">
                          (değiştirilemez)
                        </span>
                      </label>
                      <div className="w-full p-2 border border-muted bg-muted/30 rounded-md text-muted-foreground">
                        {getToneName(tone)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Platform{" "}
                        <span className="text-xs text-muted-foreground">
                          (değiştirilemez)
                        </span>
                      </label>
                      <div className="w-full p-2 border border-muted bg-muted/30 rounded-md text-muted-foreground">
                        {getPlatformName(platform)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Fields Section */}
              <div>
                <h3 className="font-bold text-lg mb-4">İçerik Bilgileri</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.keys(templateInputs).map((field) => (
                    <div key={field} className="text-left">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor={field}
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        id={field}
                        className="w-full p-3 border rounded-md"
                        value={templateInputs[field]}
                        onChange={(e) =>
                          setTemplateInputs((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                        placeholder={`${
                          field.charAt(0).toUpperCase() + field.slice(1)
                        } bilgisini girin`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Details Section */}
              <div>
                <h3 className="font-bold text-lg mb-4">Ek Detaylar</h3>
                <div className="text-left">
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="additionalDescription"
                  >
                    Eklemek İstediğiniz Detaylar
                  </label>
                  <textarea
                    id="additionalDescription"
                    className="w-full p-3 border rounded-md min-h-[100px]"
                    value={description}
                    onChange={(e) => setDescriptionText(e.target.value)}
                    placeholder="İçeriğinize eklemek istediğiniz ek bilgiler veya detaylar..."
                  />
                </div>
              </div>

              {/* Profile Info Section - Optional */}
              {(platform === "instagram" ||
                platform === "twitter" ||
                platform === "facebook" ||
                platform === "linkedin") && (
                <div>
                  <h3 className="font-bold text-lg mb-4">
                    Profil Bilgileri (İsteğe Bağlı)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="text-left">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="username"
                      >
                        Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="w-full p-3 border rounded-md"
                        placeholder="Kullanıcı adınız"
                        defaultValue={username}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Section */}
              <div className="pt-6 border-t flex flex-wrap gap-4 justify-between items-center">
                <Link
                  href="/templates"
                  className="px-4 py-2 border border-muted-foreground rounded-full text-muted-foreground hover:bg-muted transition-colors"
                >
                  Şablonlara Geri Dön
                </Link>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center font-medium"
                  >
                    {isGenerating ? (
                      <>
                        <div className="h-4 w-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                        İçerik Oluşturuluyor...
                      </>
                    ) : (
                      "İçerik Oluştur"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-6">
            <div className="text-xs text-muted-foreground text-center">
              <p>
                İçerik üretilirken gelişmiş yapay zeka modelleri ve görsel
                oluşturma teknolojisi kullanılmaktadır.
              </p>
              <p className="mt-1">
                Sonuçlar ve oluşturulan içerik tamamen yapay zeka tarafından
                otomatik olarak yaratılır ve farklılık gösterebilir.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">İçerik Oluşturuluyor</h1>
          <div className="p-8 bg-background border rounded-lg shadow-sm flex flex-col items-center">
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
                <div className="mb-6">
                  <div className="mb-2">
                    <span className="text-lg font-medium">{status}</span>
                  </div>
                  <div className="max-w-md mx-auto">
                    <Progress value={progress} className="h-2.5" />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    %{Math.round(progress)}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground max-w-md text-center">
                  <p>
                    {getPlatformName(platform)} için{" "}
                    {getContentTypeName(contentType)} oluşturuluyor...
                  </p>
                  {audience && (
                    <p className="mt-1">
                      Hedef kitle: {getAudienceName(audience)}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
