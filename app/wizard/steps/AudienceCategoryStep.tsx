"use client";

import { useWizard } from "../wizardContext";

export default function AudienceCategoryStep() {
  const { state, setState } = useWizard();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        className={`p-4 border-2 relative cursor-pointer transition-all hover:translate-y-[-4px] ${
          state.selectedAudienceCategory === "demographic"
            ? "border-black bg-[#ffde59] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            : "border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "demographic",
          }))
        }
      >
        {state.selectedAudienceCategory === "demographic" && (
          <div
            className="absolute top-0 right-0 w-0 h-0 
            border-t-[20px] border-t-black 
            border-l-[20px] border-l-transparent"
          ></div>
        )}
        <div className="font-bold">Demografi</div>
        <div className="text-sm text-gray-700 mt-1">
          Yaş ve demografi bazlı hedef kitle
        </div>
      </div>

      <div
        className={`p-4 border-2 relative cursor-pointer transition-all hover:translate-y-[-4px] ${
          state.selectedAudienceCategory === "professional"
            ? "border-black bg-[#ffde59] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            : "border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "professional",
          }))
        }
      >
        {state.selectedAudienceCategory === "professional" && (
          <div
            className="absolute top-0 right-0 w-0 h-0 
            border-t-[20px] border-t-black 
            border-l-[20px] border-l-transparent"
          ></div>
        )}
        <div className="font-bold">Profesyonel</div>
        <div className="text-sm text-gray-700 mt-1">
          Kariyer ve iş dünyası odaklı
        </div>
      </div>

      <div
        className={`p-4 border-2 relative cursor-pointer transition-all hover:translate-y-[-4px] ${
          state.selectedAudienceCategory === "interest"
            ? "border-black bg-[#ffde59] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            : "border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "interest",
          }))
        }
      >
        {state.selectedAudienceCategory === "interest" && (
          <div
            className="absolute top-0 right-0 w-0 h-0 
            border-t-[20px] border-t-black 
            border-l-[20px] border-l-transparent"
          ></div>
        )}
        <div className="font-bold">İlgi Alanı</div>
        <div className="text-sm text-gray-700 mt-1">
          İlgi ve hobi bazlı hedef kitle
        </div>
      </div>

      <div
        className={`p-4 border-2 relative cursor-pointer transition-all hover:translate-y-[-4px] ${
          state.selectedAudienceCategory === "behavior"
            ? "border-black bg-[#ffde59] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            : "border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "behavior",
          }))
        }
      >
        {state.selectedAudienceCategory === "behavior" && (
          <div
            className="absolute top-0 right-0 w-0 h-0 
            border-t-[20px] border-t-black 
            border-l-[20px] border-l-transparent"
          ></div>
        )}
        <div className="font-bold">Davranışsal</div>
        <div className="text-sm text-gray-700 mt-1">
          Tüketici davranışlarına göre
        </div>
      </div>

      <div
        className={`p-4 border-2 relative cursor-pointer transition-all hover:translate-y-[-4px] ${
          state.selectedAudienceCategory === "geographic"
            ? "border-black bg-[#ffde59] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            : "border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
        onClick={() =>
          setState((prev) => ({
            ...prev,
            selectedAudienceCategory: "geographic",
          }))
        }
      >
        {state.selectedAudienceCategory === "geographic" && (
          <div
            className="absolute top-0 right-0 w-0 h-0 
            border-t-[20px] border-t-black 
            border-l-[20px] border-l-transparent"
          ></div>
        )}
        <div className="font-bold">Coğrafi</div>
        <div className="text-sm text-gray-700 mt-1">Konum bazlı hedefleme</div>
      </div>
    </div>
  );
}
