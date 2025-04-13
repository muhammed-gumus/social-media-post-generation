export const dynamic = "force-dynamic";

// app/generate/page.tsx
import { Suspense } from "react";
import GenerateClient from "./client";
import { GenerateParamsProvider } from "./generateParams";

export default function GeneratePage() {
  return (
    <Suspense
      fallback={
        <div className="container max-w-2xl mx-auto py-16 px-4 text-center">
          Yükleniyor...
        </div>
      }
    >
      <GenerateParamsProvider>
        <GenerateClient />
      </GenerateParamsProvider>
    </Suspense>
  );
}
