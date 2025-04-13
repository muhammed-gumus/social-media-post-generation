"use client";

import { useWizard } from "../wizardContext";

export default function ContentTypeStep() {
  const { state, setState, getContentTypeOptions } = useWizard();
  const contentTypeOptions = getContentTypeOptions();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contentTypeOptions.map((type) => (
        <div
          key={type.id}
          className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-all ${
            state.selectedContentType === type.id
              ? "border-primary bg-primary/10"
              : ""
          }`}
          onClick={() =>
            setState((prev) => ({ ...prev, selectedContentType: type.id }))
          }
        >
          <div className="font-medium">{type.name}</div>
          <div className="text-sm text-gray-500">{type.description}</div>
        </div>
      ))}
    </div>
  );
}
