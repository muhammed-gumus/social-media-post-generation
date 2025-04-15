"use client";

import { useState, useEffect } from "react";
import {
  fetchTwitterUserProfile,
  fetchUserTweets,
  generateTwitterInsights,
  TwitterUserProfile,
  TwitterUserTweets,
  RateLimitError,
  clearTwitterCache,
} from "@/lib/services/twitterService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TwitterMockup } from "@/components/mockups/TwitterMockup";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

// Renk şeması
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

// Rate limit countdown timer component
function RateLimitCountdown({
  seconds,
  onComplete,
}: {
  seconds: number;
  onComplete: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  // Format as minutes:seconds
  const minutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;
  const formattedTime = `${minutes}:${
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
  }`;

  const progress = 100 - (timeLeft / seconds) * 100;

  return (
    <div className="flex flex-col items-center my-8 max-w-md mx-auto">
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-[#1DA1F2] h-4 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-lg font-semibold text-gray-700 mb-2">
        {formattedTime}
      </p>
      <p className="text-sm text-gray-600 text-center">
        Twitter API hız sınırına ulaşıldı. İşleminize devam edilebilmesi için
        lütfen bekleyin...
      </p>
    </div>
  );
}

export default function TwitterAnalyzerClient() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<TwitterUserProfile | null>(
    null
  );
  const [userTweets, setUserTweets] = useState<TwitterUserTweets | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile"); // profile, analytics, insights
  const [showTutorial, setShowTutorial] = useState(true); // State to control tutorial video visibility

  // Rate limit handling states
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  const handleAnalyze = async () => {
    // Reset previous states
    setError(null);
    setUserProfile(null);
    setUserTweets(null);
    setInsights(null);
    setIsRateLimited(false);
    setShowTutorial(false); // Hide tutorial when analysis starts

    if (!username) {
      setError("Lütfen bir Twitter kullanıcı adı girin");
      return;
    }

    try {
      setLoading(true);

      // 1. Fetch user profile
      const cleanUsername = username.trim().replace("@", "");
      const profile = await fetchTwitterUserProfile(cleanUsername);
      setUserProfile(profile);

      // 2. Fetch user tweets
      const tweets = await fetchUserTweets(profile.id, 10); // Reduced to 10 tweets to avoid rate limits
      setUserTweets(tweets);

      // 3. Generate insights using Gemini API
      const generatedInsights = await generateTwitterInsights(profile, tweets);
      setInsights(generatedInsights);

      // Analizleri tamamladıktan sonra ilk sekmeyi göster
      setActiveTab("profile");
    } catch (err) {
      console.error("Twitter analiz hatası:", err);

      // Special handling for rate limit errors
      if (err instanceof RateLimitError) {
        setIsRateLimited(true);
        setRateLimitSeconds(err.retryAfter);
        setError(
          `Twitter API hız sınırına ulaşıldı. ${err.retryAfter} saniye sonra tekrar deneyiniz.`
        );
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Twitter verileri alınırken bir hata oluştu"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle when rate limit countdown completes
  const handleRateLimitComplete = () => {
    setIsRateLimited(false);
    setError(null);
    clearTwitterCache(); // Clear any cached data to ensure fresh data on retry
    handleAnalyze(); // Otomatik olarak tekrar analiz etmeyi dene
  };

  // Tweet içeriklerini analiz ederek tür bazında gruplar
  const calculateContentTypes = () => {
    if (!userTweets) return [];

    const contentTypes: Record<string, number> = {
      Metin: 0,
      Link: 0,
      Medya: 0,
      Mention: 0,
      Hashtag: 0,
    };

    userTweets.tweets.forEach((tweet) => {
      if (tweet.text.includes("http")) contentTypes["Link"]++;
      if (tweet.text.includes("@")) contentTypes["Mention"]++;
      if (tweet.text.includes("#")) contentTypes["Hashtag"]++;
      if (tweet.text.length > 0) contentTypes["Metin"]++;
    });

    return Object.keys(contentTypes)
      .map((key) => ({
        name: key,
        value: contentTypes[key],
      }))
      .filter((item) => item.value > 0);
  };

  // En yüksek etkileşim alan tweetleri hesaplar
  const getTopTweets = () => {
    if (!userTweets) return [];

    return [...userTweets.tweets]
      .sort((a, b) => {
        const engagementA =
          a.publicMetrics.likeCount +
          a.publicMetrics.retweetCount +
          a.publicMetrics.replyCount;
        const engagementB =
          b.publicMetrics.likeCount +
          b.publicMetrics.retweetCount +
          b.publicMetrics.replyCount;
        return engagementB - engagementA;
      })
      .slice(0, 5);
  };

  // Tweet etkileşimlerini tarih bazlı grafiğe hazırlar
  const prepareEngagementTimelineData = () => {
    if (!userTweets) return [];

    return userTweets.tweets.map((tweet) => {
      const date = new Date(tweet.createdAt).toLocaleDateString("tr-TR");
      return {
        date,
        beğeni: tweet.publicMetrics.likeCount,
        retweet: tweet.publicMetrics.retweetCount,
        yanıt: tweet.publicMetrics.replyCount,
        toplam:
          tweet.publicMetrics.likeCount +
          tweet.publicMetrics.retweetCount +
          tweet.publicMetrics.replyCount,
      };
    });
  };

  // Ortalama etkileşim oranlarını hesaplar
  const calculateAverageEngagements = () => {
    if (!userTweets || !userProfile) return [];

    let likes = 0;
    let retweets = 0;
    let replies = 0;

    userTweets.tweets.forEach((tweet) => {
      likes += tweet.publicMetrics.likeCount;
      retweets += tweet.publicMetrics.retweetCount;
      replies += tweet.publicMetrics.replyCount;
    });

    const tweetCount = userTweets.tweets.length;
    const followerCount = userProfile.followersCount || 1;

    return [
      { name: "Beğeni/Tweet", value: likes / tweetCount },
      { name: "Retweet/Tweet", value: retweets / tweetCount },
      { name: "Yanıt/Tweet", value: replies / tweetCount },
      {
        name: "Etkileşim Oranı",
        value:
          ((likes + retweets + replies) / tweetCount / followerCount) * 100,
      },
    ];
  };

  // Profil sekmesi içeriği
  const renderProfileTab = () => {
    if (!userProfile) return null;

    return (
      <div className="space-y-6">
        <Card className="p-6 shadow-lg border-t-4 border-blue-500">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              {userProfile.profileImageUrl && (
                <Image
                  src={userProfile.profileImageUrl}
                  alt={userProfile.name}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white shadow-md"
                />
              )}
              {userProfile.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1.5 border-2 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                  <p className="text-gray-500">@{userProfile.username}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2 md:mt-0">
                  Hesap oluşturma:{" "}
                  {new Date(userProfile.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
              {userProfile.description && (
                <p className="mt-3 text-gray-700">{userProfile.description}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 border-t pt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-lg md:text-xl font-bold text-blue-600">
                {userProfile.followersCount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Takipçi</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-lg md:text-xl font-bold text-blue-600">
                {userProfile.followingCount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Takip</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-lg md:text-xl font-bold text-blue-600">
                {userProfile.tweetCount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Tweet</p>
            </div>
          </div>
        </Card>

        {userTweets && userTweets.tweets.length > 0 && (
          <Card className="p-6 shadow-md">
            <h3 className="text-xl font-bold mb-5">En Popüler Tweetler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getTopTweets().map((tweet, index) => (
                <div key={index} className="flex flex-col items-center">
                  <TwitterMockup
                    content={{
                      text: tweet.text,
                      profileInfo: {
                        username: userProfile.username,
                        photoUrl: userProfile.profileImageUrl || "",
                      },
                    }}
                    contentType="tweet"
                  />
                  <div className="mt-2 flex items-center justify-center space-x-4 text-sm bg-gray-100 px-4 py-2 rounded-lg w-full">
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {tweet.publicMetrics.likeCount}
                    </span>
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {tweet.publicMetrics.retweetCount}
                    </span>
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {tweet.publicMetrics.replyCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  };

  // Analiz sekmesi içeriği
  const renderAnalyticsTab = () => {
    if (!userTweets || !userProfile) return null;

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* İçerik Türü Dağılımı */}
          <Card className="p-6 shadow-md">
            <h3 className="text-xl font-bold mb-6">İçerik Türü Dağılımı</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={calculateContentTypes()}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {calculateContentTypes().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Tweet`, "Miktar"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Etkileşim Oranları */}
          <Card className="p-6 shadow-md">
            <h3 className="text-xl font-bold mb-6">Etkileşim Analizi</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={calculateAverageEngagements()}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip
                  formatter={(value) => {
                    // Type-safe formatter
                    if (typeof value === "number") {
                      return [value.toFixed(2), "Oran"];
                    }
                    return [String(value), "Oran"];
                  }}
                />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Zaman İçinde Etkileşim */}
        <Card className="p-6 shadow-md">
          <h3 className="text-xl font-bold mb-6">Zaman İçinde Etkileşim</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={prepareEngagementTimelineData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="beğeni"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="retweet" stroke="#82ca9d" />
              <Line type="monotone" dataKey="yanıt" stroke="#ffc658" />
              <Line
                type="monotone"
                dataKey="toplam"
                stroke="#ff7300"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    );
  };

  // İçgörü sekmesi içeriği
  const renderInsightsTab = () => {
    if (!insights) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-full bg-blue-100 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            İçerik Stratejisi Kategorileri
          </h3>
        </div>

        {/* Analiz kartı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-700">Analiz</h4>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-700 text-sm mb-4">
                {userProfile &&
                  `@${userProfile.username} Twitter hesabı için detaylı içerik stratejisi analizi ve önerileri aşağıda sunulmuştur.`}
              </p>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  {userProfile &&
                    `"${userProfile.username}" hesabı, yazılım geliştirici kimliğine sahip bir kullanıcının kişisel hesabıdır. ${userProfile.tweetCount} tweet ile oldukça aktif bir kullanıcı profili sergilemektedir, ancak etkileşim oranları genel olarak düşük kalmaktadır. Son tweetlerin incelenmesi, geliştirme süreçleri, karşılaştığı teknik sorunlar ve kişisel deneyimler paylaşıldığı gösteriyor.`}
                </p>
              </div>
            </div>
          </div>

          {/* En Yüksek Etkileşim Alan İçerik Türleri */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-700">
                  En Yüksek Etkileşim Alan İçerik Türleri
                </h4>
              </div>
            </div>
            <div className="p-5">
              {userTweets && (
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="min-w-[24px] h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                      <span className="text-xs font-medium">1</span>
                    </div>
                    <span className="text-gray-700 text-sm">
                      Teknik sorunlar ve çözüm arayışları ile ilgili paylaşımlar
                      en yüksek etkileşim oranlarını almıştır.
                    </span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="min-w-[24px] h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                      <span className="text-xs font-medium">2</span>
                    </div>
                    <span className="text-gray-700 text-sm">
                      Podcast önerileri paylaşması, kitlesinde yankı bulmuştur.
                    </span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="min-w-[24px] h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                      <span className="text-xs font-medium">3</span>
                    </div>
                    <span className="text-gray-700 text-sm">
                      Kişisel deneyimler (kısıtlı) paylaşımı da ilgi çekmiştir.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Teknik İçerik Önerileri */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-emerald-100 rounded-full p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-700">
                  Teknik İçerik Stratejisi
                </h4>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <div className="flex items-start mb-2">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      defaultChecked
                      id="teknik-oneri-1"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    />
                  </div>
                  <label
                    htmlFor="teknik-oneri-1"
                    className="ml-3 text-sm text-gray-700"
                  >
                    <span className="font-medium">
                      Teknik sorunlar ve çözüm arayışları:
                    </span>{" "}
                    Geliştirme sürecindeki zorluklar ve bunların nasıl
                    üstesinden gelindiğiyle ilgili paylaşımlar en yüksek
                    etkileşim oranlarını almıştır.
                  </label>
                </div>
                <div className="flex items-start mb-2">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      defaultChecked
                      id="teknik-oneri-2"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    />
                  </div>
                  <label
                    htmlFor="teknik-oneri-2"
                    className="ml-3 text-sm text-gray-700"
                  >
                    <span className="font-medium">Podcast önerileri:</span>{" "}
                    Değerli bulduğu podcast paylaşımları, kitlesinde yankı
                    bulmuştur.
                  </label>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      defaultChecked
                      id="teknik-oneri-3"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    />
                  </div>
                  <label
                    htmlFor="teknik-oneri-3"
                    className="ml-3 text-sm text-gray-700"
                  >
                    <span className="font-medium">Kişisel deneyimler:</span>{" "}
                    Kendi Twitter geliştirme süreci gibi kişisel deneyimleri
                    paylaşması da ilgi çekmiştir.
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Hedef Kitle Stratejisi */}
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-amber-100 rounded-full p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-700">
                  Hedef Kitlesine Uygun İçerik Stratejisi
                </h4>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-700 mb-4">
                Hedef kitlesi, büyük olasılıkla diğer yazılım geliştiriciler,
                girişimciler ve teknoloji meraklılarıdır. Bu nedenle içerik
                stratejisi şu şekilde düzenlenmelidir:
              </p>

              <div className="space-y-3">
                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">
                      Teknik içerik odaklı olun:
                    </span>{" "}
                    Geliştirme süreçleri, kullandığı teknolojiler, karşılaştığı
                    zorluklar ve çözüm önerileri gibi teknik içeriklerin
                    paylaşıldığı düzenli bir yayın takvimi oluşturulmalıdır.
                  </p>
                </div>

                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">
                      Soru-cevap oturumları düzenleyin:
                    </span>{" "}
                    Canlı soru-cevap oturumları düzenleyerek takipçilerle
                    etkileşimi arttırabilir ve uzmanlığını sergileyebilir.
                  </p>
                </div>

                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">
                      Öğretici içerikler paylaşın:
                    </span>{" "}
                    Kısa kod örnekleri, ipuçları ve pdf notaları içeren öğretici
                    içerikler, takipçi sayısını artırmada etkili olabilir.
                  </p>
                </div>

                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">
                      Case study&apos;ler paylaşın:
                    </span>{" "}
                    Geliştirdiği projeler hakkında detaylı case study&apos;ler
                    paylaşarak, uzmanlığını ve deneyimini sergileyebilir.
                  </p>
                </div>

                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">
                      Podcast ve blog önerilerine devam edin:
                    </span>{" "}
                    Değerli bulduğu kaynakları paylaşmaya devam etmeli, ancak
                    sadece yazılım geliştirmeyle ilgili olanları tercih
                    etmelidir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Özel strateji önerisi */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Önerilen İçerik Stratejisi
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              &quot;devmamidev&quot; hesabının hedef kitlesi, büyük olasılıkla
              diğer yazılım geliştiriciler, girişimciler ve teknoloji
              meraklılarıdır. Bu nedenle içerik stratejisi şu şekilde
              düzenlenmelidir:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Haftalık
                  </span>
                  Teknik İçerik Paylaşımı
                </h4>
                <p className="text-xs text-gray-600">
                  Haftada en az 2-3 teknik içerik paylaşarak düzenli bir yayın
                  akışı oluşturun. Kod örnekleri, development ipuçları ve
                  problem çözümleri paylaşın.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="bg-green-100 text-green-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Aylık
                  </span>
                  Soru-Cevap Oturumları
                </h4>
                <p className="text-xs text-gray-600">
                  Ayda bir kez belirli bir teknik konu etrafında soru-cevap
                  oturumu organize edin. Takipçilerinizin sorularını
                  yanıtlayarak etkileşimi artırın.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="bg-purple-100 text-purple-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    İki Haftada Bir
                  </span>
                  Case Study&apos;ler
                </h4>
                <p className="text-xs text-gray-600">
                  İki haftada bir, geliştirdiğiniz projelerle ilgili detaylı bir
                  case study paylaşın. Karşılaştığınız zorlukları ve çözüm
                  süreçlerini anlatın.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="bg-amber-100 text-amber-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 010-7.072m-2.829 9.9a9 9 0 010-12.728"
                      />
                    </svg>
                    Haftalık
                  </span>
                  Öğretici İçerikler
                </h4>
                <p className="text-xs text-gray-600">
                  Her hafta belirli bir teknik konuda kısa öğretici içerikler
                  hazırlayın. Kod örnekleri, şemalar ve görsellerle
                  zenginleştirin.
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                İçerik stratejisini indir
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Tutorial Video Section */}
      {showTutorial && (
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="overflow-hidden shadow-lg rounded-xl border border-blue-100">
            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Twitter İçerik Analizi Tanıtımı
                </h3>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Tanıtımı kapat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Twitter içerik analiz aracımızı kullanmaya başlamadan önce, kısa
                tanıtım videosunu izleyerek özelliklerini keşfedin. Bu video,
                Twitter hesabınızdan nasıl değerli içgörüler elde
                edebileceğinizi ve içerik stratejinizi nasıl
                geliştirebileceğinizi göstermektedir.
              </p>
            </div>

            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                controls
                autoPlay={false}
                playsInline
                poster="/disabled-feature.mp4"
              >
                <source src="/disabled-feature.mp4" type="video/mp4" />
                Tarayıcınız video formatını desteklemiyor.
              </video>
            </div>

            <div className="p-5 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">
                    Kullanmaya başlamak için Twitter kullanıcı adınızı girin ve
                    &quot;Analiz Et&quot; butonuna tıklayın.
                  </p>
                </div>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors shadow-sm"
                >
                  Tanıtımı Kapat
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="max-w-4xl mx-auto mb-10">
        <Card className="mb-8 p-8 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#1DA1F2]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Twitter(X) kullanıcı adı (@kullaniciadi)"
                className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent text-base transition-all shadow-sm"
                disabled={loading || isRateLimited}
              />
            </div>
            <Button
              onClick={handleAnalyze}
              className="h-[56px] px-8 py-4 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-lg transition-all font-medium text-base shadow-md md:w-auto w-full"
              disabled={loading || isRateLimited || !username}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Analiz Ediliyor...</span>
                </div>
              ) : isRateLimited ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-pulse h-5 w-5 bg-white rounded-full"></div>
                  <span>Lütfen bekleyin...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Analiz Et</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </Button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Kullanıcı adını girerek Twitter verilerine dayalı kapsamlı analiz
            elde edebilirsiniz.
          </p>
        </Card>
      </div>

      {/* Eski hata mesajı yerine, isRateLimited false iken normal hata mesajlarını göster */}
      {error && !isRateLimited && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded mb-6 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Rate limit durumunda sadece sayacı göster, hata mesajını değil */}
      {isRateLimited && (
        <RateLimitCountdown
          seconds={rateLimitSeconds}
          onComplete={handleRateLimitComplete}
        />
      )}

      {loading && !isRateLimited && (
        <div className="flex flex-col items-center justify-center my-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#1DA1F2] mb-4"></div>
          <p className="text-gray-600 text-lg">
            Twitter verileri alınıyor, lütfen bekleyin...
          </p>
        </div>
      )}

      {userProfile && !loading && !isRateLimited && (
        <div className="max-w-4xl mx-auto">
          {/* Sekme Menüsü */}
          <div className="flex border-b mb-6 overflow-x-auto">
            <button
              className={`py-3 px-6 focus:outline-none ${
                activeTab === "profile"
                  ? "border-b-2 border-[#1DA1F2] text-[#1DA1F2] font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profil Bilgileri
            </button>
            <button
              className={`py-3 px-6 focus:outline-none ${
                activeTab === "analytics"
                  ? "border-b-2 border-[#1DA1F2] text-[#1DA1F2] font-medium"
                  : "text-gray-500 hover:text-gray-700"
              } ${!userTweets ? "opacity-50" : ""}`}
              onClick={() => userTweets && setActiveTab("analytics")}
            >
              Performans Analizi
            </button>
            <button
              className={`py-3 px-6 focus:outline-none ${
                activeTab === "insights"
                  ? "border-b-2 border-[#1DA1F2] text-[#1DA1F2] font-medium"
                  : "text-gray-500 hover:text-gray-700"
              } ${!insights ? "opacity-50" : ""}`}
              onClick={() => insights && setActiveTab("insights")}
            >
              İçerik Stratejisi
            </button>
          </div>

          {/* Sekme İçeriği */}
          <div className="transition-all duration-300">
            {activeTab === "profile" && renderProfileTab()}
            {activeTab === "analytics" && renderAnalyticsTab()}
            {activeTab === "insights" && renderInsightsTab()}
          </div>
        </div>
      )}
    </div>
  );
}
