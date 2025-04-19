import { ImageIcon, FileText } from "lucide-react";

export default function TechSection() {
  return (
    <section className="py-16 border-t-[4px] border-black">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm font-bold text-gray-700 mb-6">
          KULLANDIĞIMIZ TEKNOLOJİLER
        </p>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <div className="px-6 py-3 bg-[#ffde59] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 font-bold">
            <ImageIcon size={20} className="text-black" />
            <span>Gelişmiş Görsel Oluşturma Teknolojisi</span>
          </div>
          <div className="px-6 py-3 bg-[#ffde59] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 font-bold">
            <FileText size={20} className="text-black" />
            <span>Üstün Yapay Zeka Metin Modeli</span>
          </div>
        </div>
        <p className="text-xs text-gray-700 mt-6 border-t-2 border-black pt-4">
          Tüm veriler güvenle korunur ve KVKK ile uyumludur.
        </p>
      </div>
    </section>
  );
}
