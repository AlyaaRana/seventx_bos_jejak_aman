import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { 
  ChevronLeft, 
  ShieldAlert, 
  Clock, 
  Building2, 
  ShieldCheck, 
  UserCheck,
  RefreshCw,
  UserX,
  Sparkles,
  Lock,
  Heart
} from 'lucide-react';
import aimImg from '../../assets/smile.png';

export const AccessHistoryScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [showRevokeToast, setShowRevokeToast] = useState(false);

  return (
    <MobileContainer className="relative bg-gradient-to-b from-[#FAF8FF] via-[#F4F7FF] to-[#FFF5F8] text-slate-800 flex flex-col justify-between overflow-hidden font-sans min-h-screen">
      {/* Soft Glow Background Blobs */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#D1FADF]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-16 w-80 h-80 bg-[#F3E8FF]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 p-4 flex items-center  border-b border-slate-100/80 bg-white/80 backdrop-blur-md">
        <button
          onClick={() => setScreen('s04-vault-home')}
          aria-label="Kembali"
          className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-xs"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1.5">
          <h1 className="text-xs font-black text-slate-900 tracking-tight">
            Riwayat Akses Pendamping
          </h1>
                    <Lock size={14} className="text-purple-600" />

        </div>

        
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-5 space-y-4 flex-1 overflow-y-auto pb-4">
        
        {/* Friendly Banner with Avatar */}
        <div className="bg-white/80 backdrop-blur-md rounded-[26px] p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.025)] border border-white">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#A7F3D0] to-[#6EE7B7] flex items-center justify-center shrink-0 shadow-inner p-1">
            <img src={aimImg} alt="Jejak Aman Avatar" className="w-full h-full object-contain" />
          </div>
          <div className="text-left space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#065F46]">
              <span>Kendali Penuh Ada Di Tanganmu</span>
              <Sparkles size={11} className="text-amber-400 animate-spin" />
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              Semua lembaga atau pendamping yang membuka datamu tercatat transparan di sini.
            </p>
          </div>
        </div>

        {/* Active Institution Card */}
        <div className="bg-white/90 backdrop-blur-md p-4.5 rounded-[28px] border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-3.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] text-[#7E22CE] flex items-center justify-center font-bold shadow-xs">
                <Building2 size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs font-black text-slate-900 leading-tight">LBH APIK Jakarta</h2>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Foto & visum · Akses Lihat Saja</p>
              </div>
            </div>
            
            <span className="bg-[#D1FADF] border border-[#A7F3D0]/70 text-[#065F46] text-[10px] font-extrabold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>Aktif</span>
            </span>
          </div>

          {/* Progress Bar Sisa Hari */}
          <div className="bg-[#FAF8FF] p-3 rounded-2xl border border-purple-50 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-extrabold">
              <span className="text-slate-600">Masa Berlaku Akses</span>
              <span className="text-emerald-700 font-black">Sisa 5 dari 7 hari</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-100">
              <div className="w-[71%] h-full bg-gradient-to-r from-[#A7F3D0] via-[#10B981] to-[#047857] rounded-full transition-all duration-500 shadow-xs" />
            </div>
            <p className="text-[9px] text-slate-400 text-right font-medium">Berakhir otomatis dalam 5 hari</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-0.5">
            <button
              onClick={() => setScreen('s12-share-consent')}
              className="h-10 rounded-2xl bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#7E22CE] font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <RefreshCw size={14} />
              <span>Perpanjang</span>
            </button>

            <button
              onClick={() => {
                setShowRevokeToast(true);
                setTimeout(() => setShowRevokeToast(false), 3000);
              }}
              className="h-10 rounded-2xl bg-rose-50/80 hover:bg-rose-100 border border-rose-200/60 text-rose-600 font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <UserX size={14} />
              <span>Cabut Akses</span>
            </button>
          </div>
        </div>

        {/* Audit Log Timeline */}
        <div className="pt-1 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              Catatan Aktivitas
            </h2>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              Real-time Log
            </span>
          </div>

          <div className="relative pl-6 space-y-3">
            {/* Timeline Vertical Dotted Line */}
            <div className="absolute left-[9px] top-3 bottom-3 w-[2px] border-l-2 border-dashed border-purple-200" />

            {/* Log 1: Pendamping Membuka Foto */}
            <div className="relative flex items-start group">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#D1FADF] border border-[#A7F3D0] text-[#047857] flex items-center justify-center z-10 shadow-xs group-hover:scale-110 transition-transform">
                <ShieldCheck size={12} strokeWidth={2.5} />
              </div>
              <div className="w-full bg-white/90 backdrop-blur-xs rounded-2xl p-3 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-0.5 group-hover:border-emerald-200 transition-all">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  Pendamping membuka <strong className="text-emerald-700">Foto Bukti #01</strong>
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium pt-0.5">
                  <Clock size={11} />
                  <span>Hari ini · 10:42 WIB</span>
                </div>
              </div>
            </div>

            {/* Log 2: Memberi Akses */}
            <div className="relative flex items-start group">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#FFEDD5] border border-orange-200 text-[#D97706] flex items-center justify-center z-10 shadow-xs group-hover:scale-110 transition-transform">
                <UserCheck size={12} strokeWidth={2.5} />
              </div>
              <div className="w-full bg-white/90 backdrop-blur-xs rounded-2xl p-3 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-0.5 group-hover:border-orange-200 transition-all">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  Kamu memberi akses selama <strong className="text-orange-600">7 hari</strong>
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium pt-0.5">
                  <Clock size={11} />
                  <span>Kemarin · 15:05 WIB</span>
                </div>
              </div>
            </div>

            {/* Log 3: Akses Berakhir */}
            <div className="relative flex items-start group">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#F3E8FF] border border-purple-200 text-purple-600 flex items-center justify-center z-10 shadow-xs group-hover:scale-110 transition-transform">
                <Clock size={12} strokeWidth={2.5} />
              </div>
              <div className="w-full bg-white/90 backdrop-blur-xs rounded-2xl p-3 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-0.5 group-hover:border-purple-200 transition-all">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  Akses <strong>Klinik Pulih</strong> berakhir otomatis
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium pt-0.5">
                  <Clock size={11} />
                  <span>12 hari lalu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Control Banner */}
        <div className="bg-gradient-to-r from-[#D1FADF] via-[#E6F4EA] to-[#BBF7D0] border border-[#A7F3D0]/60 p-3.5 rounded-[22px] flex items-center gap-3 text-[11px] text-[#065F46] shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-white/80 flex items-center justify-center shrink-0 text-[#047857] shadow-xs">
            <Heart size={16} />
          </div>
          <span className="font-bold leading-relaxed">
            Tenang saja, kamu berhak mencabut atau menghentikan izin akses kapan pun kamu mau.
          </span>
        </div>
      </div>

      {/* Interactive Toast Notification */}
      {showRevokeToast && (
        <div className="absolute top-16 left-5 right-5 z-50 bg-rose-600 text-white p-3.5 rounded-2xl shadow-lg flex items-center justify-between text-xs font-bold animate-bounce">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} />
            <span>Permintaan cabut akses dikirim!</span>
          </div>
          <button onClick={() => setScreen('s14-consent-granted')} className="bg-white text-rose-600 px-2.5 py-1 rounded-xl text-[10px]">
            Konfirmasi
          </button>
        </div>
      )}

      {/* Bottom Navbar */}
      <BottomNavbar />
    </MobileContainer>
  );
};