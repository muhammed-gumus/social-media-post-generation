"use client";

import { useWizard } from "../wizardContext";

export default function LanguageStep() {
  const { state, setState, getLanguages } = useWizard();
  const languages = getLanguages();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {languages.map((language) => (
        <div
          key={language.id}
          className={`p-4 border-2 relative cursor-pointer text-center transition-all hover:translate-y-[-4px] ${
            state.selectedLanguage === language.id
              ? "border-black bg-[#ffde59] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              : "border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
          onClick={() =>
            setState((prev) => ({ ...prev, selectedLanguage: language.id }))
          }
        >
          {state.selectedLanguage === language.id && (
            <div
              className="absolute top-0 right-0 w-0 h-0 
              border-t-[20px] border-t-black 
              border-l-[20px] border-l-transparent"
            ></div>
          )}
          <div className="font-bold">{language.name}</div>
        </div>
      ))}
    </div>
  );
}
