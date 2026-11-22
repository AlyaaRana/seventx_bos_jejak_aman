import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { X, ShieldCheck } from 'lucide-react';

export const ShareConsentScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [duration, setDuration] = useState<'24h' | '7d'>('7d');
  const [pin, setPin] = useState('');

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) setPin((prev) => prev + num);
  };

  const handleConfirm = () => {
    if (pin.length === 6) setScreen('s14-consent-granted');
  };

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between">
      <div className="flex justify-between items-start pt-2">
        <div>
          <h1 className="text-base font-extrabold text-slate-900">Bagikan dengan Aman</h1>
          <p className="text-[11px] text-slate-400">Kendali penuh di tanganmu, tutup kapan saja.</p>
        </div>
        <button onClick={() => setScreen('s11-access-history')} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
          <X size={16} />
        </button>
      </div>

      <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs">
        <div>
          <p className="text-xs font-extrabold text-slate-900">LBH APIK Jakarta</p>
          <p className="text-[10px] text-slate-400">Sari Kusuma, S.H.</p>
        </div>
        <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck size={11} /> Resmi
        </span>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 block text-left">Pilih Durasi Izin</label>
        <div className="grid grid-cols-3 gap-2">
          {(['24h', '7d'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setDuration(opt)}
              className={`h-10 rounded-xl font-bold text-xs border ${
                duration === opt ? 'bg-[#FF6B50] text-white border-transparent' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {opt === '24h' ? '24 Jam' : '7 Hari'}
            </button>
          ))}
          <button className="h-10 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs">Atur Jam</button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500">PIN Persetujuan (6 Digit)</span>
          <span className="text-slate-400">{pin.length}/6</span>
        </div>
        <div className="flex justify-center gap-3">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className={`w-3.5 h-3.5 rounded-full ${pin.length > idx ? 'bg-purple-700' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <button key={num} onClick={() => handleKeyPress(num)} className="h-11 rounded-xl bg-white border border-slate-200 font-bold text-base active:bg-slate-100">{num}</button>
        ))}
        <button onClick={() => setPin('')} className="h-11 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold">Hapus</button>
        <button onClick={() => handleKeyPress('0')} className="h-11 rounded-xl bg-white border border-slate-200 font-bold text-base">0</button>
        <button onClick={() => setPin((prev) => prev.slice(0, -1))} className="h-11 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs">⌫</button>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2">
        <button onClick={() => setScreen('s11-access-history')} className="h-12 rounded-2xl bg-purple-50 text-purple-700 font-bold text-xs">Batal</button>
        <button disabled={pin.length < 6} onClick={handleConfirm} className="h-12 rounded-2xl bg-[#FF6B50] text-white font-bold text-xs shadow-xs disabled:opacity-40">Kirim Izin Aman</button>
      </div>
    </MobileContainer>
  );
};