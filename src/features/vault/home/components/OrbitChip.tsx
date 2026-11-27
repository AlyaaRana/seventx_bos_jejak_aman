import React from 'react';
import type { LucideIcon } from 'lucide-react';

const TONES = {
  mint: 'bg-[#D8F3E4] text-[#14532D]',
  peach: 'bg-[#FFE0D1] text-[#9A3412]',
  sand: 'bg-[#FFF3D6] text-[#854D0E]',
} as const;

interface OrbitChipProps {
  label: string;
  icon: LucideIcon;
  tone: keyof typeof TONES;
  /** Kemiringan dalam derajat, biar terasa seperti stiker yang ditempel. */
  tilt: number;
  /** Jeda animasi (detik) supaya chip tidak bergoyang serempak. */
  delay: number;
  /** Posisi absolut di dalam area orbit. */
  position: string;
  onClick: () => void;
}

export const OrbitChip: React.FC<OrbitChipProps> = ({
  label,
  icon: Icon,
  tone,
  tilt,
  delay,
  position,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{ '--tilt': `${tilt}deg`, animationDelay: `${delay}s` } as React.CSSProperties}
    className={`home-bob absolute flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold shadow-[0_6px_14px_-6px_rgba(0,0,0,0.5)] active:scale-95 ${TONES[tone]} ${position}`}
  >
    <Icon size={14} strokeWidth={2.4} />
    {label}
  </button>
);