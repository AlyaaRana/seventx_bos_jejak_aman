// Komponen UI bersama untuk seluruh layar alur Pendamping (responder).
import React from 'react';
import { BadgeCheck, ChevronLeft, Eye, Lightbulb, LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import mascotImg from '../../assets/smile.png';
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
  /** Header yang menempel di atas dan tidak ikut scroll. */
  header?: React.ReactNode;
  /** Area aksi yang menempel di bawah layar, misalnya tombol utama. */
  footer?: React.ReactNode;
  /** Aktifkan scroll vertikal untuk layar yang kontennya panjang. */
  scrollable?: boolean;
}

/**
 * Kerangka layar: header (opsional), isi, footer (opsional).
 * Container setinggi layar, jadi yang bergulir hanya bagian isi.
 */
export const ResponderScreen: React.FC<ResponderScreenProps> = ({
  children,
  header,
  footer,
  scrollable = false,
}) => (
  <MobileContainer className="relative flex h-[100dvh] flex-col overflow-hidden bg-[#F5F0E6] font-sans text-[#2A2438]">
    {header && <div className="shrink-0 px-5 pb-3 pt-4">{header}</div>}

    <div
      className={cx(
        'flex min-h-0 flex-1 flex-col gap-3 px-5',
        header ? 'pt-1' : 'pt-4',
        footer ? 'pb-3' : 'pb-5',
        scrollable ? 'overflow-y-auto overscroll-contain [&>*]:shrink-0' : 'overflow-hidden',
      )}
    >
      {children}
    </div>

    {footer && <div className="shrink-0 space-y-2 border-t border-[#EAE2D3] px-5 pb-5 pt-3">{footer}</div>}
  </MobileContainer>
);

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

type CardTone = 'default' | 'neutral' | 'warm' | 'soft';

const CARD_TONES: Record<CardTone, string> = {
  default: 'border-[#EAE2D3] bg-white',
  neutral: 'border-[#EAE2D3] bg-white/70',
  warm: 'border-[#F5DDC8] bg-[#FFF1E6]',
  soft: 'border-[#EAE2D3] bg-[#FBF7EF]',
};

interface CardProps {
  children: React.ReactNode;
  tone?: CardTone;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, tone = 'default', className }) => (
  <section
    className={cx(
      'rounded-[22px] border p-4 shadow-[0_6px_18px_-10px_rgba(42,36,56,0.25)]',
      CARD_TONES[tone],
      className,
    )}
  >
    {children}
  </section>
);

/* -------------------------------------------------------------------------- */
/* Pill                                                                       */
/* -------------------------------------------------------------------------- */

export type PillTone = 'success' | 'warning' | 'info' | 'neutral';

const PILL_TONES: Record<PillTone, string> = {
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  info: 'bg-indigo-100 text-indigo-800',
  neutral: 'bg-[#EFE9DD] text-[#6B6480]',
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
    {Icon && <Icon size={12} strokeWidth={2.4} />}
    {children}
  </span>
);

/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

/** Tombol ala tombol fisik: sisi bawah tebal, turun sedikit saat ditekan. */
const PRESSABLE = 'border border-b-[3px] transition-all duration-100 active:translate-y-[2px] active:border-b';

type IconButtonTone = 'neutral' | 'warning';

const ICON_BUTTON_TONES: Record<IconButtonTone, string> = {
  neutral: 'border-[#EAE2D3] border-b-[#D9CFBC] bg-white text-slate-700',
  warning: 'border-orange-200/70 border-b-orange-300/80 bg-[#FFEDE5] text-[#D9552F]',
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
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
      PRESSABLE,
      ICON_BUTTON_TONES[tone],
    )}
  >
    <Icon size={18} strokeWidth={2.4} />
  </button>
);

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'md' | 'sm';

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'border-[#FF7A59] border-b-[#E0603F] bg-[#FF7A59] text-white',
  secondary: 'border-[#EAE2D3] border-b-[#D9CFBC] bg-white text-[#1E1B4B]',
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  md: 'h-12 w-full rounded-2xl',
  sm: 'h-10 rounded-xl px-4',
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
      'flex items-center justify-center gap-2 text-[13px] font-bold',
      PRESSABLE,
      'disabled:pointer-events-none disabled:opacity-50',
      BUTTON_VARIANTS[variant],
      BUTTON_SIZES[size],
    )}
  >
    {Icon && <Icon size={size === 'md' ? 17 : 15} />}
    <span>{children}</span>
  </button>
);

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

