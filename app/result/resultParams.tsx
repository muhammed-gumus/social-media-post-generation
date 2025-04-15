"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, ReactNode } from "react";

// Tüm parametre türleri için bir interface oluşturuyoruz
interface ResultParams {
  platform: string;
  contentType: string;
  audience: string;
  audienceCategory: string;
  tone: string;
  username: string;
  profilePhotoUrl: string;
}

// Varsayılan değerler
const defaultParams: ResultParams = {
  platform: "",
  contentType: "",
  audience: "",
  audienceCategory: "demographic",
  tone: "informative",
  username: "",
  profilePhotoUrl: "",
};

// Context for params
const ResultParamsContext = createContext<ResultParams>(defaultParams);

// Hook to use the params
export const useResultParams = () => useContext(ResultParamsContext);

// The wrapper component
export function ResultParamsProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();

  // Extract all params
  const params: ResultParams = {
    platform: searchParams.get("platform") || defaultParams.platform,
    contentType: searchParams.get("contentType") || defaultParams.contentType,
    audience: searchParams.get("audience") || defaultParams.audience,
    audienceCategory:
      searchParams.get("audienceCategory") || defaultParams.audienceCategory,
    tone: searchParams.get("tone") || defaultParams.tone,
    username: searchParams.get("username") || defaultParams.username,
    profilePhotoUrl:
      searchParams.get("profilePhotoUrl") || defaultParams.profilePhotoUrl,
  };

  return (
    <ResultParamsContext.Provider value={params}>
      {children}
    </ResultParamsContext.Provider>
  );
}
