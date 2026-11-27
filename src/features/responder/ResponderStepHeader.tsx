import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import type { ScreenRoute } from '../../types/navigation';
import { ResponderHeader } from './ResponderUi';
import { cx } from './responderUtils';

const TOTAL_STEPS = 3;

interface ResponderStepHeaderProps {
  /** Langkah saat ini, mulai dari 1. */
  step: number;
  title: string;
  backTarget: ScreenRoute;
}

/** Header untuk tiga langkah verifikasi pendamping, lengkap dengan penanda progres. */
export const ResponderStepHeader: React.FC<ResponderStepHeaderProps> = ({ step, title, backTarget }) => {
  const { setScreen } = useVaultStore();

  return (
    <div className="space-y-3">
      <ResponderHeader
        eyebrow={`Langkah ${step} dari ${TOTAL_STEPS}`}
        title={title}
        onBack={() => setScreen(backTarget)}
      />

      <div
        role="progressbar"
        aria-label="Progres verifikasi"
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={step}
        className="flex gap-1.5"
      >
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <span
            key={index}
            className={cx('h-1.5 flex-1 rounded-full', index < step ? 'bg-[#FF7A59]' : 'bg-[#E5DDCC]')}
          />
        ))}
      </div>
    </div>
  );
};