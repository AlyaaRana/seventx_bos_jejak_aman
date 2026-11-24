import React from 'react';
import { CloudUpload, Lock, ShieldCheck, Wind } from 'lucide-react';

interface VaultStatusCardProps {
  evidenceCount: number;
  onOpenQueue: () => void;
  onOpenBreathing: () => void;
}

export const VaultStatusCard: React.FC<VaultStatusCardProps> = ({ evidenceCount, onOpenQueue, onOpenBreathing }) => (
  <section className="flex items-center justify-between gap-2 rounded-[24px] border border-emerald-100/80 bg-gradient-to-r from-emerald-50/90 to-teal-50/70 p-3.5 shadow-[0_6px_24px_rgba(16,185,129,0.07)] backdrop-blur-md">
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-xs">
        <ShieldCheck size={19} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold leading-tight text-emerald-950">
          {evidenceCount} bukti terkunci aman
        </p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] font-medium text-emerald-700">
          <Lock size={10} className="shrink-0" />
          <span className="truncate">Hanya di HP-mu · Dilindungi kunci</span>
        </p>
      </div>
    </div>

    <div className="flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        onClick={onOpenQueue}
        title="Status Antrean Offline"
        className="flex items-center gap-1 rounded-full border border-violet-100 bg-white px-3 py-1.5 text-[12px] font-semibold text-violet-700 shadow-xs transition-all hover:bg-violet-50 active:scale-95"
      >
        <CloudUpload size={13} />
        <span>Antrean</span>
      </button>
      <button
        type="button"
        onClick={onOpenBreathing}
        className="flex items-center gap-1 rounded-full bg-emerald-600 px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
      >
        <Wind size={13} />
        <span>Napas</span>
      </button>
    </div>
  </section>
);
