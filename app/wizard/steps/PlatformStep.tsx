"use client";

import { useWizard } from "../wizardContext";

export default function PlatformStep() {
  const { state, setState, getPlatforms } = useWizard();
  const platforms = getPlatforms();

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
      {platforms.map((platform) => (
        <div
          key={platform.id}
          className={`p-4 border-2 relative cursor-pointer text-center transition-all hover:translate-y-[-4px] ${
            state.selectedPlatform === platform.id
              ? "border-black bg-[#ffde59] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              : "border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
          {state.selectedPlatform === platform.id && (
            <div
              className="absolute top-0 right-0 w-0 h-0 
              border-t-[20px] border-t-black 
              border-l-[20px] border-l-transparent"
            ></div>
          )}
          <div className="text-3xl mb-3">{platform.icon}</div>
          <div className="font-bold">{platform.name}</div>
        </div>
      ))}
    </div>
  );
}
