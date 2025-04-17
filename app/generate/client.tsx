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
    <div className="container max-w-6xl mx-auto py-16 px-4 bg-gray-50">
      {showTemplateForm ? (
        <div>
          <div className="text-center mb-8">
            <span className="inline-block mb-4 px-3 py-1 border-2 border-black bg-[#ffde59] text-black font-bold text-sm">
              ŞABLON ÖZELLEŞTİRME
            </span>
            <h1 className="text-4xl font-black mb-3 tracking-tight">
              <span className="bg-black text-white px-2">Şablonu</span>{" "}
              Özelleştir
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-800 font-medium">
              {templateDetails?.title} şablonu için gerekli bilgileri girin. Bu
              bilgiler içeriğinizin oluşturulmasında kullanılacaktır.
            </p>
          </div>

          <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            {/* Neobrutalist circles */}
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#ffde59] border-2 border-black z-10"></div>
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border-2 border-black z-10"></div>

            <form onSubmit={handleSubmitTemplate} className="space-y-8">
              {/* Template Header Info */}
              <div className="flex flex-col md:flex-row gap-6 pb-6 border-b-2 border-black">
                <div className="md:w-1/3">
                  <div className="h-40 border-2 border-black relative flex items-center justify-center overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {uploadedImage ? (
                      <Image
                        src={uploadedImage}
                        alt="Görsel Önizleme"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="text-center p-4 bg-gray-100">
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
                          className="mx-auto mb-2 text-black"
                        >
                          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                          <circle cx="12" cy="13" r="3"></circle>
                        </svg>
                        <p className="text-sm text-gray-800 font-bold">
                          Görsel önizlemesi
                        </p>
                      </div>
                    )}
                  </div>
                  {imageRequired && (
                    <div className="mt-3">
                      <label className="block text-sm font-bold mb-1 text-center bg-[#ffde59] text-black py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-y-[-4px] transition-transform duration-300">
                        <span>Kendi Görselini Yükle</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="text-xs text-center text-gray-800 mt-1">
                        Önerilen: PNG veya JPG, 1080×1080px
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:w-2/3 flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-2xl font-black mb-2 tracking-tight">
                      {templateDetails?.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-black mb-2">
                      <span className="border-2 border-black bg-[#ffde59] px-2 py-1">
                        {getPlatformName(platform)}
                      </span>
                      <span className="border-2 border-black bg-[#ffde59] px-2 py-1">
                        {getContentTypeName(contentType)}
                      </span>
                      {templateDetails?.industry && (
                        <span className="border-2 border-black bg-[#ffde59] px-2 py-1">
                          {templateDetails.industry}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-800">
                      {templateDetails?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-bold mb-1">
                        İçerik Tonu{" "}
                        <span className="text-xs text-gray-600">
                          (değiştirilemez)
                        </span>
                      </label>
                      <div className="w-full p-2 border-2 border-black bg-gray-100">
                        {getToneName(tone)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1">
                        Platform{" "}
                        <span className="text-xs text-gray-600">
                          (değiştirilemez)
                        </span>
                      </label>
                      <div className="w-full p-2 border-2 border-black bg-gray-100">
                        {getPlatformName(platform)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Fields Section */}
              <div>
                <h3 className="font-black text-xl mb-4">İçerik Bilgileri</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.keys(templateInputs).map((field) => (
                    <div key={field} className="text-left">
                      <label
                        className="block text-sm font-bold mb-1"
                        htmlFor={field}
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        id={field}
                        className="w-full p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
                <h3 className="font-black text-xl mb-4">Ek Detaylar</h3>
                <div className="text-left">
                  <label
                    className="block text-sm font-bold mb-1"
                    htmlFor="additionalDescription"
                  >
                    Eklemek İstediğiniz Detaylar
                  </label>
                  <textarea
                    id="additionalDescription"
                    className="w-full p-3 border-2 border-black min-h-[100px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
                  <h3 className="font-black text-xl mb-4">
                    Profil Bilgileri (İsteğe Bağlı)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="text-left">
                      <label
                        className="block text-sm font-bold mb-1"
                        htmlFor="username"
                      >
                        Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="w-full p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        placeholder="Kullanıcı adınız"
                        defaultValue={username}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Section */}
              <div className="pt-6 border-t-2 border-black flex flex-wrap gap-4 justify-between items-center">
                <Link
                  href="/templates"
                  className="px-4 py-2 border-2 border-black text-black hover:translate-y-[-4px] transition-transform duration-300 font-bold"
                >
                  Şablonlara Geri Dön
                </Link>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="px-8 py-3 bg-[#ffde59] text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="h-4 w-4 border-t-2 border-r-2 border-black rounded-full animate-spin mr-2"></div>
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
            <div className="text-sm text-gray-800 text-center border-2 border-black p-3 bg-gray-100 mt-8">
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
          <span className="inline-block mb-4 px-3 py-1 border-2 border-black bg-[#ffde59] text-black font-bold text-sm">
            İÇERİK ÜRETİMİ
          </span>
          <h1 className="text-4xl font-black mb-8 tracking-tight">
            <span className="bg-black text-white px-2">İçerik</span>{" "}
            Oluşturuluyor
          </h1>
          <div className="p-8 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center relative">
            {/* Neobrutalist circles */}
            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#ffde59] border-2 border-black z-10"></div>
            <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border-2 border-black z-10"></div>

            {error ? (
              <div className="text-red-500 mb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
                <p className="text-xl font-black mb-2">{error}</p>
                <Link
                  href="/wizard"
                  className="mt-4 inline-block bg-[#ffde59] hover:translate-y-[-4px] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-3 font-bold text-black"
                >
                  Sihirbaza Geri Dön
                </Link>
              </div>
            ) : isRedirecting ? (
              <>
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#ffde59] border-2 border-black flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
                </div>
                <p className="text-xl font-black mb-2">
                  Sonuç sayfasına yönlendiriliyorsunuz...
                </p>
                <p className="text-md text-gray-800 mb-6 font-medium">
                  Bu işlem biraz zaman alabilir, lütfen bekleyin...
                </p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#ffde59] border-2 border-black flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
                </div>
                <div className="mb-6">
                  <div className="mb-2">
                    <span className="text-xl font-black">{status}</span>
                  </div>
                  <div className="max-w-md mx-auto border-2 border-black p-2 bg-white">
                    <div className="relative h-6 w-full bg-white">
                      <div
                        className="absolute h-full bg-[#ffde59]"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2 text-md font-bold text-black">
                    %{Math.round(progress)}
                  </div>
                </div>
                <div className="text-md text-gray-800 max-w-md text-center font-medium bg-gray-100 border-2 border-black p-3">
                  <p>
                    {getPlatformName(platform)} için{" "}
                    <strong>{getContentTypeName(contentType)}</strong>{" "}
                    oluşturuluyor...
                  </p>
                  {audience && (
                    <p className="mt-1">
                      Hedef kitle: <strong>{getAudienceName(audience)}</strong>
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
