import React from 'react';
import { MOODS, MOOD_ORDER } from '../constants';
import type { Mood } from '../types';

interface MoodSelectorProps {
  mood: Mood | null;
  onChange: (mood: Mood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ mood, onChange }) => (
  <div className="space-y-2 border-t border-slate-100 pt-3">
    <p className="text-[12px] font-medium text-slate-500">Bagaimana perasaanmu sekarang?</p>
    <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Pilih suasana hati">
      {MOOD_ORDER.map((id) => {
        const { icon: Icon, label, chipActive } = MOODS[id];
        const isActive = mood === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(id)}
            className={`flex items-center justify-center gap-1.5 rounded-full border px-2 py-2 text-[12px] font-semibold transition-all active:scale-95 ${
              isActive ? chipActive : 'border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Icon size={13} strokeWidth={2} />
            <span className="truncate">{label}</span>
          </button>
        );
      })}
    </div>
  </div>
);
