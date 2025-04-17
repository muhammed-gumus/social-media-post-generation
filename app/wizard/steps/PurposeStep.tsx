"use client";

import { useWizard } from "../wizardContext";

export default function PurposeStep() {
  const { state, setState, getContentPurposes } = useWizard();
  const contentPurposes = getContentPurposes();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contentPurposes.map((purpose) => (
        <div
          key={purpose.id}
          className={`p-4 border-2 relative cursor-pointer transition-all hover:translate-y-[-4px] ${
            state.selectedPurpose === purpose.id
              ? "border-black bg-[#ffde59] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              : "border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
          onClick={() =>
            setState((prev) => ({ ...prev, selectedPurpose: purpose.id }))
          }
        >
          {state.selectedPurpose === purpose.id && (
            <div
              className="absolute top-0 right-0 w-0 h-0 
              border-t-[20px] border-t-black 
              border-l-[20px] border-l-transparent"
            ></div>
          )}
          <div className="font-bold">{purpose.name}</div>
          <div className="text-sm text-gray-700 mt-1">
            {purpose.description}
          </div>
        </div>
      ))}
    </div>
  );
}
