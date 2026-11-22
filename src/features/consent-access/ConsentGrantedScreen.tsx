import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { LogOut, ShieldCheck } from 'lucide-react';

export const ConsentGrantedScreen: React.FC = () => {
  const { setScreen } = useVaultStore();

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between">
      <div className="flex justify-between items-center pt-2">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck size={13} /> Kendali di tanganmu
        </span>
        <button onClick={() => setScreen('s03-calculator')} className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
          <LogOut size={16} />
        </button>
      </div>

      <div className="text-center space-y-4 my-auto">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl shadow-xs">
          😊
        </div>

        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Izin diberikan</h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
            Pendamping sudah diberi tahu. Kamu tetap pegang kendali.
          </p>
        </div>

        <div className="bg-white border border-slate-100 p-4 rounded-2xl max-w-xs mx-auto shadow-xs text-left space-y-1">
          <div className="flex justify-between items-center">
            <p className="text-xs font-extrabold text-slate-900">LBH Harapan Bersama</p>
            <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full">Aktif</span>
          </div>
          <p className="text-[11px] text-slate-400">3 bukti · hanya lihat</p>
          <p className="text-[10px] text-purple-700 font-bold pt-1">🕒 Berakhir otomatis dalam 6 hari 23 jam</p>
        </div>
      </div>

      <div className="space-y-2">
        <button onClick={() => setScreen('s11-access-history')} className="w-full h-12 rounded-2xl border border-red-200 bg-red-50 text-red-600 font-bold text-xs active:scale-95 transition-all">
          🚫 Cabut akses sekarang
        </button>
        <button onClick={() => setScreen('s04-vault-home')} className="w-full h-12 rounded-2xl bg-[#FF6B50] text-white font-bold text-xs shadow-xs active:scale-95 transition-all">
          Kembali ke brankas
        </button>
      </div>
    </MobileContainer>
  );
};