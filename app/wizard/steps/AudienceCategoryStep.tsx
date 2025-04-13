"use client";

import { useWizard } from "../wizardContext";

export default function AudienceCategoryStep() {
  const { state, setState } = useWizard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-all ${
          state.selectedAudienceCategory === "demographic"
            ? "border-primary bg-primary/10"
            : ""
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "demographic",
          }))
        }
      >
        <div className="font-medium">Demografi</div>
        <div className="text-sm text-gray-500">
          Yaş ve demografi bazlı hedef kitle
        </div>
      </div>
      <div
        className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-all ${
          state.selectedAudienceCategory === "professional"
            ? "border-primary bg-primary/10"
            : ""
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "professional",
          }))
        }
      >
        <div className="font-medium">Profesyonel</div>
        <div className="text-sm text-gray-500">
          Kariyer ve iş dünyası odaklı
        </div>
      </div>
      <div
        className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-all ${
          state.selectedAudienceCategory === "interest"
            ? "border-primary bg-primary/10"
            : ""
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "interest",
          }))
        }
      >
        <div className="font-medium">İlgi Alanı</div>
        <div className="text-sm text-gray-500">
          İlgi ve hobi bazlı hedef kitle
        </div>
      </div>
      <div
        className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-all ${
          state.selectedAudienceCategory === "behavior"
            ? "border-primary bg-primary/10"
            : ""
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "behavior",
          }))
        }
      >
        <div className="font-medium">Davranışsal</div>
        <div className="text-sm text-gray-500">
          Tüketici davranışlarına göre
        </div>
      </div>
      <div
        className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-all ${
          state.selectedAudienceCategory === "geographic"
            ? "border-primary bg-primary/10"
            : ""
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "geographic",
          }))
        }
      >
        <div className="font-medium">Coğrafi</div>
        <div className="text-sm text-gray-500">Konum bazlı hedefleme</div>
      </div>
    </div>
  );
}
