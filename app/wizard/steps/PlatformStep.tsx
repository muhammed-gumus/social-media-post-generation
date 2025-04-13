"use client";

import { useWizard } from "../wizardContext";

export default function PlatformStep() {
  const { state, setState, getPlatforms } = useWizard();
  const platforms = getPlatforms();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {platforms.map((platform) => (
        <div
          key={platform.id}
          className={`p-4 border rounded-lg cursor-pointer text-center hover:border-primary transition-all ${
            state.selectedPlatform === platform.id
              ? "border-primary bg-primary/10"
              : ""
          }`}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              selectedPlatform: platform.id,
              // Reset content type when platform changes
              selectedContentType: "",
            }))
          }
        >
          <div className="text-3xl mb-2">{platform.icon}</div>
          <div className="font-medium">{platform.name}</div>
        </div>
      ))}
    </div>
  );
}
