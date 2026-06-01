import QRGenerator from "@/components/QRGenerator";
import { QrCode } from "lucide-react";

export default function GeneratePage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d4af37]/5 rounded-[100%] blur-3xl -z-10 pointer-events-none" />

      <div className="text-center mb-16 animate-fade-in-up">
        <div className="inline-flex items-center justify-center p-3 bg-slate-800/80 rounded-full mb-6 border border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <QrCode className="w-8 h-8 text-[#d4af37]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white tracking-wide">
          Generate Access Code
        </h1>
        <p className="mt-4 text-lg text-slate-400 font-light max-w-2xl mx-auto">
          Buat QR Code akses masuk untuk tamu undangan.
        </p>
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <QRGenerator />
      </div>
    </div>
  );
}
