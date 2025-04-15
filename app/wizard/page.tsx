"use client";

import { useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { WizardProvider, useWizard } from "./wizardContext";

// Import all step components
import LanguageStep from "./steps/LanguageStep";
import PlatformStep from "./steps/PlatformStep";
import ContentTypeStep from "./steps/ContentTypeStep";
import IndustryStep from "./steps/IndustryStep";
import PurposeStep from "./steps/PurposeStep";
import AudienceCategoryStep from "./steps/AudienceCategoryStep";
import AudienceStep from "./steps/AudienceStep";
import ToneStep from "./steps/ToneStep";
import ContentDetailsStep from "./steps/ContentDetailsStep";
import ProfileInfoStep from "./steps/ProfileInfoStep";

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
            : state.selectedPlatform === "tiktok"
            ? "TikTok"
            : ""
        } için nasıl bir içerik türü istiyorsunuz?`;
      case 3:
        return "Adım 4: İçeriğinizin hangi sektöre hitap ettiğini seçin";
      case 4:
        return "Adım 5: İçeriğinizin amacını belirleyin";
      case 5:
        return "Adım 6: Hedef kitle kategorinizi seçin";
      case 6:
        return "Adım 7: Spesifik hedef kitlenizi belirleyin";
      case 7:
        return "Adım 8: İçeriğinizin tonunu seçin";
      case 8:
        return "Adım 9: İçeriğinizi detaylandırın";
      case 9:
        return "Adım 10: Mockup için profil bilgileriniz (opsiyonel)";
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
        return <PurposeStep />;
      case 5:
        return <AudienceCategoryStep />;
      case 6:
        return <AudienceStep />;
      case 7:
        return <ToneStep />;
      case 8:
        return <ContentDetailsStep />;
      case 9:
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
      case 6:
        return !state.selectedAudience;
      case 7:
        return !state.selectedTone;
      case 8:
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
    <div className="container max-w-4xl mx-auto py-8 sm:py-12 px-4">
      <Progress value={state.progress} className="mb-6 sm:mb-8" />

      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">
            {editMode
              ? "İçerik Düzenleme"
              : "Gelişmiş İçerik Oluşturma Sihirbazı"}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {getStepTitle()}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 py-4">
          <form onSubmit={handleSubmit}>{renderCurrentStep()}</form>
        </CardContent>

        <CardFooter className="flex justify-between px-4 sm:px-6 pb-4 sm:pb-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={state.currentStep === 0}
            className="text-sm sm:text-base px-3 sm:px-4"
          >
            Geri
          </Button>

          {state.currentStep < totalSteps - 1 ? (
            <Button
              onClick={nextStep}
              disabled={isNextDisabled()}
              className="text-sm sm:text-base px-3 sm:px-4"
            >
              İleri
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              className="text-sm sm:text-base px-3 sm:px-4"
            >
              {editMode ? "İçeriği Güncelle" : "İçerik Oluştur"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}

// Loading fallback component for Suspense
function WizardLoading() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="h-4 w-full bg-gray-200 rounded mb-8"></div>
      <div className="w-full h-96 bg-gray-100 rounded flex items-center justify-center">
        <p>Yükleniyor...</p>
      </div>
    </div>
  );
}

// Wrapper component that provides the wizard context
export default function WizardPage() {
  return (
    <WizardProvider>
      <Suspense fallback={<WizardLoading />}>
        <WizardContent />
      </Suspense>
    </WizardProvider>
  );
}
