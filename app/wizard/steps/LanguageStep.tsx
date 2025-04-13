"use client";

import { useWizard } from "../wizardContext";

export default function LanguageStep() {
  const { state, setState, getLanguages } = useWizard();
  const languages = getLanguages();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {languages.map((language) => (
        <div
          key={language.id}
          className={`p-4 border rounded-lg cursor-pointer text-center hover:border-primary transition-all ${
            state.selectedLanguage === language.id
              ? "border-primary bg-primary/10"
              : ""
          }`}
          onClick={() =>
            setState((prev) => ({ ...prev, selectedLanguage: language.id }))
          }
        >
          <div className="font-medium">{language.name}</div>
        </div>
      ))}
    </div>
  );
}
