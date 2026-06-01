"use client";

import { useEffect, useState } from "react";
import DashboardSummary from "@/components/DashboardSummary";
import AttendanceTable from "@/components/AttendanceTable";
import { Download, RefreshCw } from "lucide-react";
import * as XLSX from "xlsx";

export default function DashboardPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/attendance");
      if (!res.ok) throw new Error("Failed to fetch data");
      const { data: records } = await res.json();
      setData(records || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data kehadiran ini?")) return;
    try {
      const res = await fetch(`/api/attendance?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }
      fetchData();
    } catch (err: any) {
      console.error("Error deleting record:", err);
      alert(`Gagal menghapus data: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportXLSX = () => {
    if (data.length === 0) return;

    const exportData = data.map((row) => ({
      ID: row.id,
      "Nama Tamu": row.guest_name,
      "Acara": row.event_name,
      "Waktu Kedatangan": new Date(row.created_at + (row.created_at.endsWith('Z') ? '' : 'Z')).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kehadiran");

    XLSX.writeFile(workbook, `Laporan_Kehadiran_${new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" })}.xlsx`);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-slate-700/50 pb-6">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-white tracking-wide">Dashboard</h1>
          <p className="mt-3 text-lg text-slate-400 font-light">
            Ringkasan kehadiran tamu.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center px-5 py-2.5 bg-slate-800/80 border border-slate-600 rounded-lg shadow-sm text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50 transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin text-[#d4af37]" : ""}`} />
            Refresh
          </button>
          <button
            onClick={exportXLSX}
            disabled={data.length === 0}
            className="flex items-center px-5 py-2.5 bg-[#d4af37] border border-transparent rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.2)] text-sm font-bold text-slate-900 hover:bg-[#ebd074] disabled:opacity-50 transition-all duration-300 uppercase tracking-wider"
          >
            <Download className="w-4 h-4 mr-2" />
            Export XLSX
          </button>
        </div>
      </div>

      <div className="animate-fade-in-up">
        <DashboardSummary data={data} loading={loading} />
      </div>

      <div className="mt-10 bg-slate-800/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-slate-700 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="px-8 py-6 border-b border-slate-700/50 bg-slate-900/50 flex justify-between items-center">
          <h3 className="text-xl font-playfair font-bold text-white tracking-wide">
            Daftar Kehadiran Terbaru
          </h3>
          <div className="h-1 w-12 bg-[#d4af37] rounded-full"></div>
        </div>
        <div className="p-0">
          <AttendanceTable data={data} loading={loading} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
