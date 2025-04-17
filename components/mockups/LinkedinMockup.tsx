import React from "react";
import Image from "next/image";

interface LinkedinMockupProps {
  content: {
    text: string;
    imageUrl?: string;
    title?: string;
    hashtags?: string[];
  };
  contentType: string;
  username?: string;
  profilePhotoUrl?: string;
}

export function LinkedinMockup({ content, contentType, username = "İsim Soyisim", profilePhotoUrl }: LinkedinMockupProps) {
  const isArticle = contentType === "article";

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
      {/* Header */}
      <div className="p-4 flex">
        {profilePhotoUrl ? (
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={profilePhotoUrl}
              alt="Profil fotoğrafı"
              className="w-full h-full object-cover"
              width={48}
              height={48}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://i.pravatar.cc/150?u=${encodeURIComponent(username)}`;
              }}
            />
          </div>
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0" />
        )}
        <div className="ml-3">
          <div className="font-semibold">{username}</div>
          <div className="text-gray-500 text-sm">
            Profesyonel • 3. derece bağlantı
          </div>
          <div className="text-gray-400 text-xs">14s • 🌐</div>
        </div>
        <div className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        {isArticle && content.title && (
          <h2 className="text-xl font-bold mb-2">{content.title}</h2>
        )}
        <div className="text-sm">{content.text}</div>

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="mt-2 text-sm text-blue-600">
            {content.hashtags.map((tag, idx) => (
              <span key={idx} className="mr-1">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      {content.imageUrl && content.imageUrl !== "/file.svg" && (
        <div className="mt-2 border-t border-gray-100">
          <Image
            src={content.imageUrl}
            alt="LinkedIn post"
            className={`w-full h-auto object-cover ${
              isArticle ? "aspect-[2/1]" : "max-h-96"
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/file.svg";
            }}
            width={500}
            height={500}
          />
        </div>
      )}

      {/* Engagement stats */}
      <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex items-center">
          <div className="flex -space-x-1">
            <div className="h-4 w-4 rounded-full bg-blue-500 border border-white"></div>
            <div className="h-4 w-4 rounded-full bg-green-500 border border-white"></div>
            <div className="h-4 w-4 rounded-full bg-red-500 border border-white"></div>
          </div>
          <span className="ml-1">42</span>
          <span className="mx-1">•</span>
          <span>8 yorum</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-around p-1 border-t border-gray-100 text-gray-500">
        <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <span className="ml-1 text-sm">Beğen</span>
        </button>
        <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="ml-1 text-sm">Yorum Yap</span>
        </button>
        <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span className="ml-1 text-sm">Paylaş</span>
        </button>
        <button className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          <span className="ml-1 text-sm">Gönder</span>
        </button>
      </div>
    </div>
  );
}
