"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import Link from "next/link";
import {
  getPlatformName,
  getContentTypeName,
  getSharingUrl,
} from "@/lib/utils";
import { generateSocialMediaImage } from "@/lib/imagen";
import {
  generateSocialMediaText,
  generateSocialMediaHashtags,
  generateContentSuggestions,
  generateLinkedInOptimizedContent,
} from "@/lib/gemini";

// Import platform-specific mockups
import { TwitterMockup } from "@/components/mockups/TwitterMockup";
import { InstagramMockup } from "@/components/mockups/InstagramMockup";
import { LinkedinMockup } from "@/components/mockups/LinkedinMockup";
import { FacebookMockup } from "@/components/mockups/FacebookMockup";

// Sosyal medya ikonlarını içe aktar (İkonlar için basit SVG'ler kullanacağız)
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
  </svg>
);

interface ContentResult {
  title: string;
  text: string;
  imageUrl: string;
  hashtags: string[];
  suggestions: string[];
}

interface ThreadContent {
  tweets: string[];
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const platform = searchParams.get("platform") || "";
  const contentType = searchParams.get("contentType") || "";
  const audience = searchParams.get("audience") || "";
  // The tone variable is kept for future feature implementation

  const [result, setResult] = useState<ContentResult>({
    title: "",
    text: "",
    imageUrl: "/file.svg",
    hashtags: [],
    suggestions: [],
  });

