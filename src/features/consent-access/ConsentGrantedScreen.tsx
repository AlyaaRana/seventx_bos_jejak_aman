import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Eye,
  ShieldCheck,
  ShieldOff,
  Home,
} from 'lucide-react';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { QuickExitFAB } from '../../components/shared/QuickExitFAB';
import { useVaultStore } from '../../store/useVaultStore';

export const ConsentGrantedScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [revoked, setRevoked] = useState(false);

  return (
    <MobileContainer className="relative min-h-screen bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between gap-4 overflow-hidden">
      <QuickExitFAB />

      {/* Top Bar */}
      <div className="flex items-center justify-between pt-1 pr-24">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/90 px-3 py-1 rounded-full">
          <ShieldCheck size={13} />
          <span>Kendali di tanganmu</span>
        </span>
      </div>

      {/* Center Status & Summary */}
      <div className="my-auto space-y-4 text-center">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          {!revoked && (
            <span className="absolute inset-0 rounded-full bg-emerald-200/60 animate-ping" />
          )}
          <div
            className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-xs transition-all duration-300 ${
              revoked
                ? 'bg-rose-100 text-rose-600 scale-95'
                : 'bg-emerald-100 text-emerald-600 scale-100'
            }`}
          >
            {revoked ? <ShieldOff size={32} /> : <CheckCircle2 size={34} />}
          </div>
        </div>

        <div className="space-y-1 transition-all duration-300">
          <h1 className="text-lg font-extrabold text-slate-900">
            {revoked ? 'Akses telah dicabut' : 'Izin diberikan'}
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            {revoked
              ? 'Pendamping tidak lagi dapat mengakses bukti. Kamu bisa memberi izin lagi kapan pun.'
              : 'Pendamping sudah diberi tahu. Kamu tetap pegang kendali penuh.'}
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 max-w-xs mx-auto shadow-2xs text-left space-y-2 transition-all duration-300">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-extrabold text-slate-900">
              LBH Harapan Bersama
            </p>
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                revoked
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {revoked ? 'Dicabut' : 'Aktif'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Eye size={13} className="text-slate-400 shrink-0" />
            <span>3 bukti · hanya lihat</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-700 pt-1 border-t border-slate-100">
            <Clock size={13} className="shrink-0" />
            <span>
              {revoked
                ? 'Akses dihentikan olehmu'
                : 'Berakhir otomatis dalam 6 hari 23 jam'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => {
            if (!revoked) {
              setRevoked(true);
            } else {
              setScreen('s11-access-history');
            }
          }}
          className="w-full h-11 rounded-2xl border border-rose-200 bg-rose-50 hover:bg-rose-100/80 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <ShieldOff size={15} />
          <span>{revoked ? 'Lihat riwayat akses' : 'Cabut akses sekarang'}</span>
        </button>

        <button
          type="button"
          onClick={() => setScreen('s04-vault-home')}
          className="w-full h-12 rounded-2xl bg-[#FF6B50] hover:bg-[#F45D42] text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Home size={15} />
          <span>Kembali ke brankas</span>
        </button>
      </div>
    </MobileContainer>
  );
};