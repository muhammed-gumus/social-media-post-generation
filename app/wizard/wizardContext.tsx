"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Platform data
const platforms = [
  { id: "instagram", name: "Instagram", icon: "📱" },
  { id: "twitter", name: "X (Twitter)", icon: "🐦" },
  { id: "linkedin", name: "LinkedIn", icon: "💼" },
  { id: "facebook", name: "Facebook", icon: "👍" },
  { id: "tiktok", name: "TikTok", icon: "🎵" },
];

// Languages data
const languages = [
  { id: "tr", name: "Türkçe" },
  { id: "en", name: "English" },
  { id: "de", name: "Deutsch" },
  { id: "fr", name: "Français" },
  { id: "es", name: "Español" },
  { id: "it", name: "Italiano" },
  { id: "ru", name: "Русский" },
  { id: "ar", name: "العربية" },
  { id: "zh", name: "中文" },
];

// Platform specific content types
const platformSpecificContentTypes = {
  instagram: [
    {
      id: "post",
      name: "Gönderi",
      description: "Tek görsel içeriği (1:1 format)",
    },
    {
      id: "story",
      name: "Hikaye",
      description: "24 saatlik dikey içerik (9:16 format)",
    },
    {
      id: "guide",
      name: "Rehber",
      description: "Eğitici ve bilgilendirici içerik serisi",
    },
    {
      id: "carousel",
      name: "Carousel",
      description: "Çoklu görsel içerik (kaydırmalı)",
    },
  ],
  twitter: [
    {
      id: "tweet",
      name: "Tweet",
      description: "Standart metin ve görsel içeriği (280 karakter)",
    },
    {
      id: "thread",
      name: "Flood",
      description: "Birbiriyle bağlantılı tweet serisi (Thread)",
    },
    {
      id: "textOnly",
      name: "Sadece Metin",
      description: "Görselsiz, sade metin içeriği",
    },
    {
      id: "poll",
      name: "Anket",
      description: "Kullanıcı oylaması içeren içerik",
    },
    {
      id: "quote",
      name: "Alıntı Tweet",
      description: "Başka bir tweet'i alıntılayan içerik",
    },
  ],
  linkedin: [
    {
      id: "post",
      name: "Gönderi",
      description: "Profesyonel görsel ve metin içeriği",
    },
    {
      id: "article",
      name: "Makale",
      description: "Uzun formatlı detaylı içerik",
    },
    {
      id: "newsletter",
      name: "Bülten",
      description: "Periyodik profesyonel içerik serisi",
    },
    {
      id: "poll",
      name: "Anket",
      description: "Profesyonel bağlantı ağınızla anket",
    },
    {
      id: "document",
      name: "Doküman",
      description: "PDF veya sunum formatında içerik",
    },
  ],
  facebook: [
    {
      id: "post",
      name: "Gönderi",
      description: "Standart görsel ve metin içeriği",
    },
    {
      id: "longPost",
      name: "Uzun Gönderi",
      description: "Detaylı metin ve görsel içeriği",
    },
    {
      id: "event",
      name: "Etkinlik",
      description: "Etkinlik tanıtım içeriği",
    },
    {
      id: "album",
      name: "Fotoğraf Albümü",
      description: "Çoklu fotoğraf koleksiyonu",
    },
  ],
  tiktok: [
    {
      id: "post",
      name: "Post",
      description: "Kısa ve etkili görsel içerik",
    },
    {
      id: "story",
      name: "Hikaye",
      description: "24 saatlik geçici içerik",
    },
    {
      id: "series",
      name: "Seri İçerik",
      description: "Bölümler halinde bilgi paylaşımı",
    },
  ],
};

