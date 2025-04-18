"use client";

import {
  ArrowLeft,
  BarChart3,
  CameraIcon,
  CheckCircle,
  FileText,
  Info,
  LayoutTemplate,
  Mail,
  Megaphone
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function TemplatesPage() {
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 bg-gray-50">
      <div className="w-full max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-block p-2 px-4 bg-[#ffde59] text-black rounded-none mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="flex items-center gap-2 font-bold">
              <LayoutTemplate size={16} />
              Şablonlar
            </span>
          </div>
          <div>
            <h1 className="font-black text-center mb-4 text-5xl md:text-6xl leading-[1.1] tracking-tight">
              Hazır{" "}
              <span className="bg-black text-white px-2">İçerikler</span>
            </h1>
            <p className="text-xl mb-8 font-medium text-gray-800 max-w-2xl mx-auto">
              İhtiyacınıza uygun içerik şablonları seçerek içerik oluşturma
              sürecinizi hızlandırın. Blog yazıları, sosyal medya paylaşımları
              ve daha fazlası için hazır şablonlar.
            </p>
          </div>
        </div>

        {showTutorial && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="rounded-none border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="p-5 bg-white border-b-2 border-black">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-black flex items-center gap-2">
                    <CameraIcon className="h-6 w-6" />
                    İçerik Şablonları Tanıtımı
                  </h3>
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="text-gray-600 cursor-pointer hover:text-black focus:outline-none"
                    aria-label="Tanıtımı kapat"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <p className="text-gray-700 mb-0">
                  Şablonlar aracımızla içerik oluşturma sürecinizi hızlandırın.
                  Bu görsel, şablonları nasıl kullanabileceğinizi ve
                  içeriklerinizi nasıl geliştirebileceğinizi göstermektedir.
                </p>
              </div>

                <div className="relative pb-[56.25%] h-0 overflow-hidden border-b-2 border-black">
                <Image
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src="/template-banner.png"
                  alt="İçerik şablonları tanıtımı"
                  fill
                />
                </div>

              <div className="px-6 py-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center mb-3 sm:mb-0">
                    <div className="bg-[#ffde59] text-black p-2 border-2 border-black mr-3">
                      <Info size={20} />
                    </div>
                    <p className="text-sm text-gray-700">
                      Bu özellik şu anda geliştirme aşamasındadır ve yakında
                      aktif edilecektir.
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-[#ffde59] text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300">
                    Haberdar Ol
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showTutorial && (
          <div className="text-center my-8">
            <button
              onClick={() => setShowTutorial(true)}
              className="px-4 py-2 bg-white text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300 inline-flex items-center"
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              Tanıtım Görseli
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
              <FileText size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Blog Yazıları</h3>
            <p className="text-gray-700 mb-4">
              SEO dostu blog yazıları oluşturmak için şablonlar. Farklı başlık
              ve içerik yapılarıyla okuyucularınızı etkileyin.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-black" />
                Konu başlıkları ve alt başlıklar
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-black" />
                SEO uyumlu içerik
              </li>
            </ul>
          </div>

          <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
              <BarChart3 size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Sosyal Medya İçerikleri</h3>
            <p className="text-gray-700 mb-4">
              Farklı sosyal platformlar için optimize edilmiş şablonlar ile
              dikkat çekici paylaşımlar oluşturun.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-black" />
                Platform özelinde boyutlandırma
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-black" />
                Etkileşim odaklı içerik
              </li>
            </ul>
          </div>

          <div className="border-2 border-black p-6 bg-white hover:translate-y-[-8px] transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mb-4">
              <Mail size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">E-Posta Şablonları</h3>
            <p className="text-gray-700 mb-4">
              E-posta pazarlama kampanyalarınız için yüksek dönüşüm sağlayan
              şablonları kullanın.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-black" />
                Açılma oranı yüksek başlıklar
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-black" />
                Dönüşüm odaklı içerik yapısı
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 text-center">
          <div className="bg-white p-8 rounded-none border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 max-w-3xl mx-auto">
            <div className="mb-4 w-12 h-12 bg-[#ffde59] border-2 border-black flex items-center justify-center mx-auto">
              <Megaphone size={20} className="text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Çok Yakında...
            </h3>
            <p className="text-gray-700">
              Şablonlar özelliğimiz çok yakında hizmetinizde olacak. Bu özellik
              sayesinde farklı içerik türleri için hazır şablonlar kullanarak
              içerik üretim sürecinizi hızlandırabileceksiniz.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-[#ffde59] text-black font-bold hover:translate-y-[-4px] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-flex items-center"
          >
            <ArrowLeft className="mr-2" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}
