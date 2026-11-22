import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { ArrowLeft, LogOut, WifiOff, RefreshCw, CheckCircle2, Clock } from 'lucide-react';

export const OfflineQueueScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [wifiOnly, setWifiOnly] = useState(true);

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 flex flex-col justify-between">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('s04-vault-home')}
            className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-xs"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-[10px] text-slate-400 font-bold">Status sinkron</p>
            <h1 className="text-sm font-extrabold text-slate-900">Antrean bukti</h1>
          </div>
        </div>
        <button
          onClick={() => setScreen('s03-calculator')}
          className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-3.5 flex-1 overflow-y-auto">
        {/* Offline Warning Banner */}
        <div className="bg-[#FEF3C7] border border-amber-200 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
            😊
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-amber-950">Sinyal belum ada. Tidak apa-apa.</p>
            <p className="text-[10px] text-amber-800 leading-tight">
              Buktimu tetap terkunci aman di ponsel dan akan terkirim sendiri[cite: 18, 26].
            </p>
          </div>
        </div>

        {/* Queue Items */}
        <div className="space-y-2.5">
          {/* Item 1 */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-lg">📷</span>
              <div>
                <p className="text-xs font-bold text-slate-900">Foto bukti #03</p>
                <p className="text-[10px] text-slate-400">Terkunci di HP · menung</p>
              </div>
            </div>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock size={11} /> Menunggu
            </span>
          </div>

          {/* Item 2 */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">🎙️</span>
                <div>
                  <p className="text-xs font-bold text-slate-900">Rekaman suara #0</p>
                  <p className="text-[10px] text-slate-400">Mengunggah 64%</p>
                </div>
              </div>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                Mengunggah
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[64%] h-full bg-[#FF6B50] rounded-full" />
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-lg">📄</span>
              <div>
                <p className="text-xs font-bold text-slate-900">Catatan #01</p>
                <p className="text-[10px] text-slate-400">Terkunci di server · 21.16</p>
              </div>
            </div>
            <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 size={11} /> Utuh
            </span>
          </div>
        </div>

        {/* Note Box */}
        <div className="bg-purple-50/60 border border-purple-100 p-3.5 rounded-2xl text-[11px] text-slate-500 leading-relaxed">
          Waktu pengambilan dicatat dari ponselmu. Cap waktu server menyusul saat tersambung, dan keduanya tampil di detail bukti.
        </div>

        {/* Wi-Fi Toggle Switch */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <WifiOff size={18} className="text-slate-500" />
            <span className="text-xs font-bold text-slate-800">Hemat data: kirim lewat Wi-Fi saja</span>
          </div>
          <button
            onClick={() => setWifiOnly(!wifiOnly)}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              wifiOnly ? 'bg-purple-600' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${wifiOnly ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Action Button */}
        <button className="w-full h-12 rounded-2xl bg-[#FF6B50] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all">
          <RefreshCw size={16} />
          <span>Coba kirim sekarang</span>
        </button>
      </div>

      <BottomNavbar />
    </MobileContainer>
  );
};