// Audience options
const audienceOptions = {
  demographic: [
    { id: "general", name: "Genel", description: "Tüm yaş ve ilgi grupları" },
    {
      id: "gen_z",
      name: "Z Kuşağı",
      description: "16-24 yaş arası genç kullanıcılar",
    },
    {
      id: "millennials",
      name: "Y Kuşağı",
      description: "25-40 yaş arası kullanıcılar",
    },
    {
      id: "gen_x",
      name: "X Kuşağı",
      description: "41-56 yaş arası kullanıcılar",
    },
    {
      id: "boomers",
      name: "Baby Boomers",
      description: "57-75 yaş arası kullanıcılar",
    },
  ],
  professional: [
    {
      id: "professionals",
      name: "Profesyoneller",
      description: "İş dünyasında çalışanlar",
    },
    {
      id: "executives",
      name: "Yöneticiler",
      description: "Üst düzey yöneticiler ve karar vericiler",
    },
    {
      id: "entrepreneurs",
      name: "Girişimciler",
      description: "Kendi işini kuran veya kurmak isteyen kişiler",
    },
    {
      id: "jobSeekers",
      name: "İş Arayanlar",
      description: "Kariyerinde ilerleme veya değişiklik arayanlar",
    },
    {
      id: "remote_workers",
      name: "Uzaktan Çalışanlar",
      description: "Remote veya hibrit çalışanlar",
    },
    {
      id: "freelancers",
      name: "Serbest Çalışanlar",
      description: "Freelancer veya bağımsız çalışanlar",
    },
  ],
  interest: [
    {
      id: "tech",
      name: "Teknoloji meraklıları",
      description: "Teknolojiye ilgi duyanlar",
    },
    {
      id: "fashion",
      name: "Moda takipçileri",
      description: "Moda ve stil konularıyla ilgilenenler",
    },
    {
      id: "health",
      name: "Sağlık bilinci yüksek",
      description: "Sağlıklı yaşam ve wellness odaklı kişiler",
    },
    {
      id: "finance",
      name: "Finans odaklı",
      description: "Yatırım ve finans konularıyla ilgilenenler",
    },
    {
      id: "gaming",
      name: "Oyun severler",
      description: "Video oyunları ve oyun kültürüne ilgi duyanlar",
    },
    {
      id: "travel",
      name: "Seyahat tutkunları",
      description: "Seyahat etmeyi ve yeni yerler keşfetmeyi sevenler",
    },
    {
      id: "art_design",
      name: "Sanat ve Tasarım",
      description: "Görsel sanatlar ve tasarımla ilgilenenler",
    },
  ],
  behavior: [
    {
      id: "early_adopters",
      name: "Erken Benimseyen",
      description: "Yeni ürün ve trendleri ilk deneyen kişiler",
    },
    {
      id: "value_seekers",
      name: "Fiyat/Değer Odaklı",
      description: "İyi fiyat ve değer arayışında olan tüketiciler",
    },
    {
      id: "luxury",
      name: "Lüks Segment",
      description: "Premium ve lüks ürünleri tercih edenler",
    },
    {
      id: "eco_conscious",
      name: "Çevre Bilinci Yüksek",
      description: "Sürdürülebilir ve çevre dostu ürünleri tercih edenler",
    },
    {
      id: "impulse_buyers",
      name: "Anlık Alıcılar",
      description: "Plansız, duygusal kararlarla alışveriş yapanlar",
    },
  ],
  geographic: [
    {
      id: "local",
      name: "Yerel",
      description: "Belirli bir şehir veya bölgedeki kişiler",
    },
    {
      id: "national",
      name: "Ulusal",
      description: "Ülke genelindeki kişiler",
    },
    {
      id: "international",
      name: "Uluslararası",
      description: "Global ölçekte hedefleme",
    },
    {
      id: "urban",
      name: "Kentsel",
      description: "Büyük şehirlerde yaşayanlar",
    },
    {
      id: "rural",
      name: "Kırsal",
      description: "Kırsal bölgelerde yaşayanlar",
    },
  ],
};

// Content tones
const contentTones = [
  {
    id: "informative",
    name: "Bilgilendirici",
    description: "Eğitici ve açıklayıcı ton",
  },
  {
    id: "professional",
    name: "Profesyonel",
    description: "Kurumsal ve resmi dil",
  },
  {
    id: "friendly",
    name: "Samimi",
    description: "Arkadaşça ve ulaşılabilir ton",
  },
  { id: "humorous", name: "Esprili", description: "Mizah içeren rahat dil" },
  {
    id: "inspirational",
    name: "İlham Verici",
    description: "Motive edici ve pozitif",
  },
  {
    id: "authoritative",
    name: "Otoriter",
    description: "Uzman ve güven veren ton",
  },
  {
    id: "emotional",
    name: "Duygusal",
    description: "Duygulara hitap eden içerik",
  },
  {
    id: "controversial",
    name: "Tartışmalı",
    description: "Dikkat çeken ve farklı görüşlere yer veren",
  },
  {
    id: "urgent",
    name: "Acil/Heyecanlı",
    description: "Hızlı aksiyon almaya teşvik eden",
  },
  {
    id: "storytelling",
    name: "Hikaye Anlatımı",
    description: "Anlatı formatında içerik",
  },
];

