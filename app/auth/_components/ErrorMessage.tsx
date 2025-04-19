import React from "react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 text-center">
      {message}
    </div>
  );
}
