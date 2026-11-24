import { useCallback, useEffect, useRef, useState } from 'react';
import { createAmbientEngine, type AmbientEngine } from '../audio/ambientEngine';
import type { PlayableSoundId, SoundId } from '../types';

/**
 * Mengelola suara suasana dengan pengaman:
 * - Pertama kali memutar, korban diminta konfirmasi dulu (suara keluar dari speaker).
 * - Suara berhenti otomatis saat layar dikunci / aplikasi disembunyikan.
 * - Suara berhenti saat layar ditinggalkan (mis. Keluar Cepat).
 */
export function useAmbientSound() {
  const [sound, setSound] = useState<SoundId>('off');
  const [pending, setPending] = useState<PlayableSoundId | null>(null);
  const engineRef = useRef<AmbientEngine | null>(null);
  const acknowledgedRef = useRef(false);

  const start = useCallback((next: PlayableSoundId) => {
    engineRef.current ??= createAmbientEngine();
    engineRef.current.play(next);
    setSound(next);
  }, []);

  const stop = useCallback(() => {
    engineRef.current?.stop();
    setSound('off');
    setPending(null);
  }, []);

  useEffect(() => () => engineRef.current?.dispose(), []);

  useEffect(() => {
    const stopWhenHidden = () => {
      if (document.hidden) stop();
    };
    document.addEventListener('visibilitychange', stopWhenHidden);
    return () => document.removeEventListener('visibilitychange', stopWhenHidden);
  }, [stop]);

  const select = useCallback(
    (next: SoundId) => {
      if (next === 'off') {
        stop();
      } else if (acknowledgedRef.current) {
        start(next);
      } else {
        setPending(next);
      }
    },
    [start, stop],
  );

  const confirm = useCallback(() => {
    if (!pending) return;
    acknowledgedRef.current = true;
    start(pending);
    setPending(null);
  }, [pending, start]);

  const cancel = useCallback(() => setPending(null), []);

  return { sound, pending, select, confirm, cancel };
}
