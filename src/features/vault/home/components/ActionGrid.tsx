import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ACTIONS } from '../constants';
import type { ScreenRoute } from '../types';

interface ActionGridProps {
  onNavigate: (screen: ScreenRoute) => void;
}

/** Empat aksi utama menyimpan bukti: kartu kaca putih dengan satu aksen warna lembut per kartu. */
export const ActionGrid: React.FC<ActionGridProps> = ({ onNavigate }) => (
  <div className="grid grid-cols-2 gap-3">
    {ACTIONS.map(({ id, label, hint, icon: Icon, screen, bubble }) => (
      <button
        key={id}
        type="button"
        onClick={() => onNavigate(screen)}
        className="group flex min-h-[7.5rem] flex-col justify-between rounded-[24px] border border-white/90 bg-white/80 p-4 text-left shadow-[0_6px_24px_rgba(76,29,149,0.05)] backdrop-blur-md transition-all duration-200 hover:bg-white active:scale-[0.97]"
      >
        <div className="flex items-start justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${bubble}`}>
            <Icon size={20} strokeWidth={1.9} />
          </div>
          <ArrowUpRight
            size={15}
            className="text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-500"
          />
        </div>
        <div className="space-y-0.5">
          <p className="text-[13px] font-semibold tracking-tight text-slate-800">{label}</p>
          <p className="text-[11px] font-medium text-slate-500">{hint}</p>
        </div>
      </button>
    ))}
  </div>
);
