import React from 'react';

export type OrbTone = 'violet' | 'emerald' | 'amber';

const ORB_COLORS: Record<OrbTone, readonly [string, string]> = {
  violet: ['bg-violet-200/60', 'bg-emerald-100/70'],
  emerald: ['bg-emerald-200/60', 'bg-violet-100/70'],
  amber: ['bg-amber-100/80', 'bg-violet-100/70'],
};

interface SoftOrbsProps {
  tone?: OrbTone;
}

/** Dua orb cahaya blur di latar layar. Satu-satunya dekorasi di layar turunan. */
export const SoftOrbs: React.FC<SoftOrbsProps> = ({ tone = 'violet' }) => {
  const [top, bottom] = ORB_COLORS[tone];

  return (
    <>
      <div aria-hidden className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl ${top}`} />
      <div aria-hidden className={`pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full blur-3xl ${bottom}`} />
    </>
  );
};
