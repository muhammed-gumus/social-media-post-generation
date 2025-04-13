import React from "react";
import Image from "next/image";

interface TwitterMockupProps {
  content: {
    text: string;
    imageUrl?: string;
    title?: string;
    hashtags?: string[];
    profileInfo?: {
      username: string;
      photoUrl: string;
    };
  };
  contentType: string;
}

export function TwitterMockup({ content, contentType }: TwitterMockupProps) {
  const isThread = contentType === "thread";
  const { profileInfo } = content;

  // Extract username without @ if it exists
  const displayUsername = profileInfo?.username || "Kullanıcı Adı";
  const formattedUsername = profileInfo?.username
    ? profileInfo.username.startsWith("@")
      ? profileInfo.username
      : `@${profileInfo.username}`
    : "@username";

  // Get handle part after @
  const handle = formattedUsername.replace("@", "");

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden shadow">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        {profileInfo?.photoUrl ? (
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={profileInfo.photoUrl}
              alt="Profil fotoğrafı"
              className="w-full h-full object-cover"
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `https://i.pravatar.cc/150?u=${encodeURIComponent(
                  handle
                )}`;
              }}
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0" />
        )}
        <div className="ml-3">
          <div className="font-bold">{displayUsername}</div>
          <div className="text-gray-500 text-sm">{formattedUsername}</div>
        </div>
        <div className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#1DA1F2"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="whitespace-pre-wrap">
          {isThread ? (
            <div className="font-medium text-sm">
              {content.text.split("\n\n")[0]}
              {content.text.includes("\n\n") && (
                <span className="text-blue-500"> Show this thread</span>
              )}
            </div>
          ) : (
            <div className="font-medium text-sm">{content.text}</div>
          )}
        </div>

        {/* Image */}
        {content.imageUrl && content.imageUrl !== "/file.svg" && (
          <div className="mt-3 rounded-xl overflow-hidden">
            <img
              src={content.imageUrl}
              alt="Tweet image"
              className="w-full h-auto object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/file.svg";
              }}
            />
          </div>
        )}

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {content.hashtags.map((tag, idx) => (
              <span key={idx} className="text-blue-500 text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-around p-2 border-t border-gray-100 text-gray-500">
        <div className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div className="p-2 rounded-full hover:bg-green-50 hover:text-green-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        </div>
        <div className="p-2 rounded-full hover:bg-red-50 hover:text-red-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <div className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
        </div>
      </div>

      {/* Date and Twitter info */}
      <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-100">
        {new Date().toLocaleTimeString()} · {new Date().toLocaleDateString()} ·
        Twitter for {Math.random() > 0.5 ? "iPhone" : "Web"}
      </div>
    </div>
  );
}
