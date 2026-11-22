// Komponen header langkah 1-2-3 khusus alur verifikasi pendamping.
import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';

interface ResponderStepHeaderProps {
  step: 1 | 2 | 3;
  title: string;
  backTarget?: 's01-welcome' | 's09a-responder-method' | 's09b-responder-nfc';
  leftLabel?: string;
}

export const ResponderStepHeader: React.FC<ResponderStepHeaderProps> = ({
  step,
  title,
  backTarget = 's01-welcome',
  leftLabel = 'Kembali',
}) => {
  const { setScreen } = useVaultStore();

  return (
    <div className="relative z-10 space-y-3 pt-1">
      {/* Top Bar: Tombol Kembali & Badge Langkah (beri ruang kanan untuk QuickExitFAB) */}
      <div className="flex items-center justify-between pr-24">
        <button
          type="button"
          onClick={() => setScreen(backTarget)}
          className="px-3 h-9 rounded-full bg-white border border-purple-100 flex items-center gap-1.5 text-xs font-bold text-slate-700 shadow-xs active:scale-95 transition-all shrink-0"
        >
          <ArrowLeft size={15} />
          <span>{leftLabel}</span>
        </button>

        <span className="text-[10px] font-extrabold text-[#7E22CE] bg-[#F3E8FF] px-3 py-1 rounded-full tracking-wide whitespace-nowrap">
          LANGKAH {step} DARI 3
        </span>
      </div>

      <h1 className="text-center text-base font-extrabold text-slate-900">{title}</h1>

      {/* Progress Stepper 1 -> 2 -> 3 */}
      <div className="flex items-center justify-center gap-3 px-4">
        {[1, 2, 3].map((num, idx) => {
          const isDone = step > num;
          const isCurrent = step === num;
          return (
            <React.Fragment key={num}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                  isDone
                    ? 'bg-[#DCFCE7] text-[#047857] border border-emerald-300'
                    : isCurrent
                    ? 'bg-[#FF7E62] text-white shadow-xs scale-105'
                    : 'bg-purple-100 text-purple-400'
                }`}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : num}
              </div>
              {idx < 2 && (
                <div
                  className={`h-1 flex-1 max-w-[44px] rounded-full ${
                    step > num ? 'bg-emerald-300' : 'bg-purple-100'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};