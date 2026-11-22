// Dasbor peninjau bukti ber-watermark khusus pendamping terverifikasi e-KTP.
import React from 'react';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ShieldCheck, Eye, Clock } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';

export const CaseReviewer: React.FC = () => {
  const { evidenceList, setScreen } = useVaultStore();

  return (
    <MobileContainer className="bg-[#1E293B]">
      {/* Responder Header Bar */}
      <div className="p-5 pb-3 border-b border-slate-700/60 flex justify-between items-center bg-[#0F172A]">
        <div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
            Pendamping Resmi Terverifikasi
          </span>
          <h1 className="text-sm font-bold text-white mt-1">Sari Kusuma, S.H. (LBH APIK)</h1>
          <p className="text-[11px] text-slate-400">Kasus #JA-2026-0419 · Mode Hanya Baca</p>
        </div>
        <button onClick={() => setScreen('s03-calculator')} className="text-xs text-slate-400">Keluar</button>
      </div>

      {/* Access Countdown Banner */}
      <div className="p-4 bg-amber-950/40 border-b border-amber-800/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-amber-300">
          <Clock size={16} />
          <span>Sisa Waktu Akses: <strong>6 Hari 23 Jam</strong></span>
        </div>
        <span className="text-[10px] text-amber-400/80">Otomatis Terkunci</span>
      </div>

      {/* Evidence Viewer Panel */}
      <div className="p-5 space-y-4 flex-1 overflow-y-auto">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Berkas Bukti Terverifikasi</div>

        {evidenceList.map((item) => (
          <div key={item.id} className="bg-[#0F172A] border border-slate-700/60 rounded-3xl p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="text-xs text-slate-400">{item.timestamp}</p>
              </div>
              <span className="text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                <ShieldCheck size={12} /> SHA-256 Valid
              </span>
            </div>

            {/* Read-only Watermarked Preview Box */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center overflow-hidden">
              {/* Dynamic Watermark Overlay */}
              <div className="absolute inset-0 flex items-center justify-center rotate-[-12deg] pointer-events-none opacity-15 text-xs text-white font-mono whitespace-nowrap select-none">
                Sari Kusuma, S.H. · #JA-2026-0419 · Rahasia
              </div>
              
              <Eye className="mx-auto text-slate-500 mb-2" size={24} />
              <p className="text-xs text-slate-400 font-mono">Digest: {item.sha256Hex.slice(0, 16)}...</p>
              <p className="text-[11px] text-slate-500 mt-1">Pratinjau Terkunci · Tidak Dapat Diunduh</p>
            </div>
          </div>
        ))}
      </div>
    </MobileContainer>
  );
};