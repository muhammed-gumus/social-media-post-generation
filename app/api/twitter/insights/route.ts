/**
 * API Route for generating Twitter insights using advanced AI analysis
 */

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/gemini";

interface Tweet {
  text: string;
  createdAt: string;
  publicMetrics: {
    retweetCount: number;
    replyCount: number;
    likeCount: number;
    quoteCount: number;
    impressionCount?: number;
  };
}

interface TwitterUserProfile {
  username: string;
  name: string;
  description: string;
  followersCount: number;
  followingCount: number;
  tweetCount: number;
  createdAt: string;
  verified: boolean;
}

interface TwitterUserTweets {
  tweets: Tweet[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userProfile,
      userTweets,
    }: { userProfile: TwitterUserProfile; userTweets: TwitterUserTweets } =
      body;

    if (!userProfile || !userTweets) {
      return NextResponse.json(
        {
          error: "userProfile and userTweets are required in the request body",
        },
        { status: 400 }
      );
    }

    // Create a prompt for the AI analysis
    const prompt = `
      Bir Twitter kullanıcısının profil ve tweetlerini analiz et ve içerik stratejisi tavsiyeleri sun.
      
      ## KULLANICI PROFİLİ:
      - Kullanıcı Adı: ${userProfile.username}
      - İsim: ${userProfile.name}
      - Bio: ${userProfile.description}
      - Takipçi Sayısı: ${userProfile.followersCount}
      - Takip Edilen: ${userProfile.followingCount}
      - Tweet Sayısı: ${userProfile.tweetCount}
      - Oluşturulma Tarihi: ${userProfile.createdAt}
      - Doğrulanmış Hesap: ${userProfile.verified ? "Evet" : "Hayır"}
      
      ## SON TWEETLER VE PERFORMANSLARI:
      ${userTweets.tweets
        .map(
          (tweet: Tweet) => `
      Tweet: "${tweet.text}"
      Tarih: ${tweet.createdAt}
      Retweet: ${tweet.publicMetrics.retweetCount}
      Yanıt: ${tweet.publicMetrics.replyCount}
      Beğeni: ${tweet.publicMetrics.likeCount}
      Alıntı: ${tweet.publicMetrics.quoteCount}
      ${
        tweet.publicMetrics.impressionCount
          ? `Görüntülenme: ${tweet.publicMetrics.impressionCount}`
          : ""
      }
      `
        )
        .join("\n")}
      
      ## ANALİZ VE TAVSİYELER:
      - Bu Twitter profilini ve içerik geçmişini analiz et
      - En yüksek etkileşim alan içerik türlerini belirle
      - Kullanıcının hedef kitlesine uygun içerik stratejisi öner
      - Takipçi sayısını artırmak için tavsiyeler sun
      - İçerik için en uygun paylaşım zamanlarını öner
      - Tweet dilini ve tonunu analiz et, geliştirme önerileri sun
      - Popüler hashtagler ve trend konular hakkında öneriler sun
      
      Lütfen bu analizi detaylı ve kapsamlı şekilde yap. İçerik stratejisi geliştiricisi gibi davran ve somuţ, uygulanabilir tavsiyeler sun.
    `;

    try {
      // Yapay zeka analiz servisi çağrısı
      const insights = await generateText(prompt);
      return NextResponse.json({ insights });
    } catch (error) {
      console.error("Twitter içgörüleri oluşturulurken hata:", error);
      return NextResponse.json(
        { error: "İçgörü analizi oluşturulurken bir hata oluştu." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("İstek işlenirken hata:", error);
    return NextResponse.json(
      { error: "İstek işlenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
