import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';

interface ActivityStripProps {
  evidenceCount: number;
  onOpenHistory: () => void;
  onOpenQueue: () => void;
}

export const ActivityStrip: React.FC<ActivityStripProps> = ({
  evidenceCount,
  onOpenHistory,
  onOpenQueue,
}) => (
  <section
    aria-label="Status brankas"
    className="rounded-[22px] border border-[#EAE2D3] bg-white p-3.5 shadow-[0_6px_18px_-10px_rgba(42,36,56,0.25)]"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <h2 className="text-[13px] font-extrabold text-[#2A2438]">Lagi berjalan</h2>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
          Terkunci
        </span>
      </div>

      <button
        type="button"
        onClick={onOpenQueue}
        className="flex items-center gap-0.5 text-[11px] font-semibold text-[#6B6480] transition-colors hover:text-[#2A2438]"
      >
        Antrean
        <ChevronRight size={13} />
      </button>
    </div>

    <div className="mt-3 flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 -rotate-3 items-center justify-center rounded-2xl bg-[#FFE9DD] text-[#D9552F]">
        <ShieldCheck size={22} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-[#2A2438]">Brankasmu aman</p>
        <p className="mt-0.5 text-[11px] leading-snug text-[#7B7389]">
          {evidenceCount === 0
            ? 'Belum ada yang disimpan. Pelan-pelan saja.'
            : `${evidenceCount} bukti tersimpan dengan aman`}
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenHistory}
        className="h-9 shrink-0 rounded-xl border-b-[3px] border-[#E0603F] bg-[#FF7A59] px-4 text-xs font-bold text-white transition-all duration-100 active:translate-y-[2px] active:border-b"
      >
        Buka
      </button>
    </div>
  </section>
);