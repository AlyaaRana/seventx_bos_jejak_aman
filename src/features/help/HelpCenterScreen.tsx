import React, { useEffect, useState } from 'react';
import { ChevronRight, PhoneCall, ShieldAlert, ShieldCheck, Siren, type LucideIcon } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ScreenLayout } from '../../components/shared/ScreenLayout';
import { FriendlyNote } from '../../components/shared/FriendlyNote';
import type { ScreenRoute } from '../../types/navigation';
import mascotImg from '../../assets/smile.png';

const PHASE_DURATION_MS = 3500;

const PHASES = [
  { label: 'Tarik', scale: 1.25 },
  { label: 'Tahan', scale: 1.25 },
  { label: 'Hembuskan', scale: 1 },
] as const;

/** Siklus napas: lingkaran membesar saat tarik, bertahan saat tahan, mengecil saat hembuskan. */
const useBreathingGuide = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  // Mulai dari skala 1 supaya tarikan pertama ikut beranimasi, bukan langsung membesar.
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setHasStarted(true);
    const timer = window.setInterval(
      () => setPhaseIndex((index) => (index + 1) % PHASES.length),
      PHASE_DURATION_MS,
    );
    return () => window.clearInterval(timer);
  }, []);

  const { label, scale } = PHASES[phaseIndex];
  return { label, scale: hasStarted ? scale : 1 };
};

const BreathingCard: React.FC = () => {
  const { label, scale } = useBreathingGuide();

  return (
    <section
      aria-label="Latihan napas"
      className="rounded-[28px] bg-[#26215F] px-5 pb-5 pt-4 text-center text-white"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200/70">Latihan napas</p>

      <div className="flex h-36 items-center justify-center">
        <div
          style={{ transform: `scale(${scale})`, transitionDuration: `${PHASE_DURATION_MS}ms` }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF8EC] transition-transform ease-in-out motion-reduce:transition-none"
        >
          <span aria-hidden="true" className="absolute -inset-3.5 rounded-full border border-white/20" />
          <img src={mascotImg} alt="" className="h-12 w-12 object-contain" />
        </div>
      </div>

      <p aria-live="polite" className="text-base font-extrabold tracking-wide">
        {label}...
      </p>
      <p className="mx-auto mt-1.5 max-w-[230px] text-[11px] leading-relaxed text-indigo-200/80">
        Ikuti ritme lingkaran. Ambil waktu sejenak untuk menenangkan pikiranmu.
      </p>
    </section>
  );
};

const TILE_TONES = {
  peach: 'bg-[#FFE9DD] text-[#D9552F]',
  mint: 'bg-[#D8F3E4] text-[#14532D]',
  indigo: 'bg-indigo-100 text-indigo-700',
} as const;

interface ServiceItem {
  id: string;
  icon: LucideIcon;
  tone: keyof typeof TILE_TONES;
  title: string;
  description: string;
  badge?: string;
  /** Salah satu dari `href` (telepon) atau `route` (layar dalam aplikasi). */
  href?: string;
  route?: ScreenRoute;
}

const SERVICES: readonly ServiceItem[] = [
  {
    id: 'sapa-129',
    icon: PhoneCall,
    tone: 'peach',
    title: 'Hubungi SAPA 129',
    description: 'Layanan resmi KemenPPPA (24 jam)',
    badge: 'Bebas pulsa',
    href: 'tel:129',
  },
  {
    id: 'find-responder',
    icon: ShieldCheck,
    tone: 'mint',
    title: 'Cari pendamping resmi',
    description: 'LBH & psikolog terverifikasi e-KTP',
    route: 's10-find-responder',
  },
  {
    id: 'police-110',
    icon: Siren,
    tone: 'indigo',
    title: 'Darurat Polisi 110',
    description: 'Gunakan jika berada dalam bahaya fisik',
    href: 'tel:110',
  },
];

const ROW_CLASS =
  'flex w-full items-center gap-3 rounded-[20px] border border-[#EAE2D3] bg-white p-3 text-left transition-transform active:scale-[0.98]';

interface ServiceRowProps {
  item: ServiceItem;
  onNavigate: (route: ScreenRoute) => void;
}

const ServiceRow: React.FC<ServiceRowProps> = ({ item, onNavigate }) => {
  const { icon: Icon, tone, title, description, badge, href, route } = item;

  const content = (
    <>
      <span className={`flex h-11 w-11 shrink-0 -rotate-3 items-center justify-center rounded-2xl ${TILE_TONES[tone]}`}>
        <Icon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-[13px] font-extrabold">{title}</span>
          {badge && (
            <span className="shrink-0 rounded-md bg-[#FFE9DD] px-1.5 py-0.5 text-[9px] font-bold text-[#D9552F]">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-[#7B7389]">{description}</span>
      </span>
      <ChevronRight size={16} className="shrink-0 text-[#B8AEC4]" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={ROW_CLASS}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => route && onNavigate(route)} className={ROW_CLASS}>
      {content}
    </button>
  );
};

export const HelpCenterScreen: React.FC = () => {
  const { setScreen } = useVaultStore();

  return (
    <ScreenLayout title="Ruang bantuan" subtitle="Pendampingan" onBack={() => setScreen('s04-vault-home')}>
      <BreathingCard />

      <FriendlyNote mascot="🌱" title="Semua emosimu valid">
        Kamu tidak bersalah atas apa yang terjadi. Kamu berhak merasa aman dan mendapatkan pertolongan yang tepat.
      </FriendlyNote>

      <section>
        <h2 className="mb-2.5 px-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8A8197]">
          Layanan pengaduan & pendampingan
        </h2>
        <ul className="space-y-2.5">
          {SERVICES.map((item) => (
            <li key={item.id}>
              <ServiceRow item={item} onNavigate={setScreen} />
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center gap-2.5 rounded-[20px] border border-rose-100 bg-rose-50 p-3.5 text-[11px] leading-relaxed text-rose-700">
        <ShieldAlert size={16} className="shrink-0 text-rose-500" />
        <span>
          Jika ponselmu berpotensi diawasi pelaku, gunakan mode penyamaran atau perangkat lain yang lebih aman.
        </span>
      </div>
    </ScreenLayout>
  );
};