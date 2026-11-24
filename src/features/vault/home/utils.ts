import { Moon, Sun, Sunrise, Sunset, type LucideIcon } from 'lucide-react';
import type { EvidenceKind, EvidencePreview } from './types';

export interface Greeting {
  text: string;
  icon: LucideIcon;
  tone: string;
}

export function getGreeting(hour: number): Greeting {
  if (hour >= 4 && hour < 11) return { text: 'Selamat pagi', icon: Sunrise, tone: 'text-amber-500' };
  if (hour >= 11 && hour < 15) return { text: 'Selamat siang', icon: Sun, tone: 'text-amber-500' };
  if (hour >= 15 && hour < 18) return { text: 'Selamat sore', icon: Sunset, tone: 'text-orange-400' };
  return { text: 'Selamat malam', icon: Moon, tone: 'text-violet-400' };
}

const KIND_PATTERNS: ReadonlyArray<readonly [EvidenceKind, RegExp]> = [
  ['photo', /foto|gambar|\.(png|jpe?g|heic|webp)$/i],
  ['audio', /rekaman|suara|\.(mp3|m4a|wav)$/i],
  ['note', /catatan|kronologi|cerita/i],
];

const KINDS: readonly EvidenceKind[] = ['photo', 'audio', 'document', 'note'];

function resolveKind(title: string, declared?: string): EvidenceKind {
  const declaredKind = KINDS.find((kind) => kind === declared);
  if (declaredKind) return declaredKind;
  return KIND_PATTERNS.find(([, pattern]) => pattern.test(title))?.[0] ?? 'document';
}

interface StoredEvidence {
  id: string;
  title: string;
  timestamp: string;
  type?: string;
}

/** Mengubah data Vault dari API menjadi bentuk ringkas untuk pratinjau. */
export function toEvidencePreviews(list: readonly StoredEvidence[]): readonly EvidencePreview[] {
  return list.map(({ id, title, timestamp, type }) => ({
    id,
    title,
    timestamp,
    kind: resolveKind(title, type),
  }));
}
