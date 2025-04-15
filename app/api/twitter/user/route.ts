/**
 * Twitter API Route for fetching user profile
 */

import { NextRequest, NextResponse } from "next/server";

// Twitter API credentials
const BEARER_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAAANz0gEAAAAAQPUs9kkKIfcQeC9zL8EBSxb0WDU%3DFMfv4Fr6wvDls2o8q0erDIYykiQw9fvBREygQH5O5eXQYBHo4B";

interface TwitterUserResponse {
  data: {
    id: string;
    username: string;
    name: string;
    description?: string;
    profile_image_url?: string;
    public_metrics?: {
      followers_count: number;
      following_count: number;
      tweet_count: number;
      listed_count: number;
    };
    created_at?: string;
    verified?: boolean;
  };
}

interface UserProfileResponse {
  id: string;
  username: string;
  name: string;
  description: string;
  profileImageUrl: string;
  followersCount: number;
  followingCount: number;
  tweetCount: number;
  createdAt: string;
  verified: boolean;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username parameter is required" },
      { status: 400 }
    );
  }

  try {
    const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=description,profile_image_url,public_metrics,created_at,verified`;

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

    const data: TwitterUserResponse = await response.json();

    if (!data.data) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    const userProfile: UserProfileResponse = {
      id: data.data.id,
      username: data.data.username,
      name: data.data.name,
      description: data.data.description || "",
      profileImageUrl: data.data.profile_image_url || "",
      followersCount: data.data.public_metrics?.followers_count || 0,
      followingCount: data.data.public_metrics?.following_count || 0,
      tweetCount: data.data.public_metrics?.tweet_count || 0,
      createdAt: data.data.created_at || "",
      verified: data.data.verified || false,
    };

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Twitter kullanıcı profili alınırken hata:", error);
    return NextResponse.json(
      { error: "Twitter API ile iletişim kurulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}
