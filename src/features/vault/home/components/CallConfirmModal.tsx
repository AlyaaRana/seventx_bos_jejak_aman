import React from 'react';
import { Phone } from 'lucide-react';
import { SUPPORT_CONTACT } from '../constants';
import { ModalShell } from './ModalShell';

interface CallConfirmModalProps {
  onClose: () => void;
}

/** Konfirmasi sebelum menelepon, karena panggilan tercatat di riwayat telepon HP. */
export const CallConfirmModal: React.FC<CallConfirmModalProps> = ({ onClose }) => (
  <ModalShell label="Konfirmasi telepon" onClose={onClose}>
    <div className="space-y-4">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-600">
        <Phone size={24} strokeWidth={1.8} />
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-semibold tracking-tight text-slate-900">Telepon {SUPPORT_CONTACT.label}?</h3>
        <p className="text-[13px] leading-relaxed text-slate-500">
          Panggilan akan tercatat di riwayat telepon HP-mu. Pastikan kamu sedang di tempat yang aman, dan hapus
          riwayatnya setelah selesai kalau perlu.
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-2xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-200 active:scale-95"
        >
          Nanti saja
        </button>
        <a
          href={SUPPORT_CONTACT.href}
          onClick={onClose}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-violet-600 py-2.5 text-xs font-semibold text-white transition-all hover:bg-violet-700 active:scale-95"
        >
          <Phone size={13} />
          <span>Telepon</span>
        </a>
      </div>
    </div>
  </ModalShell>
);
