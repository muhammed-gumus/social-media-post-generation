"use client";

import { useState, useEffect } from "react";

// Rate limit countdown timer component
export function RateLimitCountdown({
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
