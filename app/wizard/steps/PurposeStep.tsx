"use client";

import { useWizard } from "../wizardContext";

export default function PurposeStep() {
  const { state, setState, getContentPurposes } = useWizard();
  const contentPurposes = getContentPurposes();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contentPurposes.map((purpose) => (
        <div
          key={purpose.id}
          className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-all ${
            state.selectedPurpose === purpose.id
              ? "border-primary bg-primary/10"
              : ""
          }`}
          onClick={() =>
            setState((prev) => ({ ...prev, selectedPurpose: purpose.id }))
          }
        >
          <div className="font-medium">{purpose.name}</div>
          <div className="text-sm text-gray-500">{purpose.description}</div>
        </div>
      ))}
    </div>
  );
}
