import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ArrowLeft, Camera, ShieldCheck, LogOut } from 'lucide-react';

export const CapturePhotoScreen: React.FC = () => {
  const { setScreen, addEvidence } = useVaultStore();

  const handleCapture = () => {
    addEvidence({
      id: Date.now().toString(),
      title: `Foto Bukti #${Math.floor(Math.random() * 100)}`,
      timestamp: 'Hari ini · Baru saja',
      sha256Hex: 'e7f6c011a4b92d73f1a09428f5c8e19a',
    });
    setScreen('s04-vault-home');
  };

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between">
      {/* Header Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setScreen('s04-vault-home')}
          className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-xs"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-[11px] font-bold text-slate-500">Ambil Bukti</span>
        <button 
          onClick={() => setScreen('s03-calculator')}
          className="w-9 h-9 rounded-full bg-[#FFEDD5] text-[#D97706] flex items-center justify-center shadow-xs"
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* Comfort Banner */}
      <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center gap-2.5">
        <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
        <p className="text-[11px] text-emerald-950 font-semibold leading-tight">
          Ambil pelan-pelan ya. Semua langsung aman & tidak masuk galeri HP[cite: 18, 26].
        </p>
      </div>

      {/* Camera View Area */}
      <div className="bg-purple-50/60 border-2 border-dashed border-purple-200 rounded-[32px] p-8 flex flex-col items-center justify-center space-y-4 my-auto min-h-[300px]">
        <div className="w-20 h-20 rounded-full bg-white border border-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
          <Camera size={36} />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-sm font-extrabold text-slate-800">Ambil Bukti dengan Tenang</h2>
          <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto">
            Foto langsung terkunci di brankas amanmu dan tidak muncul di galeri HP[cite: 18, 26].
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleCapture}
        className="w-full h-12 rounded-2xl bg-[#FF6B50] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        <Camera size={18} />
        <span>Ambil & Simpan Aman</span>
      </button>
    </MobileContainer>
  );
};