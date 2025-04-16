import Link from "next/link";
import {
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-10 mt-auto bg-gray-50 border-t-4 border-black">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top section with logo and main links */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24 mb-12">
          {/* Branding and description */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-4xl text-black socreate-logo">
                socreate
              </span>
            </Link>

            <p className="text-base font-medium mb-6 max-w-md">
              Yapay zeka destekli araçlarımız ile sosyal medya için etkileyici
              içerikler oluşturun ve dijital varlığınızı güçlendirin.
            </p>

            {/* Newsletter signup with neubrutalist style */}
            <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000]">
              <h4 className="text-lg font-bold mb-3">
                Güncellemelerden Haberdar Ol
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full p-2 border-2 border-black bg-white focus:outline-none"
                />
                <button className="bg-[#ffde59] hover:bg-yellow-400 border-2 border-black text-black px-4 flex items-center justify-center transition-colors shadow-[2px_2px_0px_#000] hover:shadow-[1px_1px_0px_#000]">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation links with neubrutalist styling */}
          <div className="md:col-span-3 hidden md:block">
            <h4 className="font-bold mb-5 text-lg">Hızlı Erişim</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-base font-medium hover:underline decoration-[3px] decoration-[#ffde59] underline-offset-4 transition-all"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/wizard"
                  className="text-base font-medium hover:underline decoration-[3px] decoration-[#ffde59] underline-offset-4 transition-all"
                >
                  İçerik Oluştur
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-base font-medium hover:underline decoration-[3px] decoration-[#ffde59] underline-offset-4 transition-all"
                >
                  Hazır İçerikler
                </Link>
              </li>
              <li>
                <Link
                  href="/twitter-insights"
                  className="text-base font-medium hover:underline decoration-[3px] decoration-[#ffde59] underline-offset-4 transition-all"
                >
                  Twitter Analizi
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="md:col-span-4">
            <h4 className="font-bold mb-5 text-lg">Bizi Takip Edin</h4>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="#"
                className="bg-white text-black border-2 border-black p-3 flex items-center gap-3 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <Instagram size={20} />
                <span className="font-medium">Instagram</span>
              </Link>
              <Link
                href="#"
                className="bg-white text-black border-2 border-black p-3 flex items-center gap-3 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <Twitter size={20} />
                <span className="font-medium">Twitter</span>
              </Link>
              <Link
                href="#"
                className="bg-white text-black border-2 border-black p-3 flex items-center gap-3 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <Linkedin size={20} />
                <span className="font-medium">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="bg-white text-black border-2 border-black p-3 flex items-center gap-3 shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                <Facebook size={20} />
                <span className="font-medium">Facebook</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="pt-8 border-t-2 border-black flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="text-center md:text-left">
            <p className="font-medium text-base">
              &copy; {new Date().getFullYear()} socreate | Tüm hakları saklıdır
            </p>
          </div>

          <div className="flex gap-6">
            <Link
              href="#"
              className="font-medium text-base hover:underline decoration-[#ffde59] decoration-2 underline-offset-4"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="#"
              className="font-medium text-base hover:underline decoration-[#ffde59] decoration-2 underline-offset-4"
            >
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
