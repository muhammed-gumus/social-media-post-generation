/**
 * Twitter API Route for fetching user tweets
 */

import { NextRequest, NextResponse } from "next/server";

// Twitter API credentials
const BEARER_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAAANz0gEAAAAAQPUs9kkKIfcQeC9zL8EBSxb0WDU%3DFMfv4Fr6wvDls2o8q0erDIYykiQw9fvBREygQH5O5eXQYBHo4B";

interface TwitterTweet {
  id: string;
  text: string;
  created_at: string;
  public_metrics?: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    impression_count?: number;
  };
}

interface ProcessedTweet {
  id: string;
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const count = searchParams.get("count") || "10";

  if (!userId) {
    return NextResponse.json(
      { error: "userId parameter is required" },
      { status: 400 }
    );
  }

  try {
    const url = `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=created_at,public_metrics&max_results=${count}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Twitter API error: ${response.status} ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.data) {
      return NextResponse.json({ tweets: [] });
    }

    const tweets: ProcessedTweet[] = data.data.map((tweet: TwitterTweet) => ({
      id: tweet.id,
      text: tweet.text,
      createdAt: tweet.created_at,
      publicMetrics: {
        retweetCount: tweet.public_metrics?.retweet_count || 0,
        replyCount: tweet.public_metrics?.reply_count || 0,
        likeCount: tweet.public_metrics?.like_count || 0,
        quoteCount: tweet.public_metrics?.quote_count || 0,
        impressionCount: tweet.public_metrics?.impression_count,
      },
    }));

    return NextResponse.json({ tweets });
  } catch (error) {
    console.error("Twitter gönderileri alınırken hata:", error);
    return NextResponse.json(
      { error: "Twitter API ile iletişim kurulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}
