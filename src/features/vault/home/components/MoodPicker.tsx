import React from 'react';
import { MOODS } from '../constants';
import type { Mood } from '../types';

const MOOD_KEYS = Object.keys(MOODS) as Mood[];

/** Label sementara diambil dari key MOODS. Ganti di sini kalau MOODS punya label sendiri. */
const toLabel = (key: string): string => key.charAt(0).toUpperCase() + key.slice(1);

interface MoodPickerProps {
  mood: Mood | null;
  onChange: (mood: Mood) => void;
}

export const MoodPicker: React.FC<MoodPickerProps> = ({ mood, onChange }) => (
  <div>
    <p className="text-center text-[11px] font-medium text-indigo-200/70">Lagi gimana hari ini?</p>
    <div className="mt-2 flex flex-wrap justify-center gap-2">
      {MOOD_KEYS.map((key) => {
        const isSelected = mood === key;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
              isSelected
                ? 'border-[#FF7A59] bg-[#FF7A59] text-white'
                : 'border-white/15 bg-white/5 text-indigo-100 hover:bg-white/10'
            }`}
          >
            {toLabel(key)}
          </button>
        );
      })}
    </div>
  </div>
);