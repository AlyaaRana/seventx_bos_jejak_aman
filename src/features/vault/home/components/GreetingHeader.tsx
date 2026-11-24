import React from 'react';
import { getGreeting } from '../utils';

/** Sapaan sesuai waktu. `pr-28` menyisakan ruang untuk tombol Keluar Cepat yang melayang. */
export const GreetingHeader: React.FC = () => {
  const { text, icon: GreetingIcon, tone } = getGreeting(new Date().getHours());

  return (
    <header className="relative z-10 flex items-center p-5 pb-2 pr-28">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-gradient-to-br from-[#C4B5FD] to-[#8B5CF6] shadow-[0_4px_16px_rgba(139,92,246,0.22)]">
          <span className="text-xs font-bold tracking-tight text-white">JA</span>
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-[12px] font-medium text-slate-500">
            <GreetingIcon size={12} className={tone} />
            <span>{text}</span>
          </p>
          <p className="flex items-center gap-1.5 text-[15px] font-semibold leading-tight tracking-tight text-[#1E1B4B]">
            Jejak Aman
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-label="Ruang aman aktif" />
          </p>
        </div>
      </div>
    </header>
  );
};
