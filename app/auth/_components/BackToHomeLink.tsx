import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToHomeLink() {
  return (
    <div className="mb-8">
      <Link
        href="/"
        className="inline-flex items-center text-black font-semibold hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
