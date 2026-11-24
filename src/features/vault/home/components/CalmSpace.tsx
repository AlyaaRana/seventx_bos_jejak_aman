import React, { useId, useState } from 'react';
import { ChevronDown, Leaf } from 'lucide-react';

interface CalmSpaceProps {
  bloomCount: number;
  isSoundOn: boolean;
  children: React.ReactNode;
}

/** Bagian opsional (suara & taman) yang dilipat secara bawaan, supaya Home tidak terasa penuh. */
export const CalmSpace: React.FC<CalmSpaceProps> = ({ bloomCount, isSoundOn, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  const summary =
    [isSoundOn && 'Suara menyala', bloomCount > 0 && `${bloomCount} bunga`].filter(Boolean).join(' · ') ||
    'Suara & taman';

  return (
    <section>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-3 rounded-[24px] border border-white/90 bg-white/70 px-4 py-3 text-left shadow-[0_4px_20px_rgba(76,29,149,0.04)] backdrop-blur-md transition-all hover:bg-white active:scale-[0.99]"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Leaf size={17} strokeWidth={1.9} />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold text-slate-800">Ruang tenang</span>
            <span className="block truncate text-[12px] text-slate-500">{summary}</span>
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div id={panelId} className="ja-fade-in space-y-3.5 pt-3">
          {children}
        </div>
      )}
    </section>
  );
};
