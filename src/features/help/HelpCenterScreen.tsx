import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { ArrowLeft, LogOut, PhoneCall, ShieldCheck, Siren } from 'lucide-react';

export const HelpCenterScreen: React.FC = () => {
  const { setScreen } = useVaultStore();

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 flex flex-col justify-between">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-slate-100">
        <button onClick={() => setScreen('s04-vault-home')} className="flex items-center gap-1 text-xs font-bold text-slate-600">
          <ArrowLeft size={16} /> Kembali
        </button>
        <button onClick={() => setScreen('s03-calculator')} className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
          <LogOut size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-4 flex-1 overflow-y-auto">
        <h1 className="text-lg font-extrabold text-slate-900 text-center">Kamu tidak sendirian</h1>

        {/* Breathing Space Banner */}
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-3xl text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
            🧘‍♀️
          </div>
          <p className="text-xs font-extrabold text-emerald-950">Jeda sejenak</p>
          <p className="text-[11px] text-emerald-800 leading-tight">
            Tarik napas pelan, tahan sebentar, lalu hembuskan perlahan[cite: 26].
          </p>
        </div>

        {/* Emergency Hotline Buttons */}
        <div className="space-y-2.5">
          {/* SAPA 129 */}
          <a href="tel:129" className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs active:scale-95 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                <PhoneCall size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">Hubungi SAPA 129</p>
                <p className="text-[10px] text-slate-400">Layanan pengaduan KemenPPPA[cite: 26]</p>
              </div>
            </div>
          </a>

          {/* Cari Pendamping */}
          <button onClick={() => setScreen('s10-find-responder')} className="w-full bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs active:scale-95 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">Cari pendamping resmi</p>
                <p className="text-[10px] text-slate-400">Lembaga yang sudah terverifikasi[cite: 26]</p>
              </div>
            </div>
          </button>

          {/* Call 110 */}
          <a href="tel:110" className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs active:scale-95 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <Siren size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">Darurat? Hubungi 110</p>
                <p className="text-[10px] text-slate-400">Jika kamu dalam bahaya sekarang[cite: 26]</p>
              </div>
            </div>
          </a>
        </div>

        <p className="text-[10px] text-slate-400 text-center max-w-[220px] mx-auto leading-relaxed">
          Jika HP-mu mungkin dipantau, pertimbangkan memakai perangkat lain yang aman[cite: 26].
        </p>
      </div>

      <BottomNavbar />
    </MobileContainer>
  );
};