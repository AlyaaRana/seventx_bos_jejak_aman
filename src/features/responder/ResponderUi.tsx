// Komponen UI bersama untuk seluruh layar alur Pendamping (responder).
import React from 'react';
import { BadgeCheck, Eye, HeartHandshake, Lightbulb, LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import aimImg from '../../assets/smile.png';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { RESPONDER } from './responderData';
import { getDayGreeting, getFirstName } from './responderGreeting';
import { cx } from './responderUtils';
import type { ResponderIdentity } from '../../types/responder';
import '../../styles/cute-animations.css';
import './responder-animations.css';

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

interface ResponderScreenProps {
  children: React.ReactNode;
  /** Aktifkan scroll vertikal untuk layar yang kontennya panjang. */
  scrollable?: boolean;
}

/** Cahaya lembut di belakang konten. Berada di balik semua isi layar (`isolate` + `-z-10`). */
const BackdropGlow: React.FC = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
    <div className="absolute -left-24 top-1/2 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
  </div>
);

export const ResponderScreen: React.FC<ResponderScreenProps> = ({ children, scrollable = false }) => (
  <MobileContainer
    className={cx(
      'relative isolate flex flex-col gap-3 bg-gradient-to-b from-[#FAF8FF] via-white to-[#F6FBF8] px-4 pb-4 pt-3 font-sans text-slate-800',
      scrollable ? 'overflow-y-auto [&>*]:shrink-0' : 'overflow-hidden',
    )}
  >
    <BackdropGlow />
    {children}
  </MobileContainer>
);

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

type CardTone = 'default' | 'neutral' | 'warm' | 'soft';

const CARD_TONES: Record<CardTone, string> = {
  default: 'border-purple-100/80 bg-white',
  neutral: 'border-slate-100 bg-white',
  warm: 'border-orange-100 bg-gradient-to-br from-orange-50/60 to-white',
  soft: 'border-purple-100 bg-purple-50/70',
};

interface CardProps {
  children: React.ReactNode;
  tone?: CardTone;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, tone = 'default', className }) => (
  <section
    className={cx('rounded-3xl border p-4 shadow-[0_6px_24px_rgba(76,29,149,0.05)]', CARD_TONES[tone], className)}
  >
    {children}
  </section>
);

/* -------------------------------------------------------------------------- */
/* Pill                                                                       */
/* -------------------------------------------------------------------------- */

type PillTone = 'success' | 'warning' | 'info' | 'neutral';

const PILL_TONES: Record<PillTone, string> = {
  success: 'bg-[#DCFCE7] text-[#047857]',
  warning: 'bg-orange-100 text-orange-700',
  info: 'bg-purple-100 text-purple-800',
  neutral: 'bg-slate-100 text-slate-600',
};

interface PillProps {
  children: React.ReactNode;
  tone?: PillTone;
  icon?: LucideIcon;
}

export const Pill: React.FC<PillProps> = ({ children, tone = 'info', icon: Icon }) => (
  <span
    className={cx(
      'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold',
      PILL_TONES[tone],
    )}
  >
    {Icon && <Icon size={12} />}
    {children}
  </span>
);

/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

type IconButtonTone = 'neutral' | 'warning';

const ICON_BUTTON_TONES: Record<IconButtonTone, string> = {
  neutral: 'border border-purple-100 bg-white text-slate-700',
  warning: 'bg-[#FFEDD5] text-[#D97706]',
};

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  tone?: IconButtonTone;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, label, onClick, tone = 'neutral' }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={cx(
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-all active:scale-95',
      ICON_BUTTON_TONES[tone],
    )}
  >
    <Icon size={17} />
  </button>
);

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'md' | 'sm';

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-[#FF8A70] to-[#F26B4E] text-white shadow-[0_8px_20px_rgba(242,107,78,0.28)] hover:brightness-105',
  secondary: 'border border-purple-200 bg-white text-purple-900 shadow-sm hover:bg-purple-50/60',
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  md: 'h-12 w-full',
  sm: 'h-10 px-4',
};

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cx(
      'flex items-center justify-center gap-2 rounded-2xl text-[13px] font-bold transition-all active:scale-95',
      'disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none',
      BUTTON_VARIANTS[variant],
      BUTTON_SIZES[size],
    )}
  >
    {Icon && <Icon size={size === 'md' ? 17 : 15} />}
    <span>{children}</span>
  </button>
);

/* -------------------------------------------------------------------------- */
/* Content blocks                                                             */
/* -------------------------------------------------------------------------- */

