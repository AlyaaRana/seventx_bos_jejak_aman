import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useQuickExit } from '../../hooks/useQuickExit';
import { useVaultStore } from '../../store/useVaultStore';

export const QuickExitFAB: React.FC = () => {
  const { role } = useVaultStore();
  const { executeQuickExit } = useQuickExit();

  // Fitur Darurat / Quick Exit hanya aktif untuk peran penyintas (survivor)
  if (role !== 'survivor') {
    return null;
  }

  return (
    <button
      type="button"
      onClick={executeQuickExit}
      aria-label="Keluar Cepat ke Mode Kalkulator"
      title="Keluar Cepat / Darurat"
      className="fixed top-4 right-4 z-50 min-h-[40px] px-3.5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 flex items-center gap-1.5 active:scale-95 transition-all border border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-300 animate-pulse"
    >
      <AlertTriangle size={15} className="shrink-0" />
      <span className="tracking-wide">Darurat</span>
    </button>
  );
};