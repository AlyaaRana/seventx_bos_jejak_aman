// Komponen visual kecil khusus alur pendamping: denyut NFC, bingkai pindai, dan baris data terisi.
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cx } from './responderUtils';
import './responder-animations.css';

/** Sudut-sudut bingkai pemindai. */
const FRAME_CORNERS = [
  'left-3 top-3 rounded-tl-2xl border-l-[3px] border-t-[3px]',
  'right-3 top-3 rounded-tr-2xl border-r-[3px] border-t-[3px]',
  'bottom-3 left-3 rounded-bl-2xl border-b-[3px] border-l-[3px]',
  'bottom-3 right-3 rounded-br-2xl border-b-[3px] border-r-[3px]',
] as const;

interface ScanFrameProps {
  isScanning: boolean;
  children: React.ReactNode;
}

/** Bingkai bidik dengan garis pindai yang bergerak saat `isScanning`. */
export const ScanFrame: React.FC<ScanFrameProps> = ({ isScanning, children }) => (
  <div className="relative overflow-hidden rounded-3xl bg-purple-50/60 p-6 ring-1 ring-purple-100">
    {FRAME_CORNERS.map((corner) => (
      <span key={corner} aria-hidden className={cx('absolute h-7 w-7 border-purple-500', corner)} />
    ))}
    {children}
    {isScanning && (
      <span
        aria-hidden
        className="rp-scan absolute inset-x-5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(52,211,153,0.9)]"
      />
    )}
  </div>
);

interface DataFieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
  mono?: boolean;
  /** Urutan tampil, untuk jeda animasi bertahap. */
  index?: number;
}

/** Satu baris data yang sudah terisi otomatis, muncul bertahap. */
export const DataField: React.FC<DataFieldProps> = ({ icon: Icon, label, value, mono = false, index = 0 }) => (
  <div
    className="rp-reveal flex items-center gap-3 rounded-2xl border border-purple-100 bg-white p-3"
    style={{ animationDelay: `${index * 120}ms` }}
  >
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
      <Icon size={18} strokeWidth={1.9} />
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className={cx('truncate font-extrabold text-slate-900', mono ? 'font-mono text-sm' : 'text-[15px]')}>
        {value}
      </p>
    </div>
    <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
  </div>
);
