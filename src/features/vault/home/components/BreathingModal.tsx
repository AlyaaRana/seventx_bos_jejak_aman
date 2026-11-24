import React, { useEffect, useState } from 'react';
import { BREATHING_REST_SCALE } from '../constants';
import { useBreathingCycle } from '../hooks/useBreathingCycle';
import { ModalShell } from './ModalShell';

interface BreathingModalProps {
  onClose: () => void;
  /** Dipanggil setiap satu putaran napas selesai. */
  onCycleComplete: () => void;
}

function getCycleMessage(cycles: number): string | null {
  if (cycles === 0) return null;
  if (cycles < 3) return `${cycles} putaran selesai`;
  return `${cycles} putaran selesai. Bahumu pasti terasa lebih ringan.`;
}

export const BreathingModal: React.FC<BreathingModalProps> = ({ onClose, onCycleComplete }) => {
  const { phase, secondsLeft, cycles } = useBreathingCycle(onCycleComplete);

  // Mulai dari ukuran istirahat lalu membesar, supaya tarikan napas pertama ikut beranimasi.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const scale = ready ? phase.scale : BREATHING_REST_SCALE;
  const cycleMessage = getCycleMessage(cycles);

  return (
    <ModalShell label="Jeda napas pelan" onClose={onClose}>
      <div className="space-y-4">
        <div className="flex h-44 items-center justify-center">
          <div
            className="relative flex items-center justify-center"
            style={{
              transform: `scale(${scale})`,
              transition: `transform ${phase.seconds}s ease-in-out`,
            }}
          >
            <span aria-hidden className="ja-halo absolute h-24 w-24 rounded-full bg-emerald-300/50" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-tr from-emerald-200 via-emerald-300 to-teal-300 shadow-lg">
              <span className="text-3xl font-semibold text-emerald-900">{secondsLeft}</span>
            </div>
          </div>
        </div>

        <div className="space-y-0.5" aria-live="polite">
          <p className="text-base font-semibold tracking-wide text-emerald-800">{phase.label}</p>
          <p className="text-[12px] text-slate-500">{phase.hint}</p>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-slate-900">Jeda napas pelan</h3>
          <p className="mx-auto max-w-[230px] text-[12px] leading-relaxed text-slate-500">
            Tarik 4 detik, hembuskan 6 detik. Tidak ada tahan napas. Ikuti lingkaran, dan berhenti kapan saja.
          </p>
          {cycleMessage && <p className="ja-pop pt-1 text-[12px] font-semibold text-emerald-600">{cycleMessage}</p>}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-2xl bg-emerald-600 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
        >
          Saya lebih tenang
        </button>
      </div>
    </ModalShell>
  );
};
