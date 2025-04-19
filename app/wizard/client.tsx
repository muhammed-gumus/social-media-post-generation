"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { WizardProvider, useWizard } from "./wizardContext";

// Import all step components
import AudienceCategoryStep from "./steps/AudienceCategoryStep";
import AudienceStep from "./steps/AudienceStep";
import ContentDetailsStep from "./steps/ContentDetailsStep";
import ContentTypeStep from "./steps/ContentTypeStep";
import IndustryStep from "./steps/IndustryStep";
import LanguageStep from "./steps/LanguageStep";
import PlatformStep from "./steps/PlatformStep";
import ProfileInfoStep from "./steps/ProfileInfoStep";
import ToneStep from "./steps/ToneStep";

// Main wizard component that handles the step navigation
function WizardContent() {
  const { state, setState, nextStep, prevStep, submitWizard, totalSteps } =
    useWizard();

  // URL parameters for edit mode
  const searchParams = useSearchParams();
  const editMode = searchParams.get("edit") === "true";
  const urlPlatform = searchParams.get("platform") || "";
  const urlContentType = searchParams.get("contentType") || "";
  const urlAudience = searchParams.get("audience") || "";

  // For edit mode, load values from URL parameters
  useEffect(() => {
    if (editMode && urlPlatform) {
      setState((prev) => ({
        ...prev,
        selectedPlatform: urlPlatform,
        selectedContentType: urlContentType || prev.selectedContentType,
        selectedAudience: urlAudience || prev.selectedAudience,
      }));
    }
  }, [editMode, urlPlatform, urlContentType, urlAudience, setState]);

  // Get the correct step title based on current step
  const getStepTitle = () => {
    switch (state.currentStep) {
      case 0:
        return "Adım 1: İçeriğinizin dilini seçin";
      case 1:
        return "Adım 2: Hangi platform için içerik oluşturmak istersiniz?";
      case 2:
        return `Adım 3: ${
          state.selectedPlatform === "twitter"
            ? "X (Twitter)"
            : state.selectedPlatform === "instagram"
            ? "Instagram"
            : state.selectedPlatform === "linkedin"
            ? "LinkedIn"
            : state.selectedPlatform === "facebook"
            ? "Facebook"
            : ""
        } için nasıl bir içerik türü istiyorsunuz?`;
      case 3:
        return "Adım 4: İçeriğinizin hangi sektöre hitap ettiğini seçin";
      case 4:
        return "Adım 5: Hedef kitle kategorinizi seçin";
      case 5:
        return "Adım 6: Spesifik hedef kitlenizi belirleyin";
      case 6:
        return "Adım 7: İçeriğinizin tonunu seçin";
      case 7:
        return "Adım 8: İçeriğinizi detaylandırın";
      case 8:
        return "Adım 9: Mockup için profil bilgileriniz (opsiyonel)";
      default:
        return "İçerik Oluşturma Sihirbazı";
    }
  };

  // Render the current step component
  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 0:
        return <LanguageStep />;
      case 1:
        return <PlatformStep />;
      case 2:
        return <ContentTypeStep />;
      case 3:
        return <IndustryStep />;
      case 4:
        return <AudienceCategoryStep />;
      case 5:
        return <AudienceStep />;
      case 6:
        return <ToneStep />;
      case 7:
        return <ContentDetailsStep />;
      case 8:
        return <ProfileInfoStep />;
      default:
        return <div>Bilinmeyen adım</div>;
    }
  };

  // Check if the next button should be disabled
  const isNextDisabled = () => {
    switch (state.currentStep) {
      case 0:
        return !state.selectedLanguage;
      case 1:
        return !state.selectedPlatform;
      case 2:
        return !state.selectedContentType;
      case 3:
        return !state.selectedIndustry;
      case 5:
        return !state.selectedAudience;
      case 6:
        return !state.selectedTone;
      case 7:
        return !state.contentDescription;
      default:
        return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitWizard();
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 bg-gray-50">
      <div className="text-center mb-8">
        <span className="inline-block mb-4 px-3 py-1 border-2 border-black bg-[#ffde59] text-black font-bold text-sm">
          {state.currentStep + 1} / {totalSteps}
        </span>
        <h1 className="text-4xl font-black mb-3 tracking-tight">
          <span className="bg-black text-white px-2">
            {editMode ? "İçerik Düzenleme" : "İçerik"}
          </span>{" "}
          {editMode ? "" : "Oluşturma"}
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 border-2 border-black p-2 bg-white">
        <div className="relative h-6 w-full bg-white">
          <div
            className="absolute h-full bg-[#ffde59]"
            style={{ width: `${state.progress}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-black">
              {Math.round(state.progress)}%
            </span>
          </div>
        </div>
      </div>

      <div className="border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        {/* Neobrutalist circles */}
        <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#ffde59] border-2 border-black z-10"></div>
        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border-2 border-black z-10"></div>

        <div className="border-b-2 border-black p-6">
          <h2 className="text-2xl font-black">
            {editMode
              ? "İçerik Düzenleme"
              : "Gelişmiş İçerik Oluşturma Sihirbazı"}
          </h2>
          <p className="text-gray-800 font-medium mt-1">{getStepTitle()}</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>{renderCurrentStep()}</form>
        </div>

        <div className="flex justify-between p-6 border-t-2 border-black">
          <button
            type="button"
            onClick={prevStep}
            disabled={state.currentStep === 0}
            className="px-6 py-3 bg-white text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0"
          >
            Geri
          </button>

          {state.currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={isNextDisabled()}
              className="px-6 py-3 bg-[#ffde59] text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0"
            >
              İleri
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#ffde59] text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300"
            >
              {editMode ? "İçeriği Güncelle" : "İçerik Oluştur"}
            </button>
          )}
        </div>
      </div>

      {/* <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block px-4 py-2 border-2 border-black text-black font-medium hover:bg-[#ffde59] transition-colors duration-300"
        >
          Ana Sayfaya Dön
        </Link>
      </div> */}
    </div>
  );
}

// Loading fallback component for Suspense
function WizardLoading() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 bg-gray-50">
      <div className="text-center mb-8">
        <span className="inline-block mb-4 px-3 py-1 border-2 border-black bg-gray-200 text-black font-bold text-sm">
          YÜKLENIYOR
        </span>
        <h1 className="text-4xl font-black mb-3 tracking-tight">
          <span className="bg-black text-white px-2">İçerik</span> Oluşturma
        </h1>
      </div>

      <div className="h-6 w-full border-2 border-black mb-8 relative">
        <div className="absolute top-0 left-0 h-full w-1/3 bg-gray-300 animate-pulse"></div>
      </div>

      <div className="border-2 border-black bg-white h-96 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-4 border-b-4 border-black rounded-full animate-spin mb-4"></div>
          <p className="font-bold text-xl">Yükleniyor...</p>
        </div>
      </div>
    </div>
  );
}

// Main client component that provides the wizard context
export default function WizardClient() {
  return (
    <WizardProvider>
      <Suspense fallback={<WizardLoading />}>
        <WizardContent />
      </Suspense>
    </WizardProvider>
  );
}
