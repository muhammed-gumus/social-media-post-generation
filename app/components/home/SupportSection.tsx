// filepath: /Users/muhammedgumus/Desktop/blog-post-generation/client/app/components/home/SupportSection.tsx
import { Coffee } from "lucide-react";
import Link from "next/link";

export default function SupportSection() {
  return (
    <section className="py-16 border-t-[4px] border-black bg-gradient-to-r from-amber-50 to-amber-100">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="bg-[#ffde59] px-2">Destek</span> Olun
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-gray-700 mb-6">
            socreate&apos;i geliştirmek için büyük bir zaman ve kaynak harcıyoruz.
            Daha fazla özellik eklemek ve daha iyi sonuçlar sunabilmek için
            desteğinize ihtiyacımız var.
          </p>
          <p className="text-gray-700 mb-6">
            Platformdan memnun kaldıysanız, bir kahve ısmarlayarak socreate&apos;in
            gelişimine katkıda bulunabilirsiniz!
          </p>
        </div>

        <Link
          href="https://www.buymeacoffee.com/mgumus4102c"
          target="_blank"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFDD00] border-2 border-black 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
            transition-all font-bold text-black"
        >
          <Coffee size={24} className="text-black" />
          <span>Bana Bir Kahve Ismarla</span>
        </Link>

        <div className="mt-8 text-sm text-gray-600">
          <p>Desteğiniz bu platformun sürdürülebilirliği için çok değerli.</p>
          <p>Her kahve, bu aracı daha da geliştirmemize yardımcı olacak!</p>
        </div>
      </div>
    </section>
  );
}
