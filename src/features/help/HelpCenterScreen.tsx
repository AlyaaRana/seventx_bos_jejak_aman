import React, { useState, useEffect } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { 
  ChevronLeft, 
  PhoneCall, 
  ShieldCheck, 
  Siren, 
  Sparkles,
  HeartHandshake,
  ShieldAlert,
  ChevronRight,
  Wind,
  CheckCircle2
} from 'lucide-react';
import aimImg from '../../assets/smile.png';

export const HelpCenterScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [breathingPhase, setBreathingPhase] = useState<'Tarik' | 'Tahan' | 'Hembuskan'>('Tarik');
  const [scale, setScale] = useState(1);

  // Animasi panduan napas visual (Grounding Technique 4-4-4)
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingPhase((prev) => {
        if (prev === 'Tarik') {
          setScale(1.25);
          return 'Tahan';
        }
        if (prev === 'Tahan') {
          setScale(1);
          return 'Hembuskan';
        }
        setScale(1);
        return 'Tarik';
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <MobileContainer className="relative bg-gradient-to-b from-[#F5F8FF] via-[#FAF6FF] to-[#FFF7F5] text-slate-800 flex flex-col justify-between overflow-hidden font-sans min-h-screen">
      {/* Background Blobs yang Lembut & Menenangkan */}
      <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#D1FADF]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#F3E8FF]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 p-4 flex items-center justify-between border-b border-slate-100/60 bg-white/70 backdrop-blur-md">
        <button
          onClick={() => setScreen('s04-vault-home')}
          aria-label="Kembali"
          className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-xs active:scale-95 transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1.5">
          <HeartHandshake size={16} className="text-rose-400" />
          <h1 className="text-xs font-black text-slate-800 tracking-tight">
            Ruang Bantuan & Pendampingan
          </h1>
        </div>

        
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-5 space-y-4 flex-1 overflow-y-auto pb-4">
        
        {/* Interactive Breathing & Grounding Card (Panduan Napas Visual) */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-[28px] border border-emerald-100/80 shadow-[0_4px_25px_rgba(16,185,129,0.05)] text-center space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 w-fit mx-auto px-3 py-0.5 rounded-full">
            <Wind size={12} />
            <span>Latihan Napas & Grounding</span>
          </div>

          {/* Animated Circle Breathing Indicator */}
          <div className="py-2 flex flex-col items-center justify-center">
            <div 
              style={{ transform: `scale(${scale})` }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#A7F3D0] to-[#6EE7B7] flex items-center justify-center text-emerald-900 shadow-md transition-transform duration-1000 ease-in-out"
            >
              <img src={aimImg} alt="Avatar Penenang" className="w-10 h-10 object-contain" />
            </div>
            <p className="text-xs font-black text-slate-700 mt-3 tracking-wide transition-all">
              {breathingPhase}...
            </p>
          </div>

          <p className="text-[11px] text-slate-400 font-medium max-w-[210px] mx-auto leading-relaxed">
            Ikuti ritme lingkaran. Ambil waktu sejenak untuk menenangkan pikiranmu.
          </p>
        </div>

        {/* Validasi Emosi (Sanctuary Note Card) */}
        <div className="bg-gradient-to-br from-[#F3E8FF]/80 to-[#E9D5FF]/40 p-4 rounded-[24px] border border-purple-100/60 flex items-start gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-xs mt-0.5">
            <Sparkles size={16} />
          </div>
          <div className="space-y-0.5 text-left">
            <h2 className="text-xs font-extrabold text-[#5B21B6]">Semua emosimu valid</h2>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Kamu tidak bersalah atas apa yang terjadi. Kamu berhak merasa aman dan mendapatkan pertolongan yang tepat.
            </p>
          </div>
        </div>

        {/* Emergency & Support Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-wider pl-1">
            Layanan Pengaduan & Pendampingan
          </h3>

          {/* SAPA 129 */}
          <a
            href="tel:129"
            className="bg-white/90 backdrop-blur-md p-4 rounded-[24px] border border-slate-100 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#FFEDD5] text-[#D97706] flex items-center justify-center shrink-0 shadow-xs">
                <PhoneCall size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-black text-slate-900">Hubungi SAPA 129</p>
                  <span className="bg-orange-50 text-orange-600 text-[9px] font-extrabold px-1.5 py-0.2 rounded-md">Bebas Pulsa</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Layanan resmi KemenPPPA (24 Jam)</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-orange-500 transition-colors" />
          </a>

          {/* Cari Pendamping Resmi */}
          <button
            onClick={() => setScreen('s10-find-responder')}
            className="w-full bg-white/90 backdrop-blur-md p-4 rounded-[24px] border border-slate-100 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#D1FADF] text-[#047857] flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-black text-slate-900">Cari Pendamping Resmi</p>
                  <CheckCircle2 size={12} className="text-emerald-500" />
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">LBH & Psikolog terverifikasi e-KTP</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
          </button>

          {/* Panggilan Darurat 110 */}
          <a
            href="tel:110"
            className="bg-white/90 backdrop-blur-md p-4 rounded-[24px] border border-slate-100 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center shrink-0 shadow-xs">
                <Siren size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-slate-900">Darurat Polisi 110</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Gunakan jika berada dalam bahaya fisik</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-purple-500 transition-colors" />
          </a>
        </div>

        {/* Security Alert Footnote */}
        <div className="bg-rose-50/70 border border-rose-100 p-3.5 rounded-[22px] flex items-center gap-2.5 text-[10px] text-rose-700 font-medium leading-relaxed mt-2">
          <ShieldAlert size={16} className="text-rose-500 shrink-0" />
          <span>Jika ponselmu berpotensi diawasi pelaku, gunakan mode penyamaran/perangkat lain yang lebih aman.</span>
        </div>

      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </MobileContainer>
  );
};