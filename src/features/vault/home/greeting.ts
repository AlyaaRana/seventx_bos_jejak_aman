import { Moon, Sun, Sunset, type LucideIcon } from 'lucide-react';

export interface Greeting {
  text: string;
  icon: LucideIcon;
  /** Kelas warna ikon. */
  tone: string;
}

/** Sapaan sesuai jam, supaya Home terasa menyapa orangnya, bukan sekadar menampilkan menu. */
export const getGreeting = (date: Date = new Date()): Greeting => {
  const hour = date.getHours();

  if (hour >= 4 && hour < 11) return { text: 'Pagi', icon: Sun, tone: 'text-amber-500' };
  if (hour >= 11 && hour < 15) return { text: 'Siang', icon: Sun, tone: 'text-orange-500' };
  if (hour >= 15 && hour < 18) return { text: 'Sore', icon: Sunset, tone: 'text-[#FF7A59]' };
  return { text: 'Malam', icon: Moon, tone: 'text-indigo-500' };
};