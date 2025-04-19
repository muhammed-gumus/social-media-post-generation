"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  text: string;
}

export default function SubmitButton({
  isLoading,
  loadingText,
  text,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-[#ffde59] text-black font-bold py-3 px-4 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] transition-shadow disabled:opacity-50"
    >
      {isLoading ? loadingText : text}
      {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
    </button>
  );
}
