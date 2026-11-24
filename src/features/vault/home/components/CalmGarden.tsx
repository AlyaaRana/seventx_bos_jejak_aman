import React from 'react';
import { Droplets, Sprout } from 'lucide-react';
import { GARDEN_BLOOMS, MAX_GARDEN_SIZE } from '../constants';
import type { GardenBloom } from '../types';

interface CalmGardenProps {
  blooms: readonly GardenBloom[];
  onWater: () => void;
}

/** Taman kecil: bunga tumbuh tiap kali korban memeluk maskot, bernapas, atau menyiram. Tanpa target, tanpa tekanan. */
export const CalmGarden: React.FC<CalmGardenProps> = ({ blooms, onWater }) => (
  <section className="space-y-3 rounded-[24px] border border-white/90 bg-gradient-to-br from-emerald-50/80 via-white/80 to-amber-50/60 p-4 shadow-[0_6px_24px_rgba(16,185,129,0.05)] backdrop-blur-md">
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-1.5 text-[13px] font-semibold tracking-tight text-slate-800">
        <Sprout size={15} className="text-emerald-500" />
        Taman Ketenangan
      </h2>
      <button
        type="button"
        onClick={onWater}
        className="flex items-center gap-1 rounded-full border border-sky-100 bg-white px-3 py-1 text-[12px] font-semibold text-sky-600 shadow-xs transition-all hover:bg-sky-50 active:scale-95"
      >
        <Droplets size={12} />
        <span>Siram</span>
      </button>
    </div>

    <div
      className="flex min-h-[3.75rem] flex-wrap items-end gap-x-1.5 rounded-2xl border-b-4 border-emerald-200/80 bg-emerald-50/50 px-3 pt-2"
      aria-label={`${blooms.length} bunga tumbuh di tamanmu`}
    >
      {blooms.length === 0 ? (
        <p className="w-full pb-3 text-center text-[12px] text-emerald-700">
          Tamanmu masih kosong. Peluk aku atau siram untuk menumbuhkan bunga pertama.
        </p>
      ) : (
        blooms.map(({ id, variant }) => {
          const { icon: Icon, tone } = GARDEN_BLOOMS[variant];
          return (
            <span key={id} aria-hidden className="ja-pop inline-block origin-bottom">
              <span
                className="ja-sway inline-block origin-bottom"
                style={{ animationDelay: `${(id * 331) % 1800}ms` }}
              >
                <Icon size={26} strokeWidth={1.5} className={tone} />
              </span>
            </span>
          );
        })
      )}
    </div>

    <p className="text-center text-[11px] text-slate-500">
      {blooms.length >= MAX_GARDEN_SIZE
        ? 'Tamanmu penuh bunga. Cantik, sama sepertimu.'
        : 'Setiap hal kecil yang kamu lakukan untuk dirimu menumbuhkan bunga.'}
    </p>
  </section>
);
