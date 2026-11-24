import React from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useVaultStore } from '../../../store/useVaultStore';

interface ScreenHeaderProps {
  title: string;
  /** Teks kecil di atas judul. */
  subtitle?: string;
}

/** Header seragam untuk layar turunan Brankas: Kembali, judul, dan Keluar Cepat. */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, subtitle = 'Brankas Pribadi' }) => {
  const { setScreen } = useVaultStore();

  return (
    <header className="relative z-10 flex items-center justify-between pt-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setScreen('s04-vault-home')}
          aria-label="Kembali ke Brankas"
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-100 bg-white/90 text-slate-600 shadow-sm transition-all hover:bg-white active:scale-90"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="text-[11px] font-medium leading-tight text-emerald-700">{subtitle}</p>
          <h1 className="text-[15px] font-semibold leading-tight tracking-tight text-slate-900">{title}</h1>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setScreen('s03-calculator')}
        aria-label="Keluar Cepat"
        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-200/50 bg-orange-100/80 text-orange-600 shadow-xs transition-all active:scale-90"
      >
        <LogOut size={16} className="translate-x-[0.5px]" />
      </button>
    </header>
  );
};
