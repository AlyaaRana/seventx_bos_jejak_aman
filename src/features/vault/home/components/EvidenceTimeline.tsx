import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { EVIDENCE_KIND_STYLE } from '../constants';
import type { EvidencePreview } from '../types';

interface EvidenceTimelineProps {
  items: readonly EvidencePreview[];
  onOpenHistory: () => void;
}

const PREVIEW_LIMIT = 3;

export const EvidenceTimeline: React.FC<EvidenceTimelineProps> = ({ items, onOpenHistory }) => (
  <section className="pt-1">
    <div className="mb-3 flex items-center justify-between px-1">
      <h2 className="text-[13px] font-semibold tracking-tight text-slate-800">Jejak buktimu</h2>
      <button
        type="button"
        onClick={onOpenHistory}
        className="group flex items-center gap-0.5 text-[12px] font-semibold text-violet-600 hover:underline"
      >
        <span>Lihat semua</span>
        <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>

    <ul className="relative space-y-2.5 pl-6">
      <div aria-hidden className="absolute bottom-4 left-[9px] top-3 w-[2px] border-l-2 border-dashed border-emerald-200" />

      {items.slice(0, PREVIEW_LIMIT).map((item) => {
        const { icon: Icon, tone } = EVIDENCE_KIND_STYLE[item.kind];
        return (
          <li key={item.id}>
            <button type="button" onClick={onOpenHistory} className="group relative flex w-full items-center text-left">
              <span
                aria-hidden
                className="absolute -left-6 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs"
              >
                <Check size={11} strokeWidth={3} />
              </span>

              <div className="flex w-full items-center gap-3 rounded-2xl border border-white/90 bg-white/85 p-3 shadow-[0_2px_14px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 group-hover:border-violet-200 group-hover:shadow-[0_4px_20px_rgba(124,58,237,0.07)]">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                  <Icon size={17} strokeWidth={1.9} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold leading-tight text-slate-800">{item.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                    <span>{item.timestamp}</span>
                    <span>·</span>
                    <span className="font-semibold text-emerald-600">Terkunci aman</span>
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-violet-500"
                />
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  </section>
);
