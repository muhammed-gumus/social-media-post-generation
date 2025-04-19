import React from "react";
import BackToHomeLink from "./BackToHomeLink";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <BackToHomeLink />
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
