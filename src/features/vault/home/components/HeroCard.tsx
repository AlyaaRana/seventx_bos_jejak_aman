import React from 'react';
import { Heart, Phone, Sparkles, Wind } from 'lucide-react';
import type { FloatingHeart } from '../hooks/useHugBurst';
import type { Mood } from '../types';
import { CozyHouse } from './CozyHouse';
import { MoodPicker } from './MoodPicker';
import { OrbitChip } from './OrbitChip';

const STARS = [
  { top: '8%', left: '10%', size: 3, delay: 0 },
  { top: '14%', left: '62%', size: 2, delay: 0.8 },
  { top: '30%', left: '90%', size: 3, delay: 1.6 },
  { top: '46%', left: '5%', size: 2, delay: 2.2 },
  { top: '72%', left: '52%', size: 2, delay: 1.1 },
] as const;

const GLOW_BACKGROUND = 'radial-gradient(120% 80% at 50% 0%, rgba(255,155,122,0.18), transparent 60%)';

interface HeroCardProps {
  mood: Mood | null;
  message: string;
  hearts: readonly FloatingHeart[];
  onMoodChange: (mood: Mood) => void;
  onHug: () => void;
  onOpenBreathing: () => void;
  onOpenQuote: () => void;
  onCall: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  mood,
  message,
  hearts,
  onMoodChange,
  onHug,
  onOpenBreathing,
  onOpenQuote,
  onCall,
}) => (
  <section
    aria-label="Ruang tenang"
    className="relative overflow-hidden rounded-[28px] bg-[#26215F] px-4 pb-5 pt-5 text-white"
    style={{ backgroundImage: GLOW_BACKGROUND }}
  >
    {STARS.map(({ top, left, size, delay }) => (
      <span
        key={`${top}-${left}`}
        aria-hidden="true"
        className="home-twinkle absolute rounded-full bg-white"
        style={{ top, left, width: size, height: size, animationDelay: `${delay}s` }}
      />
    ))}

    <p
      aria-live="polite"
      className="relative mx-auto max-w-[290px] rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5 text-center text-[13px] leading-snug text-indigo-50"
    >
      {message}
    </p>

    {/* Area orbit: tombol peluk di tengah, alat bantu mengitari */}
    <div className="relative mt-3 h-[200px]">
      <svg
        viewBox="0 0 300 190"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <ellipse
          cx="150"
          cy="95"
          rx="138"
          ry="70"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.2"
          strokeDasharray="3 6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <CozyHouse className="absolute bottom-0 left-[6%] h-12 w-14" />

      <OrbitChip
        label="Napas"
        icon={Wind}
        tone="mint"
        tilt={-4}
        delay={0}
        position="left-[3%] top-[14%]"
        onClick={onOpenBreathing}
      />
      <OrbitChip
        label="Semangat"
        icon={Sparkles}
        tone="peach"
        tilt={3}
        delay={1.2}
        position="right-[4%] top-[6%]"
        onClick={onOpenQuote}
      />
      <OrbitChip
        label="Telepon"
        icon={Phone}
        tone="sand"
        tilt={-2}
        delay={2.1}
        position="right-[8%] bottom-[10%]"
        onClick={onCall}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[118px] w-[118px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-white/15"
      />

      <button
        type="button"
        aria-label="Peluk"
        onClick={onHug}
        className="group absolute left-1/2 top-1/2 flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#FFF8EC] text-[#1E1B4B] shadow-[0_10px_30px_-6px_rgba(0,0,0,0.55)] transition-transform active:scale-95"
      >
        <Heart
          size={28}
          className="fill-[#FF7A59] text-[#FF7A59] transition-transform group-active:scale-90"
        />
        <span className="mt-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em]">Peluk</span>
      </button>

      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
        {hearts.map(({ id, dx }) => (
          <Heart
            key={id}
            size={16}
            style={{ '--dx': `${dx}px` } as React.CSSProperties}
            className="home-heart-rise absolute -left-2 -top-2 fill-[#FF9B7A] text-[#FF9B7A]"
          />
        ))}
      </div>
    </div>

    <MoodPicker mood={mood} onChange={onMoodChange} />
  </section>
);