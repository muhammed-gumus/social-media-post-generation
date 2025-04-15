"use client";

import {
  TwitterUserProfile,
  TwitterUserTweets,
} from "@/lib/services/twitterService";
import { Card } from "@/components/ui/card";
import { TwitterMockup } from "@/components/mockups/TwitterMockup";
import { getTopTweets } from "./TwitterUtils";
import Image from "next/image";

interface ProfileTabProps {
  userProfile: TwitterUserProfile;
  userTweets: TwitterUserTweets | null;
}

export function ProfileTab({ userProfile, userTweets }: ProfileTabProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-lg border-t-4 border-blue-500">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative w-20 h-20">
            {userProfile.profileImageUrl && (
              <Image
                src={userProfile.profileImageUrl}
                alt={userProfile.name}
                fill
                className="rounded-full border-4 border-white shadow-md object-cover"
              />
            )}
            {userProfile.verified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1.5 border-2 border-white z-10">
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
            {getTopTweets(userTweets).map((tweet, index) => (
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
}
