import type { LucideIcon } from 'lucide-react';
import type { ScreenRoute } from '../../../types/navigation';

export type { ScreenRoute };

export type Mood = 'tenang' | 'cemas' | 'butuh_teman';
export type SoundId = 'off' | 'rain' | 'waves' | 'forest';
export type PlayableSoundId = Exclude<SoundId, 'off'>;
export type EvidenceKind = 'photo' | 'audio' | 'document' | 'note';

export interface EvidencePreview {
  id: string;
  title: string;
  timestamp: string;
  kind: EvidenceKind;
}

export interface MoodConfig {
  icon: LucideIcon;
  label: string;
  /** Pesan maskot untuk suasana hati ini. */
  message: string;
  /** Kelas Tailwind untuk chip saat terpilih. */
  chipActive: string;
  /** Tiga warna orb latar (berubah halus mengikuti suasana hati). */
  glow: readonly [string, string, string];
}

export interface SoundOption {
  id: SoundId;
  label: string;
  icon: LucideIcon;
}

export interface BreathingPhase {
  id: 'inhale' | 'exhale';
  label: string;
  hint: string;
  seconds: number;
  /** Skala lingkaran di akhir fase. */
  scale: number;
}

export interface ActionConfig {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  screen: ScreenRoute;
  /** Kelas Tailwind warna gelembung ikon. */
  bubble: string;
}

export interface IconStyle {
  icon: LucideIcon;
  /** Kelas Tailwind warna ikon. */
  tone: string;
}

export interface GardenBloom {
  id: number;
  /** Indeks gaya bunga di `GARDEN_BLOOMS`. */
  variant: number;
}
