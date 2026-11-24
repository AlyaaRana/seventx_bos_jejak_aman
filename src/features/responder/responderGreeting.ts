// Helper sapaan untuk alur Pendamping: salam sesuai waktu dan nama panggilan dari nama lengkap.
import { Moon, Sun, Sunrise, Sunset, type LucideIcon } from 'lucide-react';

export interface DayGreeting {
  text: string;
  icon: LucideIcon;
  /** Kelas Tailwind warna ikon. */
  tone: string;
}

export function getDayGreeting(hour: number): DayGreeting {
  if (hour >= 4 && hour < 11) return { text: 'Selamat pagi', icon: Sunrise, tone: 'text-amber-500' };
  if (hour >= 11 && hour < 15) return { text: 'Selamat siang', icon: Sun, tone: 'text-amber-500' };
  if (hour >= 15 && hour < 18) return { text: 'Selamat sore', icon: Sunset, tone: 'text-orange-400' };
  return { text: 'Selamat malam', icon: Moon, tone: 'text-violet-400' };
}

/**
 * Mengambil nama depan dari nama lengkap, melewati gelar di depan (mis. "Dr.") dan gelar di belakang koma.
 * "Sari Kusuma, S.H." -> "Sari"
 */
export function getFirstName(fullName: string): string {
  const tokens = fullName.split(',')[0].trim().split(/\s+/);
  return tokens.find((token) => !token.endsWith('.')) ?? tokens[0] ?? fullName;
}