// Content purposes
const contentPurposes = [
  {
    id: "awareness",
    name: "Farkındalık",
    description: "Marka veya ürün bilinirliğini artırma",
  },
  {
    id: "engagement",
    name: "Etkileşim",
    description: "Beğeni, yorum ve paylaşım oranlarını artırma",
  },
  {
    id: "conversion",
    name: "Dönüşüm",
    description: "Satış veya kayıt gibi somut sonuçlar elde etme",
  },
  {
    id: "loyalty",
    name: "Sadakat",
    description: "Mevcut müşteri bağlılığını güçlendirme",
  },
  {
    id: "education",
    name: "Eğitim",
    description: "Bilgi paylaşımı ve eğitim amacı",
  },
  {
    id: "entertainment",
    name: "Eğlence",
    description: "Eğlendirici ve ilgi çekici içerik",
  },
  {
    id: "thought_leadership",
    name: "Düşünce Liderliği",
    description: "Sektörde otorite olarak konumlandırma",
  },
];

// Industries
const industries = [
  { id: "tech", name: "Teknoloji", icon: "💻" },
  { id: "finance", name: "Finans & Bankacılık", icon: "💰" },
  { id: "healthcare", name: "Sağlık", icon: "🏥" },
  { id: "education", name: "Eğitim", icon: "🎓" },
  { id: "retail", name: "Perakende", icon: "🛍️" },
  { id: "food", name: "Yiyecek & İçecek", icon: "🍽️" },
  { id: "travel", name: "Seyahat & Turizm", icon: "✈️" },
  { id: "fashion", name: "Moda & Güzellik", icon: "👗" },
  { id: "realestate", name: "Gayrimenkul", icon: "🏢" },
  { id: "entertainment", name: "Eğlence & Medya", icon: "🎬" },
  { id: "automotive", name: "Otomotiv", icon: "🚗" },
  { id: "sports", name: "Spor & Fitness", icon: "🏆" },
  { id: "nonprofit", name: "Sivil Toplum", icon: "🤝" },
  { id: "other", name: "Diğer", icon: "📋" },
];

// Define the interface for the wizard state
export interface WizardState {
  // Step tracking
  currentStep: number;
  progress: number;

  // User selections
  selectedPlatform: string;
  selectedContentType: string;
  selectedAudience: string;
  selectedAudienceCategory: string;
  selectedTone: string;
  selectedPurpose: string;
  selectedIndustry: string;
  selectedLanguage: string;

  // Content details
  contentDescription: string;
  contentKeywords: string;
  imageRequired: boolean;
  contentLength: string;

  // Target audience details
  targetAgeRange: string;
  targetGender: string;
  targetLocation: string;

  // Profile information for mockup
  useProfileInfo: boolean;
  username: string;
  profilePhotoUrl: string;

  // Platform specific preferences
  instagramFilter: string;
  twitterCharLimit: number;
  facebookPrivacy: string;
}

// Define the context value interface
interface WizardContextValue {
  state: WizardState;
  setState: React.Dispatch<React.SetStateAction<WizardState>>;
  nextStep: () => void;
  prevStep: () => void;
  resetWizard: () => void;
  submitWizard: () => void;

  // Data accessors
  getPlatforms: () => typeof platforms;
  getLanguages: () => typeof languages;
  getContentTypeOptions: () => {
    id: string;
    name: string;
    description: string;
  }[];
  getAudienceOptions: () => {
    id: string;
    name: string;
    description: string;
  }[];
  getIndustries: () => typeof industries;
  getContentTones: () => typeof contentTones;
  getContentPurposes: () => typeof contentPurposes;

  // Helper functions
  getRecommendedTone: () => string;
  getRecommendedPurpose: () => string;

  // Constants
  totalSteps: number;
}

