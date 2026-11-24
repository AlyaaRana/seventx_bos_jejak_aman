import React from 'react';
import { Sparkles } from 'lucide-react';
import aimImg from '../../../../assets/smile.png';
import { HeartBurst } from '../../../../components/shared/cute/HeartBurst';
import type { HeartParticle } from '../../../../hooks/useHeartBurst';
import type { Mood } from '../types';
import { MoodSelector } from './MoodSelector';

interface MascotCardProps {
  mood: Mood | null;
  /** Kalimat yang diucapkan maskot saat ini. */
  message: string;
  particles: readonly HeartParticle[];
  onMoodChange: (mood: Mood) => void;
  onHug: () => void;
  onOpenQuote: () => void;
}

/** Kartu utama: maskot pendamping yang bisa diketuk, gelembung ucapan, dan pemilih suasana hati. */
export const MascotCard: React.FC<MascotCardProps> = ({
  mood,
  message,
  particles,
  onMoodChange,
  onHug,
  onOpenQuote,
}) => (
  <section className="space-y-3.5 rounded-[28px] border border-white/90 bg-white/80 p-4 shadow-[0_8px_30px_rgba(76,29,149,0.05)] backdrop-blur-xl">
    <div className="flex items-center gap-3.5">
      <div className="relative shrink-0">
        <span aria-hidden className="ja-halo absolute inset-0 rounded-3xl bg-emerald-300/40" />
        <HeartBurst particles={particles} />
        <button
          type="button"
          onClick={onHug}
          aria-label="Ketuk untuk ditemani sebentar"
          className="ja-float relative h-16 w-16 rounded-3xl border border-white bg-gradient-to-br from-emerald-100 to-emerald-200/70 p-1.5 shadow-[0_6px_18px_rgba(16,185,129,0.18)] transition-transform active:scale-90"
        >
          <img src={aimImg} alt="" className="h-full w-full object-contain" />
        </button>
      </div>

      <div className="min-w-0 flex-1 space-y-1.5">
        <div key={message} aria-live="polite" className="ja-pop rounded-2xl rounded-bl-md bg-violet-50/70 px-3 py-2.5">
          <p className="text-[13px] font-medium leading-snug text-slate-800">{message}</p>
        </div>
        <p className="px-1 text-[12px] text-slate-500">Ketuk aku jika ingin ditemani sebentar</p>
      </div>
    </div>

    <button
      type="button"
      onClick={onOpenQuote}
      className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-violet-50 px-3.5 py-1.5 text-[12px] font-semibold text-violet-700 transition-colors hover:bg-violet-100"
    >
      <Sparkles size={12} />
      <span>Pesan penenang</span>
    </button>

    <MoodSelector mood={mood} onChange={onMoodChange} />
  </section>
);
