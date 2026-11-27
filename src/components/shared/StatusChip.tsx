import React from 'react';
import type { LucideIcon } from 'lucide-react';

const TONES = {
  green: 'bg-emerald-100 text-emerald-800',
  amber: 'bg-amber-100 text-amber-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  rose: 'bg-rose-100 text-rose-700',
  gray: 'bg-[#EFE9DD] text-[#6B6480]',
} as const;

export type StatusTone = keyof typeof TONES;

interface StatusChipProps {
  tone: StatusTone;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export const StatusChip: React.FC<StatusChipProps> = ({ tone, icon: Icon, children }) => (
  <span
    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${TONES[tone]}`}
  >
    {Icon && <Icon size={11} strokeWidth={2.4} />}
    {children}
  </span>
);