// Default state
const defaultWizardState: WizardState = {
  currentStep: 0,
  progress: 0,
  selectedPlatform: "",
  selectedContentType: "",
  selectedAudience: "",
  selectedAudienceCategory: "demographic",
  selectedTone: "",
  selectedPurpose: "engagement",
  selectedIndustry: "",
  selectedLanguage: "tr",
  contentDescription: "",
  contentKeywords: "",
  imageRequired: true,
  contentLength: "medium",
  targetAgeRange: "",
  targetGender: "all",
  targetLocation: "",
  useProfileInfo: false,
  username: "",
  profilePhotoUrl: "",
  instagramFilter: "",
  twitterCharLimit: 280,
  facebookPrivacy: "public",
};

// Create the context
export const WizardContext = createContext<WizardContextValue | undefined>(
  undefined
);

// Provider component
export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WizardState>(defaultWizardState);
  const totalSteps = 10;

  // Navigation functions
  const nextStep = () => {
    const nextStepNumber = state.currentStep + 1;

    // Create stronger relationships between steps
    if (state.currentStep === 0 && nextStepNumber === 1) {
      // After platform selection, optimizations for content type
      // Content type options are already filtered by platform in getContentTypeOptions()

      // Pre-select a recommended content type based on platform
      if (
        state.selectedPlatform === "instagram" &&
        !state.selectedContentType
      ) {
        setState((prevState) => ({
          ...prevState,
          selectedContentType: "post", // Default to regular post for Instagram
        }));
      } else if (
        state.selectedPlatform === "linkedin" &&
        !state.selectedContentType
      ) {
        setState((prevState) => ({
          ...prevState,
          selectedContentType: "post", // Default to professional post for LinkedIn
        }));
      }
    }

    if (state.currentStep === 1 && nextStepNumber === 2) {
      // After content type selection, language suggestions based on platform/content
      // Most platforms work well with default language, but certain combinations might benefit from changes

      if (
        state.selectedPlatform === "linkedin" &&
        state.selectedContentType === "article"
      ) {
        // Professional articles often benefit from English for wider reach
        if (state.selectedLanguage === "tr") {
          setState((prevState) => ({
            ...prevState,
            selectedLanguage: "en", // Suggest English for LinkedIn articles
          }));
        }
      }
    }

    if (state.currentStep === 2 && nextStepNumber === 3) {
      // After language selection, suggest relevant industry based on previous selections
      const suggestedIndustry = (() => {
        if (state.selectedPlatform === "linkedin") {
          return "tech"; // Default to tech industry for LinkedIn
        } else if (state.selectedPlatform === "instagram") {
          return "fashion"; // Default to fashion for Instagram
        } else if (state.selectedPlatform === "twitter") {
          return "entertainment"; // Default to entertainment for Twitter
        } else {
          return ""; // No specific suggestion for other platforms
        }
      })();

      if (suggestedIndustry && !state.selectedIndustry) {
        setState((prevState) => ({
          ...prevState,
          selectedIndustry: suggestedIndustry,
        }));
      }
    }

    if (state.currentStep === 3 && nextStepNumber === 4) {
      // After industry selection, suggest a purpose based on platform, content type, and industry
      const suggestedPurpose = (() => {
        // Content type-based purpose suggestions
        if (
          state.selectedContentType === "guide" ||
          state.selectedContentType === "article"
        ) {
          return "education";
        }
        if (
          state.selectedContentType === "post" &&
          state.selectedPlatform === "linkedin"
        ) {
          return "thought_leadership";
        }

        // Industry-based purpose suggestions
        if (state.selectedIndustry === "nonprofit") {
          return "awareness";
        }
        if (
          state.selectedIndustry === "retail" ||
          state.selectedIndustry === "food"
        ) {
          return "conversion";
        }
        if (state.selectedIndustry === "entertainment") {
          return "entertainment";
        }

        // Platform-based purpose suggestions (fallback)
        return getRecommendedPurpose();
      })();

      setState((prevState) => ({
        ...prevState,
        selectedPurpose: suggestedPurpose,
      }));
    }

    if (state.currentStep === 4 && nextStepNumber === 5) {
      // After purpose selection, suggest appropriate audience category based on purpose and platform
      const suggestedCategory = (() => {
        // Platform-specific audience categories
        if (state.selectedPlatform === "linkedin") {
          return "professional";
        }

        // Purpose-specific audience categories
        if (state.selectedPurpose === "thought_leadership") {
          return "professional";
        }
        if (state.selectedPurpose === "conversion") {
          return "behavior";
        }
        if (state.selectedPurpose === "entertainment") {
          return "demographic";
        }

        // Industry-specific audience categories
        if (
          state.selectedIndustry === "finance" ||
          state.selectedIndustry === "realestate"
        ) {
          return "behavior";
        }
        if (
          state.selectedIndustry === "fashion" ||
          state.selectedIndustry === "entertainment"
        ) {
          return "interest";
        }
        if (state.selectedIndustry === "travel") {
          return "geographic";
        }

        return "demographic"; // Default
      })();

      setState((prevState) => ({
        ...prevState,
        selectedAudienceCategory: suggestedCategory,
      }));
    }

    if (state.currentStep === 5 && nextStepNumber === 6) {
      // After audience category selection, audience options will be filtered
      // Logic is already handled by getAudienceOptions()
    }

    if (state.currentStep === 6 && nextStepNumber === 7) {
      // After audience selection, suggest a tone based on all previous selections
      const suggestedTone = (() => {
        // Purpose-based tone suggestions (highest priority)
        if (state.selectedPurpose === "education") return "informative";
        if (state.selectedPurpose === "thought_leadership")
          return "authoritative";
        if (state.selectedPurpose === "entertainment") return "humorous";
        if (state.selectedPurpose === "awareness") return "emotional";
        if (state.selectedPurpose === "loyalty") return "friendly";

        // Audience-based tone suggestions
        if (state.selectedAudience === "gen_z") return "humorous";
        if (state.selectedAudience === "millennials") return "friendly";
        if (
          state.selectedAudience === "executives" ||
          state.selectedAudience === "professionals"
        )
          return "professional";
        if (state.selectedAudience === "early_adopters") return "inspirational";

        // Industry-based tone suggestions
        if (state.selectedIndustry === "healthcare") return "authoritative";
        if (state.selectedIndustry === "entertainment") return "humorous";
        if (state.selectedIndustry === "nonprofit") return "emotional";

        // Content type-based tone suggestions
        if (
          state.selectedContentType === "guide" ||
          state.selectedContentType === "article"
        ) {
          return "informative";
        }

        // Platform-based tone suggestions (lowest priority)
        if (state.selectedPlatform === "linkedin") return "professional";
        if (state.selectedPlatform === "tiktok") return "humorous";
        if (state.selectedPlatform === "instagram") return "inspirational";

        return "friendly"; // Default
      })();

      setState((prevState) => ({
        ...prevState,
        selectedTone: suggestedTone,
      }));
    }

    if (state.currentStep === 7 && nextStepNumber === 8) {
      // After tone selection, pre-populate content details if needed
      // This could include setting default content length based on platform and content type
      const suggestedLength = (() => {
        if (
          state.selectedContentType === "article" ||
          state.selectedContentType === "guide"
        ) {
          return "long";
        }
        if (state.selectedContentType === "thread") {
          return "medium";
        }
        if (
          state.selectedPlatform === "twitter" &&
          state.selectedContentType === "tweet"
        ) {
          return "short";
        }
        return "medium";
      })();

      // Only set if not already specified
      if (state.contentLength === "medium") {
        setState((prevState) => ({
          ...prevState,
          contentLength: suggestedLength,
        }));
      }
    }

    // Update step and progress
    setState((prevState) => ({
      ...prevState,
      currentStep: nextStepNumber,
      progress: (nextStepNumber / totalSteps) * 100,
    }));
  };

  const prevStep = () => {
    const prevStepNumber = state.currentStep - 1;
    setState((prevState) => ({
      ...prevState,
      currentStep: prevStepNumber,
      progress: (prevStepNumber / totalSteps) * 100,
    }));
  };

  const resetWizard = () => {
    setState(defaultWizardState);
  };

  // Submit function
  const submitWizard = () => {
    // Prepare profile data
    const profileData = state.useProfileInfo
      ? `&username=${encodeURIComponent(
          state.username
        )}&profilePhotoUrl=${encodeURIComponent(state.profilePhotoUrl || "")}`
      : "";

    // Prepare additional parameters
    const extendedParams = `&industry=${state.selectedIndustry}&purpose=${
      state.selectedPurpose
    }&contentLength=${state.contentLength}&targetAgeRange=${
      state.targetAgeRange
    }&targetGender=${state.targetGender}&targetLocation=${encodeURIComponent(
      state.targetLocation
    )}`;

    // Platform specific parameters
    let platformSpecificParams = "";
    if (state.selectedPlatform === "instagram" && state.instagramFilter) {
      platformSpecificParams += `&instagramFilter=${state.instagramFilter}`;
    }
    if (state.selectedPlatform === "twitter") {
      platformSpecificParams += `&twitterCharLimit=${state.twitterCharLimit}`;
    }
    if (state.selectedPlatform === "facebook") {
      platformSpecificParams += `&facebookPrivacy=${state.facebookPrivacy}`;
    }

    // Redirect to generate page with all parameters
    window.location.href = `/generate?platform=${
      state.selectedPlatform
    }&contentType=${state.selectedContentType}&audience=${
      state.selectedAudience
    }&audienceCategory=${state.selectedAudienceCategory}&tone=${
      state.selectedTone
    }&imageRequired=${state.imageRequired}&description=${encodeURIComponent(
      state.contentDescription
    )}&keywords=${encodeURIComponent(state.contentKeywords)}&language=${
      state.selectedLanguage
    }${extendedParams}${platformSpecificParams}${profileData}`;
  };

  // Data accessor functions
  const getPlatforms = () => platforms;
  const getLanguages = () => languages;

  const getContentTypeOptions = () => {
    if (!state.selectedPlatform) return [];
    return (
      platformSpecificContentTypes[
        state.selectedPlatform as keyof typeof platformSpecificContentTypes
      ] || []
    );
  };

  const getAudienceOptions = () => {
    // Get base options for the selected category
    const baseOptions =
      audienceOptions[
        state.selectedAudienceCategory as keyof typeof audienceOptions
      ] || audienceOptions.demographic;

    // Sort based on industry and platform
    if (state.selectedIndustry) {
      return [...baseOptions].sort((a) => {
        // Industry-specific prioritization
        if (
          state.selectedIndustry === "finance" &&
          a.id === "finance" &&
          state.selectedAudienceCategory === "interest"
        )
          return -1;
        if (
          state.selectedIndustry === "tech" &&
          a.id === "tech" &&
          state.selectedAudienceCategory === "interest"
        )
          return -1;
        if (
          state.selectedIndustry === "healthcare" &&
          a.id === "health" &&
          state.selectedAudienceCategory === "interest"
        )
          return -1;

        // Platform-specific prioritization
        if (
          state.selectedPlatform === "linkedin" &&
          state.selectedAudienceCategory === "professional"
        ) {
          if (a.id === "professionals" || a.id === "executives") return -1;
        }
        if (
          state.selectedPlatform === "instagram" &&
          state.selectedAudienceCategory === "demographic"
        ) {
          if (a.id === "gen_z" || a.id === "millennials") return -1;
        }
        return 0;
      });
    }
    return baseOptions;
  };

  const getIndustries = () => industries;
  const getContentTones = () => contentTones;
  const getContentPurposes = () => contentPurposes;

  // Recommendation functions
  const getRecommendedPurpose = () => {
    if (state.selectedPlatform === "instagram") return "engagement";
    if (state.selectedPlatform === "twitter") return "awareness";
    if (state.selectedPlatform === "linkedin") return "thought_leadership";
    if (state.selectedPlatform === "facebook") return "engagement";
    if (state.selectedPlatform === "tiktok") return "entertainment";
    return "engagement";
  };

  const getRecommendedTone = () => {
    if (state.selectedPlatform === "linkedin") return "professional";
    if (state.selectedPlatform === "tiktok") return "humorous";
    if (state.selectedContentType === "guide") return "informative";
    if (state.selectedContentType === "article") return "authoritative";
    if (state.selectedContentType === "thread") return "storytelling";
    return "friendly";
  };

  // Create the context value
  const contextValue: WizardContextValue = {
    state,
    setState,
    nextStep,
    prevStep,
    resetWizard,
    submitWizard,
    getPlatforms,
    getLanguages,
    getContentTypeOptions,
    getAudienceOptions,
    getIndustries,
    getContentTones,
    getContentPurposes,
    getRecommendedTone,
    getRecommendedPurpose,
    totalSteps,
  };

  return (
    <WizardContext.Provider value={contextValue}>
      {children}
    </WizardContext.Provider>
  );
}

// Custom hook for accessing the wizard context
export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};
