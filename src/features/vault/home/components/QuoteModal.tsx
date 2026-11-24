import React from 'react';
import { RefreshCw, Sun } from 'lucide-react';
import { ModalShell } from './ModalShell';

interface QuoteModalProps {
  quote: string;
  onNext: () => void;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ quote, onNext, onClose }) => (
  <ModalShell label="Pesan penenang" onClose={onClose}>
    <div className="space-y-4">
      <div className="ja-float mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-100 bg-gradient-to-tr from-amber-50 to-amber-100 shadow-inner">
        <Sun size={30} strokeWidth={1.6} className="text-amber-500" />
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold tracking-tight text-slate-900">Kamu tidak sendirian</h3>
        <p
          key={quote}
          className="ja-pop flex min-h-[84px] items-center justify-center px-1 text-[13px] leading-relaxed text-slate-600"
        >
          “{quote}”
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onNext}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-violet-50 py-2.5 text-xs font-semibold text-violet-700 transition-all hover:bg-violet-100 active:scale-95"
        >
          <RefreshCw size={13} />
          <span>Ganti kata</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-2xl bg-[#FF6B50] py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#E0533C] active:scale-95"
        >
          Terima kasih
        </button>
      </div>
    </div>
  </ModalShell>
);
