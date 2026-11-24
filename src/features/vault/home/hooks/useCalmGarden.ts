import { useCallback, useState } from 'react';
import { GARDEN_BLOOMS, MAX_GARDEN_SIZE } from '../constants';
import type { GardenBloom } from '../types';

interface GardenState {
  planted: number;
  blooms: readonly GardenBloom[];
}

/** Taman kecil yang tumbuh setiap kali korban merawat dirinya (peluk, napas, siram). */
export function useCalmGarden() {
  const [garden, setGarden] = useState<GardenState>({ planted: 0, blooms: [] });

  const plant = useCallback(() => {
    setGarden(({ planted, blooms }) => ({
      planted: planted + 1,
      blooms: [...blooms, { id: planted, variant: planted % GARDEN_BLOOMS.length }].slice(-MAX_GARDEN_SIZE),
    }));
  }, []);

  return { blooms: garden.blooms, plant };
}
