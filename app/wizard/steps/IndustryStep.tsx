"use client";

import { useWizard } from "../wizardContext";

export default function IndustryStep() {
  const { state, setState, getIndustries } = useWizard();
  const industries = getIndustries();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {industries.map((industry) => (
        <div
          key={industry.id}
          className={`p-4 border rounded-lg cursor-pointer text-center hover:border-primary transition-all ${
            state.selectedIndustry === industry.id
              ? "border-primary bg-primary/10"
              : ""
          }`}
          onClick={() =>
            setState((prev) => ({ ...prev, selectedIndustry: industry.id }))
          }
        >
          <div className="text-3xl mb-2">{industry.icon}</div>
          <div className="font-medium">{industry.name}</div>
        </div>
      ))}
    </div>
  );
}
