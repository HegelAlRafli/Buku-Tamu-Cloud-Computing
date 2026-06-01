import Link from 'next/link';
import { QrCode, ScanLine, LayoutDashboard, Crown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <Crown className="h-8 w-8 text-[#d4af37] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-playfair font-bold text-2xl tracking-wide text-white">Buku Tamu</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                href="/generate"
                className="border-transparent text-slate-300 hover:border-[#d4af37] hover:text-[#d4af37] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR
              </Link>
              <Link
                href="/scan"
                className="border-transparent text-slate-300 hover:border-[#d4af37] hover:text-[#d4af37] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300"
              >
                <ScanLine className="w-4 h-4 mr-2" />
                Scan QR
              </Link>
              <Link
                href="/dashboard"
                className="border-transparent text-slate-300 hover:border-[#d4af37] hover:text-[#d4af37] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
