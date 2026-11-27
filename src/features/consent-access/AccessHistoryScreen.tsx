import React, { useEffect, useState } from 'react';
import {
  Building2,
  Clock,
  Heart,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  type LucideIcon,
} from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ScreenLayout } from '../../components/shared/ScreenLayout';
import { FriendlyNote } from '../../components/shared/FriendlyNote';
import { StatusChip } from '../../components/shared/StatusChip';
import mascotImg from '../../assets/smile.png';

const DAYS_TOTAL = 7;
const DAYS_LEFT = 5;
const DAYS_PROGRESS = Math.round((DAYS_LEFT / DAYS_TOTAL) * 100);
const TOAST_DURATION_MS = 3000;

const DOT_TONES = {
  green: 'bg-emerald-100 text-emerald-700',
  peach: 'bg-[#FFE9DD] text-[#D9552F]',
  indigo: 'bg-indigo-100 text-indigo-700',
} as const;

interface ActivityEntry {
  id: string;
  icon: LucideIcon;
  tone: keyof typeof DOT_TONES;
  lead?: string;
  highlight: string;
  tail?: string;
  time: string;
}

const ACTIVITY_LOG: readonly ActivityEntry[] = [
  {
    id: 'opened-photo',
    icon: ShieldCheck,
    tone: 'green',
    lead: 'Pendamping membuka',
    highlight: 'Foto Bukti #01',
    time: 'Hari ini · 10:42 WIB',
  },
  {
    id: 'granted',
    icon: UserCheck,
    tone: 'peach',
    lead: 'Kamu memberi akses selama',
    highlight: '7 hari',
    time: 'Kemarin · 15:05 WIB',
  },
  {
    id: 'expired',
    icon: Clock,
    tone: 'indigo',
    lead: 'Akses',
    highlight: 'Klinik Pulih',
    tail: 'berakhir otomatis',
    time: '12 hari lalu',
  },
];

export const AccessHistoryScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [showRevokeToast, setShowRevokeToast] = useState(false);

  useEffect(() => {
    if (!showRevokeToast) return;
    const timer = window.setTimeout(() => setShowRevokeToast(false), TOAST_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [showRevokeToast]);

  const revokeToast = showRevokeToast && (
    <div
      role="status"
      className="absolute left-5 right-5 top-4 z-50 flex items-center justify-between gap-3 rounded-2xl bg-[#2A2438] p-3.5 text-xs font-bold text-white shadow-lg"
    >
      <span className="flex items-center gap-2">
        <ShieldAlert size={18} className="shrink-0 text-[#FF9B7A]" />
        Permintaan cabut akses dikirim!
      </span>
      <button
        type="button"
        onClick={() => setScreen('s14-consent-granted')}
        className="shrink-0 rounded-xl bg-[#FF7A59] px-3 py-1.5 text-[10px] font-bold"
      >
        Konfirmasi
      </button>
    </div>
  );

  return (
    <ScreenLayout
      title="Riwayat akses"
      subtitle="Pendamping"
      onBack={() => setScreen('s04-vault-home')}
      overlay={revokeToast}
    >
      <FriendlyNote
        mascot={<img src={mascotImg} alt="" className="h-full w-full object-contain" />}
        title="Kendali penuh ada di tanganmu"
      >
        Semua lembaga atau pendamping yang membuka datamu tercatat transparan di sini.
      </FriendlyNote>

      <section className="space-y-3.5 rounded-[22px] border border-[#EAE2D3] bg-white p-3.5 shadow-[0_6px_18px_-10px_rgba(42,36,56,0.25)]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 -rotate-3 items-center justify-center rounded-2xl bg-[#1E1B4B] text-[#FF9B7A]">
            <Building2 size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-extrabold">LBH APIK Jakarta</h2>
            <p className="mt-0.5 text-[11px] text-[#7B7389]">Foto & visum · Akses lihat saja</p>
          </div>
          <StatusChip tone="green">Aktif</StatusChip>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold">
            <span className="text-[#6B6480]">Masa berlaku akses</span>
            <span className="text-emerald-700">
              Sisa {DAYS_LEFT} dari {DAYS_TOTAL} hari
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={DAYS_TOTAL}
            aria-valuenow={DAYS_LEFT}
            className="h-2.5 w-full overflow-hidden rounded-full bg-[#EFE9DD]"
          >
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${DAYS_PROGRESS}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setScreen('s12-share-consent')}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-b-[3px] border-[#EAE2D3] border-b-[#D9CFBC] bg-white text-xs font-bold text-[#1E1B4B] transition-all duration-100 active:translate-y-[2px] active:border-b"
          >
            <RefreshCw size={14} />
            Perpanjang
          </button>
          <button
            type="button"
            onClick={() => setShowRevokeToast(true)}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-b-[3px] border-rose-200 border-b-rose-300 bg-rose-50 text-xs font-bold text-rose-700 transition-all duration-100 active:translate-y-[2px] active:border-b"
          >
            <UserX size={14} />
            Cabut akses
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-2.5 px-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8A8197]">
          Catatan aktivitas
        </h2>

        <ul className="relative space-y-2.5 pl-8">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[11px] top-4 border-l-2 border-dashed border-[#DCD2BD]"
          />
          {ACTIVITY_LOG.map(({ id, icon: Icon, tone, lead, highlight, tail, time }) => (
            <li key={id} className="relative">
              <span
                className={`absolute -left-8 top-3 flex h-6 w-6 items-center justify-center rounded-full ${DOT_TONES[tone]}`}
              >
                <Icon size={13} strokeWidth={2.4} />
              </span>
              <div className="rounded-2xl border border-[#EAE2D3] bg-white p-3">
                <p className="text-xs font-bold leading-snug">
                  {lead && `${lead} `}
                  <strong className="text-[#D9552F]">{highlight}</strong>
                  {tail && ` ${tail}`}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-[#7B7389]">
                  <Clock size={11} />
                  {time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="flex items-center justify-center gap-1.5 px-2 text-center text-[11px] leading-relaxed text-[#7B7389]">
        <Heart size={12} className="shrink-0 text-[#FF7A59]" />
        Kamu berhak mencabut atau menghentikan izin akses kapan pun kamu mau.
      </p>
    </ScreenLayout>
  );
};