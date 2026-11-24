import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface DecorItem {
  icon: LucideIcon;
  /** Kelas Tailwind posisi, mis. "top-20 left-4". */
  position: string;
  /** Kelas Tailwind warna ikon. */
  tone: string;
  motion: 'float' | 'sway';
  size?: number;
  /** Jeda animasi dalam ms. */
  delay?: number;
}

interface FloatingDecorProps {
  items: readonly DecorItem[];
}

/** Aksen ikon tipis di belakang konten. Dekoratif, tidak bisa disentuh. */
export const FloatingDecor: React.FC<FloatingDecorProps> = ({ items }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
    {items.map(({ icon: Icon, position, tone, motion, size = 16, delay = 0 }, index) => (
      <span
        key={index}
        className={`absolute ja-${motion} ${position} ${tone}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <Icon size={size} strokeWidth={1.5} />
      </span>
    ))}
  </div>
);
