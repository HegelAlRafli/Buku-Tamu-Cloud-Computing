"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode } from "lucide-react";

export default function QRGenerator() {
  const [guestName, setGuestName] = useState("");
  const [eventName, setEventName] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const generateQR = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !eventName) return;

    try {
      const qrData = JSON.stringify({
        guest_name: guestName,
        event_name: eventName,
      });

      const url = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: "#0f172a", // Navy color for QR code modules
          light: "#ffffff",
        },
      });

      setQrDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `Access_${guestName.replace(/\s+/g, '_')}_${eventName.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700 max-w-4xl mx-auto flex flex-col md:flex-row">
      <div className="p-10 w-full md:w-1/2 border-b md:border-b-0 md:border-r border-slate-700/50">
        <form onSubmit={generateQR} className="space-y-8">
          <div>
            <label htmlFor="guestName" className="block text-sm font-medium text-slate-300 mb-2 tracking-wide uppercase text-xs">
              Nama Tamu
            </label>
            <input
              type="text"
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="block w-full rounded-lg bg-slate-900 border border-slate-600 text-white shadow-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] px-4 py-3 transition-colors duration-300"
              placeholder="Contoh: Bapak Budi Santoso"
              required
            />
          </div>

          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-slate-300 mb-2 tracking-wide uppercase text-xs">
              Nama Acara / Event
            </label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="block w-full rounded-lg bg-slate-900 border border-slate-600 text-white shadow-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] px-4 py-3 transition-colors duration-300"
              placeholder="Contoh: Royal Wedding 2026"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.2)] text-sm font-bold text-slate-900 bg-[#d4af37] hover:bg-[#ebd074] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-[#d4af37] transition-all duration-300 uppercase tracking-wider"
          >
            Generate Access Code
          </button>
        </form>
      </div>

      <div className="p-10 w-full md:w-1/2 flex flex-col items-center justify-center bg-slate-800/40 relative">
        {qrDataUrl ? (
          <div className="flex flex-col items-center space-y-8 animate-fade-in-up">
            <div className="p-4 bg-white rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.15)] border-4 border-[#d4af37]/20">
              <img src={qrDataUrl} alt="Generated QR" className="w-56 h-56" />
            </div>
            <button
              onClick={downloadQR}
              className="flex items-center space-x-2 text-[#d4af37] hover:text-[#ebd074] font-medium transition-colors border border-[#d4af37]/30 px-6 py-2.5 rounded-full hover:bg-[#d4af37]/10"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-slate-500 space-y-4">
            <div className="p-6 rounded-full border border-slate-700 border-dashed">
              <QrCode className="w-16 h-16 opacity-30" />
            </div>
            <p className="text-sm text-center font-light leading-relaxed">
              Silakan isi formulir di samping<br />untuk mencetak QR Code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
