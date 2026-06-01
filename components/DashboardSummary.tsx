"use client";

import { Users, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardSummaryProps {
  data: any[];
  loading: boolean;
}

export default function DashboardSummary({ data, loading }: DashboardSummaryProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(
        new Date()
          .toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Asia/Jakarta",
          })
          .replace(/:/g, ".")
      );
    };

    updateCurrentTime(); // Initial set
    const timer = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-slate-800/80 rounded-2xl p-8 shadow-2xl border border-slate-700 animate-pulse">
            <div className="h-12 w-12 bg-slate-700 rounded-full mb-6"></div>
            <div className="h-4 w-32 bg-slate-700 rounded mb-4"></div>
            <div className="h-10 w-20 bg-slate-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const totalAttendance = data.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700 flex items-center relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors duration-300">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#d4af37]/5 rounded-full blur-xl group-hover:bg-[#d4af37]/10 transition-colors"></div>
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-full mr-6 shadow-inner group-hover:border-[#d4af37]/30 transition-colors">
          <Users className="w-8 h-8 text-[#d4af37]" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Kehadiran</p>
          <p className="font-playfair text-4xl font-bold text-white">{totalAttendance}</p>
        </div>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700 flex items-center relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors duration-300">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#d4af37]/5 rounded-full blur-xl group-hover:bg-[#d4af37]/10 transition-colors"></div>
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-full mr-6 shadow-inner group-hover:border-[#d4af37]/30 transition-colors">
          <Clock className="w-8 h-8 text-[#d4af37]" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Waktu Saat Ini</p>
          <p className="font-playfair text-4xl font-bold text-white">{currentTime}</p>
        </div>
      </div>
    </div>
  );
}
