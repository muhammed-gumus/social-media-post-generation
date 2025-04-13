import React from "react";

interface InstagramMockupProps {
  content: {
    text: string;
    imageUrl?: string;
    title?: string;
    hashtags?: string[];
  };
  contentType: string;
}

export function InstagramMockup({
  content,
  contentType,
}: InstagramMockupProps) {
  const isStory = contentType === "story";

  if (isStory) {
    return (
      <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl overflow-hidden shadow-lg aspect-[9/16]">
        <div className="h-full w-full flex flex-col relative p-4">
          {/* Story content */}
          {content.imageUrl && content.imageUrl !== "/file.svg" ? (
            <div className="absolute inset-0">
              <img
                src={content.imageUrl}
                alt="Story image"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/file.svg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"></div>
          )}

          {/* Header */}
          <div className="flex items-center mb-auto z-10">
            <div className="h-8 w-8 rounded-full bg-white p-0.5 flex-shrink-0">
              <div className="h-full w-full rounded-full bg-gray-200"></div>
            </div>
            <div className="ml-2 text-white text-sm font-semibold">
              username
            </div>
            <div className="ml-auto">
              <div className="text-white text-xs">13s</div>
            </div>
          </div>

          {/* Text */}
          <div className="mt-auto z-10 p-4">
            <div className="text-white font-medium text-lg shadow-sm">
              {content.text}
            </div>

            {/* Hashtags */}
            {content.hashtags && content.hashtags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {content.hashtags.map((tag, idx) => (
                  <span key={idx} className="text-white text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Regular Instagram post
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded overflow-hidden shadow">
      {/* Header */}
      <div className="flex items-center p-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5 flex-shrink-0">
          <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
            <div className="h-[calc(100%-2px)] w-[calc(100%-2px)] rounded-full bg-gray-200"></div>
          </div>
        </div>
        <div className="ml-3 font-semibold text-sm">username</div>
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

      {/* Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {content.imageUrl && content.imageUrl !== "/file.svg" ? (
          <img
            src={content.imageUrl}
            alt="Instagram post"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/file.svg";
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3 flex">
        <div className="flex space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
        </div>
        <div className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.5 20h-15A2.5 2.5 0 0 1 0 17.5v-15A2.5 2.5 0 0 1 2.5 0h15A2.5 2.5 0 0 1 20 2.5v15a2.5 2.5 0 0 1-2.5 2.5z"></path>
          </svg>
        </div>
      </div>

      {/* Caption */}
      <div className="px-3 pb-3">
        <div className="text-sm">
          <span className="font-semibold mr-1">username</span>
          {content.text}
        </div>

        {/* Hashtags */}
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="mt-1 text-sm text-blue-900">
            {content.hashtags.map((tag, idx) => (
              <span key={idx} className="mr-1">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-1 text-gray-400 text-xs">View all comments</div>
      </div>
    </div>
  );
}
