import React from 'react';
import { FloatingDecor } from '../../../../components/shared/cute/FloatingDecor';
import { DECOR_PRESETS } from '../../../../components/shared/cute/decorPresets';
import { MOODS, NEUTRAL_GLOW } from '../constants';
import type { Mood } from '../types';

interface AmbientBackdropProps {
  mood: Mood | null;
}

const ORB_POSITIONS = [
  '-top-16 -right-16 h-80 w-80',
  'top-1/3 -left-24 h-72 w-72',
  '-bottom-16 -right-16 h-80 w-80',
] as const;

/** Orb cahaya yang warnanya berubah halus mengikuti suasana hati, plus dua aksen ikon tipis. */
export const AmbientBackdrop: React.FC<AmbientBackdropProps> = ({ mood }) => (
  <>
    {(mood ? MOODS[mood].glow : NEUTRAL_GLOW).map((color, index) => (
      <div
        key={ORB_POSITIONS[index]}
        aria-hidden
        className={`ja-drift pointer-events-none absolute rounded-full blur-3xl transition-colors duration-1000 ${ORB_POSITIONS[index]} ${color}`}
        style={{ animationDelay: `${index * 2500}ms` }}
      />
    ))}
    <FloatingDecor items={DECOR_PRESETS.home} />
  </>
);
