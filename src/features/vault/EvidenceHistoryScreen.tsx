// Layar S08 untuk memeriksa keutuhan rantai hash SHA-256 seluruh bukti.
import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { ArrowLeft, LogOut, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export const EvidenceHistoryScreen: React.FC = () => {
  const { setScreen } = useVaultStore();

  const evidenceChain = [
    { id: 1, title: 'Foto Bukti #01', date: '19 Nov 2026 · Dilihat LBH APIK' },
    { id: 2, title: 'Rekaman Suara #01', date: '19 Nov 2026 · Pribadi (3 mnt)' },
    { id: 3, title: 'Visum RSUD Tarakan', date: '20 Nov 2026 · dr. Ratna Dewi' },
  ];

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 flex flex-col justify-between">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-slate-100">
        <button
          onClick={() => setScreen('s04-vault-home')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
        <button
          onClick={() => setScreen('s03-calculator')}
          className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-4 flex-1 overflow-y-auto">
        <h1 className="text-lg font-extrabold text-slate-900">Periksa keutuhan</h1>

        {/* Comfort Speech Bubble */}
        <div className="bg-white border border-purple-100 p-3.5 rounded-2xl flex items-center gap-3 shadow-xs">
          <span className="text-xl">🥑</span>
          <p className="text-xs text-slate-600 font-medium">
            Aku cek satu per satu ya. Pelan-pelan saja.
          </p>
        </div>

        {/* SHA-256 Hash Chain Timeline */}
        <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-emerald-300 before:border-dashed">
          {evidenceChain.map((item) => (
            <div key={item.id} className="relative bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#DCFCE7] text-emerald-600 flex items-center justify-center text-xs">
                <CheckCircle2 size={14} />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">{item.id} · {item.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Green Integrity Badge */}
        <div className="bg-[#10B981] text-white p-4 rounded-2xl text-center space-y-1 shadow-sm">
          <div className="flex items-center justify-center gap-1.5 font-extrabold text-sm">
            <ShieldCheck size={18} />
            <span>Semua utuh · 3 dari 3 lolos[cite: 26]</span>
          </div>
          <p className="text-[11px] opacity-90">Tidak ada yang berubah sejak masuk brankas[cite: 26].</p>
        </div>

        <button className="w-full h-11 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all">
          <RefreshCw size={14} />
          <span>Periksa ulang[cite: 26]</span>
        </button>
      </div>

      <BottomNavbar />
    </MobileContainer>
  );
};