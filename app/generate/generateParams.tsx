"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, ReactNode } from "react";

// Tüm parametre türleri için bir interface oluşturuyoruz
interface GenerateParams {
  platform: string;
  contentType: string;
  audience: string;
  audienceCategory: string;
  tone: string;
  description: string;
  keywords: string;
  imageRequired: boolean;
  language: string;
  purpose: string;
  industry: string;
  contentLength: string;
  targetAgeRange: string;
  targetGender: string;
  targetLocation: string;
  instagramFilter: string;
  twitterCharLimit: string;
  facebookPrivacy: string;
  username: string;
  profilePhotoUrl: string;
}

// Varsayılan değerler
const defaultParams: GenerateParams = {
  platform: "",
  contentType: "",
  audience: "",
  audienceCategory: "demographic",
  tone: "informative",
  description: "",
  keywords: "",
  imageRequired: true,
  language: "tr",
  purpose: "engagement",
  industry: "",
  contentLength: "medium",
  targetAgeRange: "",
  targetGender: "all",
  targetLocation: "",
  instagramFilter: "",
  twitterCharLimit: "280",
  facebookPrivacy: "public",
  username: "",
  profilePhotoUrl: "",
};

// Context for params
const GenerateParamsContext = createContext<GenerateParams>(defaultParams);

// Hook to use the params
export const useGenerateParams = () => useContext(GenerateParamsContext);

// The wrapper component
export function GenerateParamsProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();

  // Extract all params
  const params: GenerateParams = {
    platform: searchParams.get("platform") || defaultParams.platform,
    contentType: searchParams.get("contentType") || defaultParams.contentType,
    audience: searchParams.get("audience") || defaultParams.audience,
    audienceCategory:
      searchParams.get("audienceCategory") || defaultParams.audienceCategory,
    tone: searchParams.get("tone") || defaultParams.tone,
    description: searchParams.get("description") || defaultParams.description,
    keywords: searchParams.get("keywords") || defaultParams.keywords,
    imageRequired: searchParams.get("imageRequired") !== "false",
    language: searchParams.get("language") || defaultParams.language,
    purpose: searchParams.get("purpose") || defaultParams.purpose,
    industry: searchParams.get("industry") || defaultParams.industry,
    contentLength:
      searchParams.get("contentLength") || defaultParams.contentLength,
    targetAgeRange:
      searchParams.get("targetAgeRange") || defaultParams.targetAgeRange,
    targetGender:
      searchParams.get("targetGender") || defaultParams.targetGender,
    targetLocation:
      searchParams.get("targetLocation") || defaultParams.targetLocation,
    instagramFilter:
      searchParams.get("instagramFilter") || defaultParams.instagramFilter,
    twitterCharLimit:
      searchParams.get("twitterCharLimit") || defaultParams.twitterCharLimit,
    facebookPrivacy:
      searchParams.get("facebookPrivacy") || defaultParams.facebookPrivacy,
    username: searchParams.get("username") || defaultParams.username,
    profilePhotoUrl:
      searchParams.get("profilePhotoUrl") || defaultParams.profilePhotoUrl,
  };

  return (
    <GenerateParamsContext.Provider value={params}>
      {children}
    </GenerateParamsContext.Provider>
  );
}
