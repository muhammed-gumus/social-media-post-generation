"use client";

import { useWizard } from "../wizardContext";

export default function ToneStep() {
  const { state, setState, getContentTones } = useWizard();
  const contentTones = getContentTones();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contentTones.map((tone) => (
        <div
          key={tone.id}
          className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-all ${
            state.selectedTone === tone.id ? "border-primary bg-primary/10" : ""
          }`}
          onClick={() =>
            setState((prev) => ({ ...prev, selectedTone: tone.id }))
          }
        >
          <div className="font-medium">{tone.name}</div>
          <div className="text-sm text-gray-500">{tone.description}</div>
        </div>
      ))}
    </div>
  );
}
