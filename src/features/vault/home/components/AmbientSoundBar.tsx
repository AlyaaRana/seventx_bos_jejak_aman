import React from 'react';
import { Headphones, Volume2 } from 'lucide-react';
import { SOUND_OPTIONS } from '../constants';
import type { PlayableSoundId, SoundId } from '../types';

interface AmbientSoundBarProps {
  sound: SoundId;
  /** Suara yang menunggu konfirmasi sebelum diputar. */
  pending: PlayableSoundId | null;
  onSelect: (sound: SoundId) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const EQUALIZER_BARS = [0, 1, 2, 3] as const;

const Equalizer: React.FC = () => (
  <div aria-hidden className="flex h-3 items-end gap-0.5">
    {EQUALIZER_BARS.map((bar) => (
      <span
        key={bar}
        className="ja-wave h-full w-0.5 origin-bottom rounded-full bg-violet-400"
        style={{ animationDelay: `${bar * 150}ms` }}
      />
    ))}
  </div>
);

export const AmbientSoundBar: React.FC<AmbientSoundBarProps> = ({ sound, pending, onSelect, onConfirm, onCancel }) => {
  const isPlaying = sound !== 'off';
  const pendingLabel = SOUND_OPTIONS.find((option) => option.id === pending)?.label.toLowerCase();

  return (
    <section className="space-y-2.5 rounded-[24px] border border-white/90 bg-white/70 px-4 py-3 shadow-[0_4px_20px_rgba(76,29,149,0.04)] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600">
          <Volume2 size={14} className={isPlaying ? 'text-violet-600' : 'text-slate-500'} />
          <span>Suara suasana</span>
        </div>
        {isPlaying && <Equalizer />}
      </div>

      <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Pilih suara suasana">
        {SOUND_OPTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = sound === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(id)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition-all active:scale-95 ${
                isActive ? 'bg-violet-600 text-white shadow-xs' : 'bg-slate-50 text-slate-500 hover:bg-violet-50'
              }`}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {pending && (
        <div role="alertdialog" aria-label="Konfirmasi suara" className="ja-pop space-y-2.5 rounded-2xl border border-amber-100 bg-amber-50/80 p-3">
          <p className="flex items-start gap-2 text-[12px] font-medium leading-snug text-amber-900">
            <Headphones size={14} className="mt-0.5 shrink-0" />
            <span>
              Suara {pendingLabel} akan terdengar dari speaker HP. Pakai headset, atau pastikan sekitarmu aman.
            </span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl bg-white py-2 text-[12px] font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-violet-600 py-2 text-[12px] font-semibold text-white transition-all hover:bg-violet-700 active:scale-95"
            >
              Putar suara
            </button>
          </div>
        </div>
      )}

      {isPlaying && (
        <p className="ja-fade-in text-center text-[11px] text-slate-500">Suara berhenti otomatis saat layar dikunci</p>
      )}
    </section>
  );
};