interface ResponderHeaderProps {
  title: string;
  /** Teks kecil di atas judul. */
  eyebrow?: string;
  onBack: () => void;
  /** Slot di kanan header. */
  right?: React.ReactNode;
}

export const ResponderHeader: React.FC<ResponderHeaderProps> = ({ title, eyebrow, onBack, right }) => (
  <header className="flex items-center gap-3">
    <IconButton icon={ChevronLeft} label="Kembali" onClick={onBack} />

    <div className="min-w-0 flex-1 leading-tight">
      {eyebrow && <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8197]">{eyebrow}</p>}
      <h1 className="truncate text-[18px] font-extrabold tracking-tight">{title}</h1>
    </div>

    {right}
  </header>
);

/* -------------------------------------------------------------------------- */
/* Content blocks                                                             */
/* -------------------------------------------------------------------------- */

/** Gelembung ucapan dari maskot. Dipakai untuk petunjuk singkat di setiap langkah. */
export const HelperBubble: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-end gap-2.5">
    <div className="flex h-10 w-10 shrink-0 -rotate-3 items-center justify-center rounded-2xl bg-white p-1.5">
      <img src={mascotImg} alt="" className="h-full w-full object-contain" />
    </div>
    <div className="rp-reveal min-w-0 flex-1 rounded-2xl rounded-bl-md border border-[#EAE2D3] bg-white px-3.5 py-2.5">
      <p aria-live="polite" className="text-left text-[13px] font-semibold leading-snug text-[#4A4458]">
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
    <p className="flex items-center gap-1.5 text-[13px] font-extrabold">
      <Lightbulb size={14} className="text-amber-500" />
      {title}
    </p>
    <ul className="space-y-1.5">
      {tips.map((tip) => (
        <li key={tip} className="flex items-start gap-2 text-[12px] leading-snug text-[#7B7389]">
          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF9B7A]" />
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
      'relative flex select-none items-center justify-center overflow-hidden rounded-2xl border border-[#EAE2D3] bg-[#FBF7EF]',
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

interface ResponderIdentityCardProps {
  onExit: () => void;
  identity?: Pick<ResponderIdentity, 'initials' | 'name' | 'institution' | 'caseId'>;
}

/** Kartu sapaan di dashboard: siapa yang masuk, dari lembaga mana, dan untuk kasus apa. */
export const ResponderIdentityCard: React.FC<ResponderIdentityCardProps> = ({ onExit, identity = RESPONDER }) => {
  const { text: greeting, icon: GreetingIcon, tone } = getDayGreeting(new Date().getHours());

  return (
    <Card className="rp-reveal space-y-3">
      <div className="flex items-center gap-3.5">
        <div className="relative shrink-0 -rotate-3">
          <div className="ja-float flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E1B4B] text-base font-extrabold text-[#FF9B7A]">
            {identity.initials}
          </div>
          <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#D8F3E4] p-0.5">
            <img src={mascotImg} alt="" className="h-full w-full object-contain" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-[12px] font-semibold text-[#7B7389]">
            <GreetingIcon size={13} className={tone} />
            {greeting}
          </p>
          <h1 className="truncate text-lg font-extrabold leading-tight tracking-tight">
            Halo, Kak {getFirstName(identity.name)}
          </h1>
          <p className="truncate text-[12px] text-[#7B7389]">
            {identity.institution} · Kasus {identity.caseId}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Pill tone="success" icon={BadgeCheck}>
          Terverifikasi e-KTP
        </Pill>
        <Pill tone="neutral" icon={Eye}>
          Hanya baca
        </Pill>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#EAE2D3] pt-3">
        <p className="min-w-0 truncate text-[12px] text-[#7B7389]">Terima kasih sudah mendampingi.</p>
        <button
          type="button"
          onClick={onExit}
          className={cx(
            'flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-bold',
            PRESSABLE,
            ICON_BUTTON_TONES.warning,
          )}
        >
          <LogOut size={12} />
          Keluar
        </button>
      </div>
    </Card>
  );
};