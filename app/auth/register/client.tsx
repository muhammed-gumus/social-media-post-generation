"use client";

import Link from "next/link";
import { useState } from "react";
import { KeyIcon, MailIcon, UserCircleIcon } from "lucide-react";
import AuthLayout from "../_components/AuthLayout";
import AuthHeader from "../_components/AuthHeader";
import FormInput from "../_components/FormInput";
import SubmitButton from "../_components/SubmitButton";
import ErrorMessage from "../_components/ErrorMessage";

export default function RegisterClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }

    setIsLoading(true);

    // Mock registration functionality - would connect to your auth service
    try {
      // Simulate registration request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Redirect would happen here after successful registration
      window.location.href = "/wizard";
    } catch (error) {
      console.error("Registration error:", error);
      setError("Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Hesap Oluştur"
        subtitle="Kayıt olarak hemen içerik üretimine başlayın"
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <ErrorMessage message={error} />

        <FormInput
          id="name"
          name="name"
          type="text"
          label="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder="İsim Soyisim"
          Icon={UserCircleIcon}
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="E-posta Adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="ornek@mail.com"
          Icon={MailIcon}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          placeholder="••••••••"
          Icon={KeyIcon}
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Şifre Tekrar"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          placeholder="••••••••"
          Icon={KeyIcon}
        />

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 border-2 border-black focus:ring-[#ffde59]"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-800">
            <span>
              <a href="#" className="font-semibold text-black hover:underline">
                Kullanım Şartları
              </a>{" "}
              ve{" "}
              <a href="#" className="font-semibold text-black hover:underline">
                Gizlilik Politikası
              </a>
              &apos;nı kabul ediyorum
            </span>
          </label>
        </div>

        <div>
          <SubmitButton
            isLoading={isLoading}
            loadingText="Kaydınız Oluşturuluyor..."
            text="Kayıt Ol"
          />
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Zaten bir hesabınız var mı?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-black hover:underline"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
