import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { ArrowLeft, LogOut, ChevronRight } from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [bio, setBio] = useState(true);
  const [shakeExit, setShakeExit] = useState(true);
  const [textSize, setTextSize] = useState('100%');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(true);

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

      {/* Main Scrollable Content */}
      <div className="p-5 space-y-4 flex-1 overflow-y-auto text-left">
        <div>
          <p className="text-[10px] text-slate-400 font-bold">Keamanan dan kenyamanan</p>
          <h1 className="text-lg font-extrabold text-slate-900">Pengaturan</h1>
        </div>

        {/* Section 1: Keamanan */}
        <div className="space-y-2">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Keamanan</h2>
          <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-xs">
            <button onClick={() => setScreen('s02-setup-pin')} className="w-full p-3.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">Kode rahasia</p>
                <p className="text-[10px] text-slate-400">Ubah kode pembuka kalkulator</p>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </button>

            <div className="p-3.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">Biometrik</p>
                <p className="text-[10px] text-slate-400">Sidik jari untuk membuka dan izin</p>
              </div>
              <button onClick={() => setBio(!bio)} className={`w-10 h-5 rounded-full p-0.5 ${bio ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${bio ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">Kocok untuk keluar cepat</p>
                <p className="text-[10px] text-slate-400">Gestur tanpa menyentuh layar[cite: 26]</p>
              </div>
              <button onClick={() => setShakeExit(!shakeExit)} className={`w-10 h-5 rounded-full p-0.5 ${shakeExit ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${shakeExit ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Aksesibilitas */}
        <div className="space-y-2">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Kenyamanan dan aksesibilitas</h2>
          <div className="bg-white rounded-2xl border border-slate-100 p-3.5 space-y-3 shadow-xs">
            <div>
              <p className="text-xs font-bold text-slate-900">Ukuran teks</p>
              <p className="text-[10px] text-slate-400">Mengikuti pengaturan HP, hingga 200%[cite: 20, 26]</p>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {['100%', '150%', '200%'].map((opt) => (
                  <button key={opt} onClick={() => setTextSize(opt)} className={`py-1.5 rounded-xl font-bold text-xs border ${textSize === opt ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>{opt}</button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-900">Kurangi gerak</p>
                <p className="text-[10px] text-slate-400">Matikan animasi maskot[cite: 20, 26]</p>
              </div>
              <button onClick={() => setReducedMotion(!reducedMotion)} className={`w-10 h-5 rounded-full p-0.5 ${reducedMotion ? 'bg-purple-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${reducedMotion ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-900">Kontras tinggi</p>
                <p className="text-[10px] text-slate-400">Warna lebih tegas[cite: 20, 26]</p>
              </div>
              <button onClick={() => setHighContrast(!highContrast)} className={`w-10 h-5 rounded-full p-0.5 ${highContrast ? 'bg-purple-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${highContrast ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-900">Pembaca layar privat</p>
                <p className="text-[10px] text-slate-400">Label netral, tanpa isi bukti[cite: 26]</p>
              </div>
              <button onClick={() => setScreenReader(!screenReader)} className={`w-10 h-5 rounded-full p-0.5 ${screenReader ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${screenReader ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavbar />
    </MobileContainer>
  );
};