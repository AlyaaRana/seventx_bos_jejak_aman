import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalShellProps {
  /** Label aksesibilitas dialog. */
  label: string;
  onClose: () => void;
  children: React.ReactNode;
}

/** Kerangka modal: latar blur, tombol tutup, tutup dengan Esc atau ketuk di luar kartu. */
export const ModalShell: React.FC<ModalShellProps> = ({ label, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
      className="ja-fade-in absolute inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5 backdrop-blur-md"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="ja-pop relative w-full max-w-xs rounded-[32px] border border-white bg-white p-6 text-center shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:text-slate-600"
        >
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
};
