import Link from "next/link";
import { WandSparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-24 md:py-32 relative bg-gray-50 border-b-[8px] border-black">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-full max-w-md relative hidden md:block">
              {/* Circle bottom left */}
              <div className="absolute -bottom-3 -left-2 w-5 h-5 rounded-full bg-white border-2 border-black z-10"></div>
            </div>
            <span className="mb-6 px-3 py-1 border-2 border-black bg-[#ffde59] text-black font-bold text-sm inline-flex items-center">
              YAPAY ZEKA DESTEKLİ İÇERİK ÜRETİMİ
            </span>

            <h1 className="text-5xl md:text-6xl font-black mb-6 text-black leading-[1.1] tracking-tight">
              Sosyal medya içerik üretimini{" "}
              <span className="bg-black text-white px-2">otomatikleştirin</span>
            </h1>

            <p className="text-xl mb-8 font-medium text-gray-800">
              Yapay zeka destekli araçlarımızla sosyal medya platformları için
              profesyonel ve etkileyici içerikler oluşturun.
            </p>

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <Link
                href="/wizard"
                className="px-6 py-3 bg-[#ffde59] text-black font-bold hover:translate-y-[-4px] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
              >
                <WandSparkles size={20} className="mr-2" />
                Şimdi Başlayın
                <ArrowRight size={18} className="ml-2" />
              </Link>

              {/* <Link
                href="/templates"
                className="px-6 py-3 bg-white text-black font-bold hover:translate-y-[-4px] transition-transform duration-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
              >
                <LayoutTemplate size={20} className="mr-2" />
                Hazır Şablonlar
              </Link> */}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md relative">
              {/* Circle bottom left */}
              <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-white border-2 border-black z-10"></div>

              {/* Image with neubrutalist styling */}
              <div className="relative border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Image
                  src="/banner-img.png"
                  alt="Hero Image"
                  width={800}
                  height={600}
                  className="w-full h-auto border-2 border-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
