// Header langkah wizard pendamping: tombol kembali, judul, lencana peran, dan progres bersegmen.
import React from 'react';
import { ArrowLeft, BadgeCheck } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { TOTAL_STEPS, type ScreenId } from './responderData';
import { cx } from './responderUtils';

interface ResponderStepHeaderProps {
  step: number;
  backTarget: ScreenId;
  title?: string;
}

const SEGMENT_TONES = {
  done: 'bg-emerald-400',
  current: 'bg-gradient-to-r from-[#3048D9] to-[#7C8CF8]',
  upcoming: 'bg-slate-200',
} as const;

function getSegmentTone(segment: number, step: number): string {
  if (segment < step) return SEGMENT_TONES.done;
  if (segment === step) return SEGMENT_TONES.current;
  return SEGMENT_TONES.upcoming;
}

export const ResponderStepHeader: React.FC<ResponderStepHeaderProps> = ({ step, backTarget, title }) => {
  const { setScreen } = useVaultStore();

  return (
    <header className="space-y-3 pb-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Kembali"
          onClick={() => setScreen(backTarget)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-slate-500">
            Langkah {step} dari {TOTAL_STEPS}
          </p>
          {title && <h1 className="truncate text-base font-extrabold leading-tight tracking-tight text-slate-900">{title}</h1>}
        </div>

        <span className="flex h-8 shrink-0 items-center gap-1 rounded-full border border-purple-100 bg-purple-50 px-2.5 text-[12px] font-bold text-purple-700">
          <BadgeCheck size={13} />
          Pendamping
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={`Langkah ${step} dari ${TOTAL_STEPS}`}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={step}
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${TOTAL_STEPS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <span
            key={index}
            className={cx('h-1.5 rounded-full transition-colors duration-500', getSegmentTone(index + 1, step))}
          />
        ))}
      </div>
    </header>
  );
};
