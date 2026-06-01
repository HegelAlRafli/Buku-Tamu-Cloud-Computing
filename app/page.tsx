import Link from "next/link";
import { QrCode, ScanLine, LayoutDashboard, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-8 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl -z-10 mix-blend-screen" />

      <div className="text-center max-w-4xl mb-16 relative z-10 animate-fade-in-up">

        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
          Buku Tamu <span className="text-[#d4af37] italic">Digital</span>
        </h1>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
        <Link href="/generate" className="group">
          <div className="h-full bg-slate-800/50 backdrop-blur-xl rounded-2xl p-10 border border-slate-700/50 hover:border-[#d4af37]/50 hover:bg-slate-800/80 transition-all duration-500 flex flex-col items-center text-center shadow-2xl hover:-translate-y-2">
            <div className="bg-slate-900 p-5 rounded-full mb-8 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500 border border-slate-700">
              <QrCode className="w-12 h-12 text-[#d4af37]" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-4 tracking-wide">Generate QR</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Ciptakan akses QR Code unik dan berkelas untuk setiap tamu undangan kehormatan Anda.
            </p>
          </div>
        </Link>

        <Link href="/scan" className="group">
          <div className="h-full bg-slate-800/50 backdrop-blur-xl rounded-2xl p-10 border border-slate-700/50 hover:border-[#d4af37]/50 hover:bg-slate-800/80 transition-all duration-500 flex flex-col items-center text-center shadow-2xl hover:-translate-y-2">
            <div className="bg-slate-900 p-5 rounded-full mb-8 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500 border border-slate-700">
              <ScanLine className="w-12 h-12 text-[#d4af37]" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-4 tracking-wide">Scan QR</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Validasi kehadiran tamu undangan secara instan melalui pemindaian presisi tinggi.
            </p>
          </div>
        </Link>

        <Link href="/dashboard" className="group">
          <div className="h-full bg-slate-800/50 backdrop-blur-xl rounded-2xl p-10 border border-slate-700/50 hover:border-[#d4af37]/50 hover:bg-slate-800/80 transition-all duration-500 flex flex-col items-center text-center shadow-2xl hover:-translate-y-2">
            <div className="bg-slate-900 p-5 rounded-full mb-8 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500 border border-slate-700">
              <LayoutDashboard className="w-12 h-12 text-[#d4af37]" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-4 tracking-wide">Executive Dashboard</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Pantau laporan analitik kehadiran secara real-time melalui dasbor eksekutif premium.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
