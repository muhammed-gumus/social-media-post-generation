import React from "react";

interface FacebookMockupProps {
  content: {
    text: string;
    imageUrl?: string;
    title?: string;
    hashtags?: string[];
  };
  contentType: string;
}

export function FacebookMockup({ content, contentType }: FacebookMockupProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
      {/* Header */}
      <div className="p-4 flex items-center">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
          K
        </div>
        <div className="ml-3">
          <div className="font-semibold">Kullanıcı Adı</div>
          <div className="text-gray-500 text-xs flex items-center">
            <span>3s</span>
            <span className="mx-1">•</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v4l2 2"></path>
            </svg>
          </div>
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
      <div className="px-4 pb-3">
        {contentType === "article" && content.title && (
          <h2 className="text-xl font-bold mb-2">{content.title}</h2>
        )}

        <div className="text-sm whitespace-pre-line">{content.text}</div>

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
        <div className="border-t border-b border-gray-100">
          <img
            src={content.imageUrl}
            alt="Facebook post"
            className="w-full h-auto object-cover max-h-96"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/file.svg";
            }}
          />
        </div>
      )}

      {/* Engagement stats */}
      <div className="px-4 py-2 flex justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <div className="flex -space-x-1">
            <div className="h-4 w-4 rounded-full bg-blue-600 border border-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </div>
            <div className="h-4 w-4 rounded-full bg-red-500 border border-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
          </div>
          <span className="ml-1">138</span>
        </div>
        <div>
          <span>32 yorum</span>
          <span className="mx-1">•</span>
          <span>5 paylaşım</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-around p-1 border-t border-gray-100 text-gray-600">
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
      </div>
    </div>
  );
}
