"use client";

import React from "react";
import Link from "next/link";

export default function DisabledTemplatesPage() {
  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Şablonlar</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bu özellik şu anda geliştirme aşamasındadır ve geçici olarak devre
          dışı bırakılmıştır.
        </p>
      </div>

      <div className="bg-muted/30 p-8 rounded-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-4 text-primary"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <h2 className="text-xl font-medium mb-2">
          Geçici Olarak Kullanılamıyor
        </h2>
        <p className="text-muted-foreground mb-6">
          Şablonlar özelliği geliştirme sürecindedir ve yakında tekrar aktif
          edilecektir.
        </p>
        <Link
          href="/"
          className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
