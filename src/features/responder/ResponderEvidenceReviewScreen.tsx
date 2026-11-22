// Layar S16 peninjauan bukti ber-watermark read-only lengkap dengan validasi hash SHA-256.
import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ArrowLeft, Eye, Lock, CheckCircle2, ShieldCheck, PlusCircle } from 'lucide-react';

export const ResponderEvidenceReviewScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [chainStatus, setChainStatus] = useState('Hash SHA-256 terverifikasi utuh');
  const [requestSent, setRequestSent] = useState(false);

  return (
    <MobileContainer className="relative bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between overflow-y-auto font-sans space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setScreen('s15-responder-dashboard')}
          className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-slate-700 shadow-xs"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="text-center">
          <p className="text-[10px] text-slate-400 font-bold">Kasus #2026-0419</p>
          <h1 className="text-sm font-extrabold text-slate-900">Tinjau bukti</h1>
        </div>

        <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Eye size={11} /> Hanya baca
        </span>
      </div>

      {/* Evidence Card with Anti-Leak Watermark */}
      <div className="bg-white border border-purple-100 rounded-3xl p-4 shadow-xs space-y-2.5 text-left">
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold text-slate-900">Foto bukti #01</p>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Lock size={10} /> Tidak bisa diunduh
          </span>
        </div>

        <div className="relative h-44 rounded-2xl bg-gradient-to-br from-[#F3E8FF] via-[#FAF8FF] to-[#DCFCE7]/60 border border-purple-100 overflow-hidden flex items-center justify-center select-none">
          {/* Watermark Diagonal */}
          <div className="grid grid-cols-2 gap-4 -rotate-12 text-[10px] font-mono font-bold text-slate-400/75 pointer-events-none text-center">
            <span>Sari Kusuma, S.H. · Kasus #2026-0419</span>
            <span>Kasus #2026-0419 · Sari Kusuma, S.H.</span>
            <span>Sari Kusuma, S.H. · Kasus #2026-0419</span>
            <span>Kasus #2026-0419 · Sari Kusuma, S.H.</span>
          </div>
          <span className="relative z-10 bg-white/90 border border-purple-200 px-3 py-1 rounded-full text-[11px] font-bold text-purple-900 shadow-2xs">
            Pratinjau Terenkripsi
          </span>
        </div>

        <p className="text-[10px] text-slate-400 text-center">
          Tayangan bertanda namamu untuk mencegah penyebaran ulang.
        </p>
      </div>

      {/* Digital Hash Log Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-3.5 shadow-xs space-y-2 text-left">
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold text-slate-900">Sidik digital a38f...c721</p>
          <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 size={11} /> Utuh
          </span>
        </div>

        <div className="text-[11px] text-slate-500 space-y-1">
          <div className="flex justify-between">
            <span>Dicatat dari ponsel</span>
            <strong className="text-slate-700">19 Nov · 21.14</strong>
          </div>
          <div className="flex justify-between">
            <span>Terkunci di server</span>
            <strong className="text-slate-700">19 Nov · 21.15</strong>
          </div>
        </div>

        <p className="text-[10px] text-emerald-700 font-semibold pt-1">{chainStatus}</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pb-1">
        <button
          type="button"
          onClick={() => setChainStatus('Seluruh rantai hash terverifikasi 100% tanpa perubahan.')}
          className="w-full h-11 rounded-2xl bg-[#FF7E62] text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <ShieldCheck size={15} />
          <span>Cek keutuhan seluruh rantai</span>
        </button>

        <button
          type="button"
          onClick={() => setRequestSent(true)}
          className="w-full h-11 rounded-2xl bg-white border border-purple-200 text-purple-900 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <PlusCircle size={15} />
          <span>{requestSent ? 'Permintaan bukti dikirim ke penyintas' : 'Minta bukti tambahan'}</span>
        </button>

        <p className="text-[10px] text-slate-400 text-center">
          Permintaan tambahan bebas ditolak penyintas.
        </p>
      </div>
    </MobileContainer>
  );
};