import React from 'react';
import { HeartHandshake, Phone, Wind, type LucideIcon } from 'lucide-react';
import { SUPPORT_CONTACT } from '../constants';
import type { Mood } from '../types';

interface MoodSupportProps {
  mood: Mood | null;
  onOpenBreathing: () => void;
  onOpenQuote: () => void;
  onCall: () => void;
}

interface SupportCardProps {
  icon: LucideIcon;
  title: string;
  /** Kelas Tailwind untuk kartu dan gelembung ikon. */
  card: string;
  bubble: string;
  children: React.ReactNode;
}

const SupportCard: React.FC<SupportCardProps> = ({ icon: Icon, title, card, bubble, children }) => (
  <div className={`ja-pop flex items-center gap-3 rounded-[24px] border p-3.5 ${card}`}>
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${bubble}`}>
      <Icon size={19} />
    </div>
    <div className="min-w-0 flex-1 space-y-1.5">
      <p className="text-[13px] font-semibold text-slate-800">{title}</p>
      {children}
    </div>
  </div>
);

/** Kartu dukungan yang muncul sesuai suasana hati. Saat tenang atau belum memilih, tidak muncul apa-apa. */
export const MoodSupport: React.FC<MoodSupportProps> = ({ mood, onOpenBreathing, onOpenQuote, onCall }) => {
  if (mood === 'cemas') {
    return (
      <SupportCard
        key={mood}
        icon={Wind}
        title="Yuk tarik napas bareng"
        card="border-sky-100 bg-sky-50/80"
        bubble="bg-white text-sky-600"
      >
        <button
          type="button"
          onClick={onOpenBreathing}
          className="rounded-full bg-sky-600 px-3.5 py-1.5 text-[12px] font-semibold text-white transition-all hover:bg-sky-700 active:scale-95"
        >
          Mulai jeda napas
        </button>
      </SupportCard>
    );
  }

  if (mood === 'butuh_teman') {
    return (
      <SupportCard
        key={mood}
        icon={HeartHandshake}
        title="Kamu tidak sendirian"
        card="border-violet-100 bg-violet-50/80"
        bubble="bg-white text-violet-600"
      >
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={onCall}
            className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-3.5 py-1.5 text-[12px] font-semibold text-white transition-all hover:bg-violet-700 active:scale-95"
          >
            <Phone size={12} />
            <span>Hubungi {SUPPORT_CONTACT.label}</span>
          </button>
          <button
            type="button"
            onClick={onOpenQuote}
            className="rounded-full border border-violet-200 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-violet-700 transition-all hover:bg-violet-100 active:scale-95"
          >
            Baca pesan hangat
          </button>
        </div>
      </SupportCard>
    );
  }

  return null;
};
