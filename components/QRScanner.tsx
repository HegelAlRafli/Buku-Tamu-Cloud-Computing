"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface ScanResult {
  status: "idle" | "success" | "error" | "loading";
  message: string;
}

export default function QRScanner() {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const lastScanTimeRef = useRef<number>(0);
  const [scanResult, setScanResult] = useState<ScanResult>({ status: "idle", message: "" });

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.error("Audio beep failed", e);
    }
  };

  useEffect(() => {
    // Pastikan DOM bersih sebelum inisialisasi
    const el = document.getElementById("qr-reader");
    if (el) el.innerHTML = "";

    // Initialize scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    scannerRef.current = scanner;

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      try {
        scanner.clear().catch((e) => {
          console.warn("Scanner clear error ignored:", e);
        });
      } catch (err) {
        console.warn("Scanner cleanup warning:", err);
      }
      
      // Paksa bersihkan sisa UI jika clear() library gagal (React StrictMode fix)
      setTimeout(() => {
        const element = document.getElementById("qr-reader");
        if (element) element.innerHTML = "";
      }, 100);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScanSuccess = async (decodedText: string) => {
    const now = Date.now();
    // Prevent double scan within 5 seconds
    if (now - lastScanTimeRef.current < 5000) {
      return;
    }
    
    lastScanTimeRef.current = now;
    setScanResult({ status: "loading", message: "Memvalidasi akses..." });

    try {
      const data = JSON.parse(decodedText);
      
      if (!data.guest_name || !data.event_name) {
        throw new Error("Format QR Code tidak valid");
      }

      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: data.guest_name,
          event_name: data.event_name,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal mencatat kehadiran");
      }

      playBeep();
      setScanResult({
        status: "success",
        message: `Akses Diberikan: ${data.guest_name}`,
      });
      
    } catch (err: any) {
      console.error(err);
      setScanResult({
        status: "error",
        message: err.message || "Akses Ditolak: QR Code tidak valid",
      });
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setScanResult({ status: "idle", message: "" });
    }, 5000);
  };

  const onScanFailure = (error: any) => {
    // Suppress regular scan failure errors as they happen constantly when no QR is in view
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700 max-w-2xl mx-auto p-10 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
      
      {/* Global CSS to override html5-qrcode default styling to match dark theme */}
      <style dangerouslySetInnerHTML={{__html: `
        #qr-reader { border: none !important; }
        #qr-reader video { transform: none !important; }
        #qr-reader__scan_region { background: #0f172a; border-radius: 0.5rem; overflow: hidden; }
        #qr-reader__dashboard { color: #cbd5e1; padding: 1rem 0; }
        #qr-reader button { background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer; transition: all 0.3s; }
        #qr-reader button:hover { background: #334155; color: white; border-color: #d4af37; }
        #qr-reader__camera_selection { background: #1e293b; color: white; border: 1px solid #334155; padding: 0.5rem; border-radius: 0.375rem; }
        #qr-reader__dashboard_section_csr span, #qr-reader__dashboard_section_swaplink { color: #d4af37 !important; }
      `}} />

      <div id="qr-reader" className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-inner"></div>
      
      <div className="mt-10 h-28 flex items-center justify-center">
        {scanResult.status === "idle" && (
          <div className="flex flex-col items-center animate-pulse">
            <div className="w-12 h-1 bg-[#d4af37] rounded-full mb-4 opacity-50"></div>
            <p className="text-slate-400 text-center font-light tracking-wide">Arahkan kamera ke QR Code tamu</p>
          </div>
        )}
        
        {scanResult.status === "loading" && (
          <div className="flex flex-col items-center space-y-3 text-[#d4af37]">
            <Loader2 className="animate-spin w-8 h-8" />
            <span className="font-medium tracking-wide">{scanResult.message}</span>
          </div>
        )}
        
        {scanResult.status === "success" && (
          <div className="flex flex-col items-center text-[#d4af37] bg-[#d4af37]/10 w-full py-5 rounded-xl border border-[#d4af37]/30 shadow-[0_0_20px_rgba(212,175,55,0.1)] animate-fade-in-up">
            <CheckCircle2 className="w-10 h-10 mb-2 drop-shadow-md" />
            <span className="font-bold text-lg text-center px-4 tracking-wide text-white">{scanResult.message}</span>
            <span className="text-sm font-light mt-1 text-slate-300">Selamat datang di acara.</span>
          </div>
        )}
        
        {scanResult.status === "error" && (
          <div className="flex flex-col items-center text-red-400 bg-red-900/20 w-full py-5 rounded-xl border border-red-500/30 animate-fade-in-up">
            <XCircle className="w-10 h-10 mb-2" />
            <span className="font-bold text-lg text-center px-4 tracking-wide text-white">{scanResult.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
