import { useCallback, useEffect, useRef, useState } from 'react';

export interface FloatingHeart {
  id: number;
  /** Geser horizontal (px) saat hati melayang naik. */
  dx: number;
}

const HEARTS_PER_BURST = 5;
const LIFETIME_MS = 900;
const SPREAD_PX = 120;

/** Hati kecil yang melayang saat tombol peluk ditekan. */
export const useHugBurst = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const nextId = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const burst = useCallback(() => {
    const batch = Array.from({ length: HEARTS_PER_BURST }, () => ({
      id: nextId.current++,
      dx: Math.round((Math.random() - 0.5) * SPREAD_PX),
    }));
    const ids = new Set(batch.map((heart) => heart.id));

    setHearts((current) => [...current, ...batch]);
    timers.current.push(
      window.setTimeout(() => {
        setHearts((current) => current.filter((heart) => !ids.has(heart.id)));
      }, LIFETIME_MS),
    );
  }, []);

  return { hearts, burst };
};