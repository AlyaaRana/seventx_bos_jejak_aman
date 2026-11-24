import { useEffect, useRef, useState } from 'react';
import { BREATHING_CYCLE_SECONDS, BREATHING_PHASES } from '../constants';
import type { BreathingPhase } from '../types';

interface PhaseState {
  phase: BreathingPhase;
  secondsLeft: number;
}

/** Menentukan fase napas dan sisa detiknya dari posisi detik di dalam satu siklus. */
function resolvePhase(secondInCycle: number): PhaseState {
  let remaining = secondInCycle;
  for (const phase of BREATHING_PHASES) {
    if (remaining < phase.seconds) {
      return { phase, secondsLeft: phase.seconds - remaining };
    }
    remaining -= phase.seconds;
  }
  const first = BREATHING_PHASES[0];
  return { phase: first, secondsLeft: first.seconds };
}

/**
 * Siklus napas pelan (tarik 4, hembuskan 6). Mulai berjalan saat komponen pemakai dipasang
 * dan berhenti otomatis saat dilepas.
 */
export function useBreathingCycle(onCycleComplete?: () => void) {
  const [elapsed, setElapsed] = useState(0);
  const onCompleteRef = useRef(onCycleComplete);

  useEffect(() => {
    onCompleteRef.current = onCycleComplete;
  }, [onCycleComplete]);

  useEffect(() => {
    const interval = window.setInterval(() => setElapsed((seconds) => seconds + 1), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const cycles = Math.floor(elapsed / BREATHING_CYCLE_SECONDS);

  useEffect(() => {
    if (cycles > 0) onCompleteRef.current?.();
  }, [cycles]);

  const { phase, secondsLeft } = resolvePhase(elapsed % BREATHING_CYCLE_SECONDS);
  return { phase, secondsLeft, cycles };
}
