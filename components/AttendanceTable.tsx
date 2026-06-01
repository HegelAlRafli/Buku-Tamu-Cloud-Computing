import { Trash2 } from "lucide-react";

interface AttendanceTableProps {
    data: any[];
    loading: boolean;
    onDelete?: (id: string | number) => void;
}

export default function AttendanceTable({ data, loading, onDelete }: AttendanceTableProps) {
    const formatDate = (dateStr: string) => {
        const dateObj = new Date(dateStr + (dateStr.endsWith('Z') ? '' : 'Z'));
        const formattedDate = dateObj.toLocaleDateString("id-ID", {
            timeZone: "Asia/Jakarta",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).toLowerCase();
        const formattedTime = dateObj.toLocaleTimeString("id-ID", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }).replace(/:/g, ".");
        return `${formattedDate}, ${formattedTime}`;
    };

    if (loading) {
        return (
            <div className="p-16 flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#d4af37]"></div>
                <p className="text-slate-400 font-light tracking-wide">Memuat data...</p>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="p-16 text-center">
                <p className="text-slate-400 text-lg font-light tracking-wide">
                    Belum ada data kehadiran tamu.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
                <thead className="bg-slate-900/80 backdrop-blur-sm">
                    <tr>
                        <th scope="col" className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest w-16">
                            No
                        </th>
                        <th scope="col" className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Nama Tamu
                        </th>
                        <th scope="col" className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Acara
                        </th>
                        <th scope="col" className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Waktu Kedatangan
                        </th>
                        <th scope="col" className="px-8 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-widest w-24">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 bg-transparent">
                    {data.map((row, index) => (
                        <tr key={row.id} className="hover:bg-slate-700/30 transition-colors duration-300">
                            <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-500 font-mono">
                                {String(index + 1).padStart(3, '0')}
                            </td>
                            <td className="px-8 py-5 whitespace-nowrap">
                                <div className="text-base font-semibold text-white tracking-wide">{row.guest_name}</div>
                            </td>
                            <td className="px-8 py-5 whitespace-nowrap">
                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] tracking-wider uppercase shadow-[0_0_10px_rgba(212,175,55,0.05)]">
                                    {row.event_name}
                                </span>
                            </td>
                            <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-400">
                                {formatDate(row.created_at)}
                            </td>
                            <td className="px-8 py-5 whitespace-nowrap text-center text-sm font-medium">
                                <button
                                    onClick={() => onDelete && onDelete(row.id)}
                                    className="text-red-400 hover:text-red-300 transition-colors bg-red-400/10 hover:bg-red-400/20 p-2 rounded-lg"
                                    title="Hapus Data"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
