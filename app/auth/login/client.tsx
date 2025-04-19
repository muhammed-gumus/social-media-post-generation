"use client";

import Link from "next/link";
import { useState } from "react";
import { UserIcon, KeyIcon } from "lucide-react";
import AuthLayout from "../_components/AuthLayout";
import AuthHeader from "../_components/AuthHeader";
import FormInput from "../_components/FormInput";
import SubmitButton from "../_components/SubmitButton";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login functionality - would connect to your auth service
    try {
      // Simulate login request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Redirect would happen here after successful login
      window.location.href = "/wizard";
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Giriş Yap"
        subtitle="Hesabınıza giriş yaparak içerik üretimine başlayın"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="E-posta Adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="ornek@mail.com"
          Icon={UserIcon}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          Icon={KeyIcon}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 border-2 border-black focus:ring-[#ffde59]"
            />
            <label
              htmlFor="remember_me"
              className="ml-2 block text-sm text-gray-800"
            >
              Beni hatırla
            </label>
          </div>

          <div className="text-sm">
            <Link href="#" className="font-semibold text-black hover:underline">
              Şifremi unuttum
            </Link>
          </div>
        </div>

        <div>
          <SubmitButton
            isLoading={isLoading}
            loadingText="Giriş Yapılıyor..."
            text="Giriş Yap"
          />
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Henüz bir hesabınız yok mu?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-black hover:underline"
          >
            Kaydol
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
