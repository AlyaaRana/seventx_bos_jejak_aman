import { useCallback, useEffect, useRef, useState } from 'react';

export interface HeartParticle {
  id: number;
  /** Pergeseran horizontal (px) saat melayang naik. */
  dx: number;
  /** Jeda animasi (ms) supaya hati tidak muncul serentak. */
  delay: number;
  /** Indeks warna hati (diputar oleh `HeartBurst`). */
  tone: number;
}

const TONE_COUNT = 3;
const DEFAULT_COUNT = 5;
const PARTICLE_LIFETIME_MS = 1900;

/** Menghasilkan beberapa hati lembut yang melayang naik saat `burst()` dipanggil. */
export function useHeartBurst() {
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const nextId = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const burst = useCallback((count = DEFAULT_COUNT) => {
    const batch: HeartParticle[] = Array.from({ length: count }, () => ({
      id: nextId.current++,
      dx: Math.round(Math.random() * 100 - 50),
      delay: Math.round(Math.random() * 250),
      tone: Math.floor(Math.random() * TONE_COUNT),
    }));
    const batchIds = new Set(batch.map((particle) => particle.id));

    setParticles((current) => [...current, ...batch]);
    timers.current.push(
      window.setTimeout(
        () => setParticles((current) => current.filter((particle) => !batchIds.has(particle.id))),
        PARTICLE_LIFETIME_MS,
      ),
    );
  }, []);

  return { particles, burst };
}
