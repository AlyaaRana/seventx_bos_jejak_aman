import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { QuickExitFAB } from '../../components/shared/QuickExitFAB';
import {
  Shield,
  Camera,
  Mic,
  FileText,
  Edit3,
  ChevronRight,
  Sparkles,
  Wind,
  X,
  Lock,
  ArrowRight,
  Check,
  CloudUpload,
} from 'lucide-react';
import aimImg from '../../assets/smile.png';
import { BottomNavbar } from '../../components/shared/BottomNavbar';

export const VaultHome: React.FC = () => {
  const { evidenceList, setScreen } = useVaultStore();

  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showBreathingModal, setShowBreathingModal] = useState(false);

  const displayList =
    evidenceList.length > 0
      ? evidenceList
      : [
          { id: '1', title: 'Foto Bukti #01', timestamp: '19 Nov · 21:14', type: 'photo' },
          { id: '2', title: 'Rekaman Suara #01', timestamp: '19 Nov · 21:18', type: 'audio' },
          { id: '3', title: 'Visum RSUD Tarakan', timestamp: '20 Nov · 07:45', type: 'document' },
        ];

  return (
    <MobileContainer className="relative bg-gradient-to-b from-[#FAF8FF] via-[#F4F7FF] to-[#FFF5F8] text-slate-800 flex flex-col justify-between overflow-hidden font-sans min-h-screen">
      {/* Quick Exit Floating Button (Melayang Atas Kanan) */}
      <QuickExitFAB />

      {/* Decorative Blobs */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#D1FADF]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-16 w-80 h-80 bg-[#F3E8FF]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FEF3C7]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar (Ringkas & Bersih) */}
      <div className="relative z-10 p-5 pb-2 flex justify-between items-center pr-28">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#EDE9FE] to-[#DDD6FE] flex items-center justify-center border border-purple-200/60 shadow-xs">
            <span className="text-xs font-black text-[#6D28D9] tracking-tight">JA</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-slate-400">Ruang Amanmu</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-sm font-extrabold text-[#1E1B4B] leading-tight">Jejak Aman</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="relative z-10 px-5 space-y-3.5 flex-1 overflow-y-auto pb-4 pt-1">
        {/* Card Penenang */}
        <div
          onClick={() => setShowQuoteModal(true)}
          className="bg-white/80 backdrop-blur-md rounded-[26px] p-4 flex items-center gap-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.03)] border border-white/80 cursor-pointer active:scale-[0.99] transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A7F3D0] to-[#6EE7B7] flex items-center justify-center shrink-0 shadow-inner overflow-hidden p-1">
            <img
              src={aimImg}
              alt="Jejak Aman Avatar"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform"
            />
          </div>
          <div className="text-left space-y-0.5 flex-1">
            <p className="text-xs font-bold text-slate-800 leading-snug">
              Hai, kamu aman di sini. Aku menemani, tanpa terburu-buru.
            </p>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D97706] pt-0.5">
              <Sparkles size={11} className="animate-spin" />
              <span>Ketuk untuk kata penguat ✨</span>
            </div>
          </div>
        </div>

        {/* Status Brankas, Antrean Offline & Jeda Napas */}
        <div className="bg-gradient-to-r from-[#D1FADF] via-[#E6F4EA] to-[#BBF7D0] p-3.5 rounded-[24px] border border-[#A7F3D0]/60 shadow-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center text-[#047857] shadow-xs shrink-0">
              <Shield size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-[#065F46] leading-tight truncate">
                {displayList.length} Bukti Terkunci
              </p>
              <p className="text-[10px] text-[#047857] font-medium mt-0.5 flex items-center gap-1 truncate">
                <Lock size={10} className="shrink-0" />
                <span className="truncate">Hanya di HP-mu · Tanpa galeri</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Tombol menuju S07 · Antrean & Sinkron Offline */}
            <button
              type="button"
              onClick={() => setScreen('s07-offline-queue')}
              title="Status Antrean & Sinkron Offline"
              className="bg-white/90 text-[#6B21A8] hover:bg-[#6B21A8] hover:text-white text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow-xs active:scale-95 transition-all flex items-center gap-1"
            >
              <CloudUpload size={13} />
              <span>Antrean</span>
            </button>

            <button
              type="button"
              onClick={() => setShowBreathingModal(true)}
              className="bg-white text-[#065F46] hover:bg-[#065F46] hover:text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-all flex items-center gap-1"
            >
              <Wind size={13} />
              <span>Jeda Napas</span>
            </button>
          </div>
        </div>

        {/* 4 Action Cards */}
        <div className="grid grid-cols-2 gap-3 pt-0.5">
          <button
            type="button"
            onClick={() => setScreen('s05-capture-photo')}
            className="p-4 rounded-[24px] bg-gradient-to-br from-[#FF7E62] to-[#FF6B50] text-white flex flex-col justify-between h-28 shadow-[0_6px_20px_rgba(255,107,80,0.2)] active:scale-[0.97] transition-all text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-white/90 flex items-center justify-center text-[#FF6B50] shadow-xs">
              <Camera size={19} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold tracking-tight">Ambil Foto</span>
              <ArrowRight size={14} className="opacity-80" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setScreen('s06-record-audio')}
            className="p-4 rounded-[24px] bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] border border-[#E9D5FF]/60 text-[#6B21A8] flex flex-col justify-between h-28 shadow-xs active:scale-[0.97] transition-all text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#9333EA] shadow-xs">
              <Mic size={19} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 tracking-tight">Rekam Suara</span>
              <ArrowRight size={14} className="text-purple-400" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setScreen('s06b-pick-file')}
            className="p-4 rounded-[24px] bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] border border-[#A7F3D0]/60 text-[#065F46] flex flex-col justify-between h-28 shadow-xs active:scale-[0.97] transition-all text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#10B981] shadow-xs">
              <FileText size={19} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 tracking-tight">Pilih Berkas</span>
              <ArrowRight size={14} className="text-emerald-500" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setScreen('s06c-write-note')}
            className="p-4 rounded-[24px] bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#FDE68A]/60 text-[#B54708] flex flex-col justify-between h-28 shadow-xs active:scale-[0.97] transition-all text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#F59E0B] shadow-xs">
              <Edit3 size={19} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800 tracking-tight">Tulis Cerita</span>
              <ArrowRight size={14} className="text-amber-500" />
            </div>
          </button>
        </div>

        {/* Timeline Bukti */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-2.5">
            <h2 className="text-xs font-black text-slate-800 tracking-tight">Jejak buktimu</h2>
            <button
              type="button"
              onClick={() => setScreen('s08-evidence-history')}
              className="text-[11px] font-bold text-[#D97706] hover:underline flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="relative pl-6 space-y-2.5">
            <div className="absolute left-[9px] top-3 bottom-4 w-[2px] border-l-2 border-dashed border-[#A7F3D0]" />

            {displayList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setScreen('s08-evidence-history')}
                className="relative flex items-center cursor-pointer group"
              >
                <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center z-10 shadow-xs">
                  <Check size={11} strokeWidth={3} />
                </div>

                <div className="w-full p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-100 flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] group-hover:border-purple-200 transition-all">
                  <div>
                    <p className="text-xs font-extrabold text-slate-800 leading-tight">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      {item.timestamp} · Terkunci aman
                    </p>
                  </div>
                  <ChevronRight
                    className="text-slate-300 group-hover:text-purple-500 transition-colors"
                    size={16}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showQuoteModal && (
        <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="bg-white rounded-[28px] p-6 text-center space-y-4 shadow-xl border border-white/80 max-w-xs relative">
            <button
              type="button"
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FEF3C7] flex items-center justify-center text-2xl shadow-inner">
              🌻
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">Kamu Tidak Sendirian</h3>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                "Apapun yang kamu rasakan saat ini valid. Kamu berhak merasa aman, didengar, dan dilindungi."
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowQuoteModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#FF8066] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              Terima kasih, aku paham
            </button>
          </div>
        </div>
      )}

      {showBreathingModal && (
        <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="bg-white rounded-[28px] p-6 text-center space-y-4 shadow-xl border border-white/80 max-w-xs relative">
            <button
              type="button"
              onClick={() => setShowBreathingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
            <div className="w-20 h-20 mx-auto rounded-full bg-[#D1FADF] flex items-center justify-center text-[#065F46] animate-pulse">
              <Wind size={36} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">Jeda Napas 4-7-8</h3>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                Tarik napas perlahan melalui hidung (4 detik), tahan (7 detik), lalu hembuskan lembut (8 detik).
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowBreathingModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#065F46] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              Selesai & Lebih Tenang
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navbar */}
      <BottomNavbar />
    </MobileContainer>
  );
};