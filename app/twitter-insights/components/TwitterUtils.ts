import {
  TwitterUserProfile,
  TwitterUserTweets,
} from "@/lib/services/twitterService";

// Renk şeması
export const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

// Tweet içeriklerini analiz ederek tür bazında gruplar
export const calculateContentTypes = (userTweets: TwitterUserTweets | null) => {
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
export const getTopTweets = (userTweets: TwitterUserTweets | null) => {
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
export const prepareEngagementTimelineData = (
  userTweets: TwitterUserTweets | null
) => {
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
export const calculateAverageEngagements = (
  userTweets: TwitterUserTweets | null,
  userProfile: TwitterUserProfile | null
) => {
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
      value: ((likes + retweets + replies) / tweetCount / followerCount) * 100,
    },
  ];
};
