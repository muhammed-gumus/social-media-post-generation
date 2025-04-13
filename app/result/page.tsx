import { Suspense } from 'react';
import ResultClient from "./client";
import { ResultParamsProvider } from './resultParams';

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="container max-w-6xl mx-auto py-8 px-4 text-center">Yükleniyor...</div>}>
      <ResultParamsProvider>
        <ResultClient />
      </ResultParamsProvider>
    </Suspense>
  );
}