  const [threadContent, setThreadContent] = useState<ThreadContent | null>(
    null
  );
  const [currentTweet, setCurrentTweet] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isRegeneratingContent, setIsRegeneratingContent] = useState(false);

  // Modal durumları
  const [isLinkedInShareModalOpen, setIsLinkedInShareModalOpen] =
    useState(false);
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
  const [shareErrorModalOpen, setShareErrorModalOpen] = useState(false);

  // Thread içeriğini işle
  const processThreadContent = (text: string): string[] => {
    const tweetSeparators = [/\n\d+\/\d+:[\s]*/g, /\n---+\n/g, /\n\*\*\*+\n/g];

    let tweets: string[] = [];

    for (const separator of tweetSeparators) {
      if (separator.test(text)) {
        tweets = text
          .split(separator)
          .filter((tweet) => tweet.trim().length > 0);
        if (tweets.length > 1) break;
      }
    }

    if (tweets.length <= 1) {
      tweets = text
        .split(/\n\n/)
        .filter((tweet) => tweet.trim().length > 0)
        .map((tweet, index, array) => {
          const tweetNumber = `${index + 1}/${array.length}`;
          return `${tweetNumber}: ${tweet.trim()}`;
        });
    }

    return tweets;
  };

  useEffect(() => {
    try {
      const storedContent = localStorage.getItem("contentResult");

      if (storedContent) {
        const contentData = JSON.parse(storedContent);
        setResult(contentData);

        if (platform === "twitter" && contentType === "thread") {
          const tweets = processThreadContent(contentData.text);
          setThreadContent({ tweets });
        }
      } else {
        setError(
          "İçerik verilerini bulunamadı. Lütfen yeni bir içerik oluşturun."
        );
      }
    } catch (error) {
      console.error("Sonuç verilerini ayrıştırma hatası:", error);
      setError(
        "İçerik verilerini işlerken bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  }, [platform, contentType, audience, router]);

  const nextTweet = () => {
    if (threadContent && currentTweet < threadContent.tweets.length - 1) {
      setCurrentTweet((prev) => prev + 1);
    }
  };

  const prevTweet = () => {
    if (currentTweet > 0) {
      setCurrentTweet((prev) => prev - 1);
    }
  };

  const copyTextToClipboard = () => {
    let fullText = "";

    if (platform === "twitter" && contentType === "thread" && threadContent) {
      fullText = threadContent.tweets.join("\n\n");
    } else {
      fullText = `${result.title}\n\n${result.text}\n\n${result.hashtags.join(
        " "
      )}`;
    }

    navigator.clipboard.writeText(fullText).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error("Panoya kopyalama hatası:", err);
      }
    );
  };

  const downloadImage = async () => {
    if (!result.imageUrl || result.imageUrl === "/file.svg") return;

    try {
      const response = await fetch(result.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${platform}-${contentType}-image.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Görsel indirme hatası:", error);
    }
  };

  const regenerateImage = async () => {
    try {
      setIsRegenerating(true);

      let description = result.title;
      if (contentType === "thread" && threadContent) {
        description = threadContent.tweets[0];
      }

      const newImageUrl = await generateSocialMediaImage(
        platform,
        contentType,
        description
      );

      if (newImageUrl && newImageUrl !== "/file.svg") {
        const updatedResult = { ...result, imageUrl: newImageUrl };
        setResult(updatedResult);

        localStorage.setItem("contentResult", JSON.stringify(updatedResult));
      } else {
        console.error("Görsel yeniden oluşturulamadı");
      }
    } catch (error) {
      console.error("Görsel yeniden oluşturma hatası:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const regenerateContent = async () => {
    try {
      setIsRegeneratingContent(true);

      const description = result.title;
      const language = "tr";

      let newText;
      // LinkedIn için özel içerik oluşturma
      if (platform === "linkedin") {
        newText = await generateLinkedInOptimizedContent(
          contentType,
          audience,
          description,
          language
        );
      } else {
        // Diğer platformlar için normal içerik oluşturma
        newText = await generateSocialMediaText(
          platform,
          contentType,
          audience,
          description,
          language
        );
      }

      const [newHashtags, newSuggestions] = await Promise.all([
        generateSocialMediaHashtags(platform, description),
        generateContentSuggestions(platform),
      ]);

      const updatedResult = {
        ...result,
        text: newText,
        hashtags: newHashtags || result.hashtags,
        suggestions: newSuggestions || result.suggestions,
      };

      setResult(updatedResult);

      if (platform === "twitter" && contentType === "thread") {
        const tweets = processThreadContent(newText);
        setThreadContent({ tweets });
        setCurrentTweet(0);
      }

      localStorage.setItem("contentResult", JSON.stringify(updatedResult));
    } catch (error) {
      console.error("İçerik yeniden oluşturma hatası:", error);
    } finally {
      setIsRegeneratingContent(false);
    }
  };

  // İçeriği sosyal medyada paylaş
  const shareToSocialMedia = () => {
    let textToShare = "";
    if (platform === "twitter" && contentType === "thread" && threadContent) {
      textToShare = threadContent.tweets.join("\n\n");
    } else {
      textToShare = `${result.title}\n\n${
        result.text
      }\n\n${result.hashtags.join(" ")}`;
    }

    // LinkedIn için özel işlem - önce içeriği kopyala, sonra modal göster
    if (platform === "linkedin") {
      navigator.clipboard
        .writeText(textToShare)
        .then(() => {
          // Modal göster
          setIsLinkedInShareModalOpen(true);
        })
        .catch((err) => {
          console.error("LinkedIn içeriği kopyalama hatası:", err);
          // Hata durumunda hata modalını göster
          setShareErrorModalOpen(true);
        });
    } else if (platform === "instagram") {
      // Instagram için özel modal
      navigator.clipboard
        .writeText(textToShare)
        .then(() => {
          setIsInstagramModalOpen(true);
        })
        .catch((err) => {
          console.error("Instagram içeriği kopyalama hatası:", err);
          setShareErrorModalOpen(true);
        });
    } else {
      // Diğer platformlar için normal paylaşım işlemi
      const shareUrl = getSharingUrl(platform, textToShare, result.title);

      if (shareUrl) {
        window.open(shareUrl, "_blank");
      }
    }
  };

  // LinkedIn paylaşımı tamamlama
  const handleLinkedInShareConfirm = () => {
    const shareUrl = getSharingUrl("linkedin", "", result.title);
    window.open(shareUrl, "_blank");
    setIsLinkedInShareModalOpen(false);
  };

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="mb-8 p-6 rounded-lg border bg-red-50/50 dark:bg-red-900/10">
          <h1 className="text-2xl font-semibold mb-2">Bir Hata Oluştu</h1>
          <p>{error}</p>
        </div>
        <Link href="/wizard">
          <Button>Yeni İçerik Oluştur</Button>
        </Link>
      </div>
    );
  }

  const getThreadContentForDisplay = () => {
    if (platform === "twitter" && contentType === "thread" && threadContent) {
      return {
        ...result,
        text: threadContent.tweets[currentTweet],
      };
    }
    return result;
  };

  const renderPlatformMockup = () => {
    const contentForDisplay = getThreadContentForDisplay();

    switch (platform) {
      case "twitter":
        return (
          <TwitterMockup
            content={contentForDisplay}
            contentType={contentType}
          />
        );
      case "instagram":
        return (
          <InstagramMockup
            content={contentForDisplay}
            contentType={contentType}
          />
        );
      case "linkedin":
        return (
          <LinkedinMockup
            content={contentForDisplay}
            contentType={contentType}
          />
        );
      case "facebook":
        return (
          <FacebookMockup
            content={contentForDisplay}
            contentType={contentType}
          />
        );
      default:
        return (
          <div className="p-4 border rounded-md bg-white dark:bg-gray-800">
            <div className="space-y-4 whitespace-pre-line">
              {result.text.split(/\\n|\n/).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        );
    }
  };

  // Platform ikonunu getir
  const getPlatformIcon = () => {
    switch (platform) {
      case "twitter":
        return <TwitterIcon />;
      case "facebook":
        return <FacebookIcon />;
      case "linkedin":
        return <LinkedinIcon />;
      case "instagram":
        return <InstagramIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      {/* LinkedIn Paylaşım Modalı */}
      <Modal
        isOpen={isLinkedInShareModalOpen}
        onClose={() => setIsLinkedInShareModalOpen(false)}
        title="LinkedIn'de Paylaş"
        primaryAction={{
          label: "LinkedIn'e Git",
          onClick: handleLinkedInShareConfirm,
        }}
        secondaryAction={{
          label: "Kapat",
          onClick: () => setIsLinkedInShareModalOpen(false),
        }}
      >
        <div className="space-y-3">
          <p>
            LinkedIn içeriğiniz kopyalandı! İçeriği LinkedIn&apos;de paylaşmak
            için:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>LinkedIn&apos;e Git butonuna tıklayın</li>
            <li>LinkedIn paylaşım sayfasında, içerik alanına tıklayın</li>
            <li>Ctrl+V (veya Command+V) ile kopyalanan içeriği yapıştırın</li>
            <li>Paylaş butonuna tıklayın</li>
          </ol>
        </div>
      </Modal>

      {/* Instagram Paylaşım Modalı */}
      <Modal
        isOpen={isInstagramModalOpen}
        onClose={() => setIsInstagramModalOpen(false)}
        title="Instagram'da Paylaş"
        primaryAction={{
          label: "Anladım",
          onClick: () => setIsInstagramModalOpen(false),
        }}
      >
        <div className="space-y-3">
          <p>
            Instagram içeriğiniz kopyalandı! Instagram web üzerinden doğrudan
            içerik paylaşımını desteklemediğinden:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Instagram mobil uygulamasını açın</li>
            <li>Yeni gönderi oluştur butonuna tıklayın</li>
            <li>Görselinizi seçin ve düzenleyin</li>
            <li>Açıklama alanına, kopyaladığınız içeriği yapıştırın</li>
          </ol>
        </div>
      </Modal>

      {/* Paylaşım Hata Modalı */}
      <Modal
        isOpen={shareErrorModalOpen}
        onClose={() => setShareErrorModalOpen(false)}
        title="Paylaşım Hatası"
        primaryAction={{
          label: "Kapat",
          onClick: () => setShareErrorModalOpen(false),
        }}
      >
        <div className="space-y-2">
          <p>İçeriği kopyalarken bir hata oluştu.</p>
          <p>
            Lütfen &quot;Metni Kopyala&quot; butonunu kullanarak içeriği manuel
            olarak kopyalayıp, paylaşmak istediğiniz platformda yapıştırın.
          </p>
        </div>
      </Modal>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">İçerik Sonucu</h1>
        <p className="text-muted-foreground">
          {getPlatformName(platform)} için {getContentTypeName(contentType)}{" "}
          içeriği
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{result.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-center mb-4">
                {renderPlatformMockup()}
              </div>

              {platform === "twitter" &&
                contentType === "thread" &&
                threadContent &&
                threadContent.tweets.length > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevTweet}
                      disabled={currentTweet === 0}
                      aria-label="Önceki tweet"
                    >
                      ← Önceki
                    </Button>
                    <span className="text-sm" aria-live="polite">
                      {currentTweet + 1} / {threadContent.tweets.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextTweet}
                      disabled={
                        currentTweet === threadContent.tweets.length - 1
                      }
                      aria-label="Sonraki tweet"
                    >
                      Sonraki →
                    </Button>
                  </div>
                )}
            </CardContent>
            {result.hashtags.length > 0 && (
              <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
                {result.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </CardFooter>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">İçerik İpuçları</CardTitle>
              <CardDescription>
                İçeriğinizi geliştirebilecek öneriler
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result.suggestions.length > 0 ? (
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Bu içerik için herhangi bir öneri bulunmamaktadır.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={shareToSocialMedia}
                variant="default"
                className="w-full justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                aria-label={`${getPlatformName(platform)}'da Paylaş`}
              >
                {getPlatformIcon()}
                {platform === "instagram"
                  ? "Instagram'da Paylaş (Kopyala)"
                  : `${getPlatformName(platform)}'da Paylaş`}
              </Button>

              <Button
                onClick={regenerateContent}
                disabled={isRegeneratingContent || !result.title}
                variant="outline"
                className="w-full justify-center"
                aria-label="İçeriği yeniden oluştur"
              >
                {isRegeneratingContent ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    İçerik Oluşturuluyor...
                  </>
                ) : (
                  <>İçeriği Yeniden Oluştur</>
                )}
              </Button>

              <Button
                onClick={regenerateImage}
                disabled={isRegenerating || !result.title}
                variant="outline"
                className="w-full justify-center"
                aria-label="Görseli yeniden oluştur"
              >
                {isRegenerating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Görsel Oluşturuluyor...
                  </>
                ) : (
                  <>Görseli Yeniden Oluştur</>
                )}
              </Button>

              {result.imageUrl && result.imageUrl !== "/file.svg" && (
                <Button
                  variant="outline"
                  onClick={downloadImage}
                  className="w-full justify-center"
                  aria-label="Görseli indir"
                >
                  Görseli İndir
                </Button>
              )}

              <Button
                variant="outline"
                onClick={copyTextToClipboard}
                className="w-full justify-center"
                aria-label="Metni kopyala"
              >
                {isCopied ? "Kopyalandı ✓" : "Metni Kopyala"}
              </Button>

              <Link href="/wizard" className="w-full">
                <Button className="w-full justify-center">
                  Yeni İçerik Oluştur
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
