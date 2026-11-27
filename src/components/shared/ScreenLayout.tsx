import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { MobileContainer } from '../layout/MobileContainer';
import { BottomNavbar } from './BottomNavbar';

interface ScreenLayoutProps {
  title: string;
  /** Teks kecil di atas judul. */
  subtitle?: string;
  onBack: () => void;
  /** Slot di kanan header, misalnya tombol keluar cepat. */
  headerRight?: React.ReactNode;
  /** Elemen melayang (toast, dsb.) yang menempel pada container, bukan ikut scroll. */
  overlay?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Kerangka layar dalam: header tetap, isi yang scroll, navbar menempel di bawah.
 * Container setinggi layar sehingga hanya <main> yang bergulir.
 */
export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  title,
  subtitle,
  onBack,
  headerRight,
  overlay,
  children,
}) => (
  <MobileContainer className="relative flex h-[100dvh] flex-col overflow-hidden bg-[#F5F0E6] font-sans text-[#2A2438]">
    <header className="relative z-10 flex shrink-0 items-center gap-3 px-5 pb-3 pt-4">
      <button
        type="button"
        onClick={onBack}
        aria-label="Kembali"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-b-[3px] border-[#EAE2D3] border-b-[#D9CFBC] bg-white text-slate-700 transition-all duration-100 active:translate-y-[2px] active:border-b"
      >
        <ChevronLeft size={19} strokeWidth={2.4} />
      </button>

      <div className="min-w-0 flex-1 leading-tight">
        {subtitle && (
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8197]">{subtitle}</p>
        )}
        <h1 className="truncate text-[19px] font-extrabold tracking-tight">{title}</h1>
      </div>

      {headerRight}
    </header>

    <main className="relative z-10 min-h-0 flex-1 space-y-3.5 overflow-y-auto overscroll-contain px-5 pb-10 pt-1">
      {children}
    </main>

    {overlay}

    <BottomNavbar />
  </MobileContainer>
);