/** Gelembung ucapan dari maskot. Dipakai untuk petunjuk singkat di setiap langkah. */
export const HelperBubble: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-end gap-2.5">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white bg-gradient-to-br from-emerald-100 to-emerald-200/70 p-1.5 shadow-[0_4px_14px_rgba(16,185,129,0.2)]">
      <img src={aimImg} alt="" className="h-full w-full object-contain" />
    </div>
    <div className="rp-reveal min-w-0 flex-1 rounded-2xl rounded-bl-md border border-purple-100 bg-white/90 px-3.5 py-2.5 shadow-sm">
      <p aria-live="polite" className="text-left text-[13px] font-semibold leading-snug text-slate-700">
        {children}
      </p>
    </div>
  </div>
);

interface TipsCardProps {
  title: string;
  tips: readonly string[];
}

export const TipsCard: React.FC<TipsCardProps> = ({ title, tips }) => (
  <Card tone="neutral" className="space-y-2 py-3">
    <p className="flex items-center gap-1.5 text-[13px] font-extrabold text-slate-800">
      <Lightbulb size={14} className="text-amber-500" />
      {title}
    </p>
    <ul className="space-y-1.5">
      {tips.map((tip) => (
        <li key={tip} className="flex items-start gap-2 text-[12px] leading-snug text-slate-500">
          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300" />
          {tip}
        </li>
      ))}
    </ul>
  </Card>
);

interface WatermarkedPreviewProps {
  /** Teks watermark yang diulang secara diagonal. */
  watermark: string;
  /** Tinggi atau ukuran kotak, mis. `h-44`. */
  className?: string;
  children: React.ReactNode;
}

export const WatermarkedPreview: React.FC<WatermarkedPreviewProps> = ({ watermark, className, children }) => (
  <div
    className={cx(
      'relative flex select-none items-center justify-center overflow-hidden rounded-2xl border border-purple-100',
      'bg-gradient-to-br from-[#F3E8FF] via-[#FAF8FF] to-[#DCFCE7]/60',
      className,
    )}
  >
    <div
      aria-hidden
      className="pointer-events-none grid -rotate-12 grid-cols-2 gap-4 text-center font-mono text-[11px] font-bold text-slate-400/75"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index}>{watermark}</span>
      ))}
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-4 text-center">{children}</div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Identity                                                                   */
/* -------------------------------------------------------------------------- */

/** Kartu sambutan di dashboard: menyapa pendamping dengan nama, lembaga, dan status verifikasinya. */
export const ResponderIdentityCard: React.FC<{
  onExit: () => void;
  identity?: Pick<ResponderIdentity, 'initials' | 'name' | 'institution' | 'caseId'>;
}> = ({ onExit, identity = RESPONDER }) => {
  const { text: greeting, icon: GreetingIcon, tone } = getDayGreeting(new Date().getHours());

  return (
    <Card className="rp-reveal space-y-3.5 bg-gradient-to-br from-[#F4F0FF] via-white to-[#ECFDF5]">
      <div className="flex items-center gap-3.5">
        <div className="relative shrink-0">
          <span aria-hidden className="ja-halo absolute inset-0 rounded-3xl bg-violet-300/40" />
          <div className="ja-float relative flex h-14 w-14 items-center justify-center rounded-3xl border border-white bg-gradient-to-br from-violet-200 to-violet-300 text-base font-extrabold text-violet-800 shadow-[0_8px_20px_rgba(124,58,237,0.22)]">
            {identity.initials}
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-100 p-0.5">
            <img src={aimImg} alt="" className="h-full w-full object-contain" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-[12px] font-semibold text-slate-500">
            <GreetingIcon size={13} className={tone} />
            <span>{greeting}</span>
          </p>
          <h1 className="truncate text-[17px] font-extrabold leading-tight tracking-tight text-slate-900">
            Selamat datang, Kak {getFirstName(identity.name)}
          </h1>
          <p className="truncate text-[12px] text-slate-500">
            {identity.institution} · Kasus {identity.caseId}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Pill tone="info" icon={BadgeCheck}>
          Pendamping Resmi
        </Pill>
        <Pill tone="success" icon={BadgeCheck}>
          e-KTP Sah
        </Pill>
        <Pill tone="neutral" icon={Eye}>
          Mode hanya baca
        </Pill>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-purple-100/70 pt-3">
        <p className="flex min-w-0 items-center gap-1.5 text-[12px] text-slate-500">
          <HeartHandshake size={14} className="shrink-0 text-rose-400" />
          <span className="truncate">Terima kasih sudah mendampingi.</span>
        </p>
        <button
          type="button"
          onClick={onExit}
          className="flex shrink-0 items-center gap-1 rounded-full bg-orange-100 px-3.5 py-1.5 text-[12px] font-bold text-orange-700 transition-all active:scale-95"
        >
          <LogOut size={12} />
          Keluar
        </button>
      </div>
    </Card>
  );
};