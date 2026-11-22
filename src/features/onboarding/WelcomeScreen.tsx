import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { Shield, IdCard, ArrowRight, LogOut, Lock } from 'lucide-react';
import smile from '../../assets/smile.png';

export const WelcomeScreen: React.FC = () => {
  const { setScreen } = useVaultStore();

  return (
    <MobileContainer className="relative bg-[#F9F8FE] text-slate-800 p-5 flex flex-col justify-between overflow-hidden font-sans min-h-screen">
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#E2F7ED] rounded-full blur-2xl opacity-70 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#FFF3E6] rounded-full blur-2xl opacity-70 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between pt-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#EDE9FE] flex items-center justify-center border border-purple-200/50 shadow-xs">
            <span className="text-[11px] font-black text-[#6D28D9] tracking-tight">JA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-slate-400 leading-none">Ruang Aman & Rahasia</span>
            <span className="text-xs font-extrabold text-[#1E1B4B] leading-tight mt-0.5">Jejak Aman</span>
          </div>
        </div>

        <button 
          aria-label="Keluar Cepat"
          className="w-9 h-9 rounded-full bg-[#FFEDD5] text-[#D97706] flex items-center justify-center active:scale-95 transition-all shadow-xs"
        >
          <LogOut size={16} className="translate-x-[0.5px]" />
        </button>
      </div>

      <div className="relative z-10 my-auto flex flex-col gap-3.5 py-2">
        <div className="bg-white rounded-[28px] p-6 text-center shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100/80 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#A7F3D0] flex items-center justify-center shadow-inner overflow-hidden p-2">
            <img src={smile} alt="Jejak Aman" className="w-full h-full object-contain" />
          </div>
          
          <div className="space-y-1.5">
            <span className="inline-block bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
              Ketuk untuk sapa
            </span>
            <h1 className="text-xl font-black text-[#1E293B] leading-tight tracking-tight">
              Selamat datang,<br />kamu aman di sini
            </h1>
            <p className="text-[11px] text-slate-400 max-w-[210px] mx-auto leading-relaxed pt-0.5">
              Pilih tujuanmu hari ini. Semua langkah pelan-pelan saja.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => setScreen('s02-setup-pin')}
            className="w-full p-3.5 rounded-2xl bg-[#D1FADF] text-[#065F46] flex items-center justify-between border border-[#A7F3D0]/40 shadow-xs active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs">
                <Shield className="text-[#10B981]" size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Masuk Ruang Aman</p>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Simpan bukti & cerita pribadi</p>
              </div>
            </div>
            <ArrowRight className="text-[#059669] mr-1" size={18} />
          </button>

          <button
            onClick={() => setScreen('s09a-responder-method')}
            className="w-full p-3.5 rounded-2xl bg-[#F3E8FF] text-[#6B21A8] flex items-center justify-between border border-[#E9D5FF]/40 shadow-xs active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs">
                <IdCard className="text-[#A855F7]" size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Saya Pendamping</p>
                <p className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">Verifikasi e-KTP & bantu kasus</p>
              </div>
            </div>
            <ArrowRight className="text-[#9333EA] mr-1" size={18} />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium pb-1">
        <Lock size={12} className="text-emerald-500" />
        <span>Tanpa akun - Data tetap di perangkatmu</span>
      </div>
    </MobileContainer>
  );
};