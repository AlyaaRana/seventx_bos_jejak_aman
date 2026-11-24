import React from 'react';
import { Heart } from 'lucide-react';
import type { HeartParticle } from '../../../hooks/useHeartBurst';

const TONES = ['text-rose-300', 'text-violet-300', 'text-emerald-300'] as const;

interface HeartBurstProps {
  particles: readonly HeartParticle[];
}

/** Lapisan hati lembut yang melayang. Letakkan di dalam elemen berposisi `relative`. */
export const HeartBurst: React.FC<HeartBurstProps> = ({ particles }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-visible">
    {particles.map((particle) => (
      <span
        key={particle.id}
        className={`ja-rise absolute left-1/2 top-1/2 -ml-2 -mt-2 ${TONES[particle.tone % TONES.length]}`}
        style={{ '--dx': `${particle.dx}px`, animationDelay: `${particle.delay}ms` } as React.CSSProperties}
      >
        <Heart size={16} fill="currentColor" strokeWidth={0} />
      </span>
    ))}
  </div>
);
