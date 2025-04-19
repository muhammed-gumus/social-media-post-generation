import {
  Zap,
  Users,
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
} from "lucide-react";

export default function PlatformExamplesSection() {
  return (
    <section className="py-20 bg-gray-50 border-y-[8px] border-black">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              <span className="bg-[#ffde59] px-2">Tüm platformlara</span> uygun
              içerikler
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Hedef kitlenize uygun, her platforma özel optimum boyut ve
              formatta içerikler üretin. İster hızlı şablonlar, ister adım adım
              sihirbaz ile profesyonel içerikler oluşturun.
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-black flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold">Yapay zeka destekli</p>
                <p className="text-sm text-gray-600">Modern AI teknolojileri</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold">SEO dostu içerikler</p>
                <p className="text-sm text-gray-600">Etkileşim oranı yüksek</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="aspect-square bg-[#E1306C] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold">
                INSTAGRAM
              </div>
              <div className="h-full flex flex-col">
                <div className="border-2 border-black bg-white flex flex-1 items-center justify-center ">
                  <InstagramIcon className="h-10 w-10" />
                </div>
              </div>
            </div>

            <div className="aspect-square bg-[#14171A] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold">
                X
              </div>
              <div className="h-full flex flex-col">
                <div className="border-2 border-black bg-white flex flex-1 items-center justify-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="40"
                    height="40"
                    viewBox="0 0 30 30"
                  >
                    <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="aspect-square bg-[#0077B5] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold">
                LINKEDIN
              </div>
              <div className="h-full flex flex-col">
                <div className="border-2 border-black bg-white flex flex-1 items-center justify-center ">
                  <LinkedinIcon className="h-10 w-10" />
                </div>
              </div>
            </div>

            <div className="aspect-square bg-[#4267B2] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute top-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold">
                FACEBOOK
              </div>
              <div className="h-full flex flex-col">
                <div className="border-2 border-black bg-white flex flex-1 items-center justify-center ">
                  <FacebookIcon className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
