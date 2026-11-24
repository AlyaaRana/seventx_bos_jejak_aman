import { Flower2, Leaf, Moon, Sparkles } from 'lucide-react';
import type { DecorItem } from './FloatingDecor';

/** Aksen tipis per layar (dua saja, sengaja sedikit supaya tetap terasa tenang). */
export const DECOR_PRESETS = {
  home: [
    { icon: Sparkles, position: 'top-28 right-7', tone: 'text-violet-300', motion: 'float', size: 14 },
    { icon: Leaf, position: 'bottom-72 left-3', tone: 'text-emerald-300/80', motion: 'sway', size: 18, delay: 600 },
  ],
  audio: [
    { icon: Sparkles, position: 'top-32 right-6', tone: 'text-violet-300', motion: 'float', size: 14 },
    { icon: Moon, position: 'bottom-32 left-4', tone: 'text-violet-200', motion: 'float', size: 18, delay: 800 },
  ],
  photo: [
    { icon: Sparkles, position: 'top-32 left-5', tone: 'text-violet-300', motion: 'float', size: 14 },
    { icon: Flower2, position: 'bottom-32 right-4', tone: 'text-rose-300', motion: 'sway', size: 18, delay: 600 },
  ],
  note: [
    { icon: Sparkles, position: 'top-32 right-6', tone: 'text-amber-300', motion: 'float', size: 14 },
    { icon: Leaf, position: 'bottom-36 left-3', tone: 'text-emerald-300/80', motion: 'sway', size: 18, delay: 500 },
  ],
  file: [
    { icon: Sparkles, position: 'top-32 left-5', tone: 'text-violet-300', motion: 'float', size: 14 },
    { icon: Leaf, position: 'bottom-44 right-4', tone: 'text-emerald-300/80', motion: 'sway', size: 18, delay: 700 },
  ],
} as const satisfies Record<string, readonly DecorItem[]>;
