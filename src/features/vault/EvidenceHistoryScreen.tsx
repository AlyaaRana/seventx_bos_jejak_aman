// Riwayat dan pemeriksaan integritas bukti melalui service Vault (mock sampai backend tersedia).
import React, { useEffect, useState } from 'react';
import { CheckCircle2, LogOut, RefreshCw, ShieldCheck, XCircle, type LucideIcon } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ScreenLayout } from '../../components/shared/ScreenLayout';
import { FriendlyNote } from '../../components/shared/FriendlyNote';
import { StatusChip, type StatusTone } from '../../components/shared/StatusChip';
import { vaultApi } from './vaultApi';
import type { EvidenceRecord } from '../../types/evidence';

interface IntegrityLabel {
  tone: StatusTone;
  label: string;
  icon?: LucideIcon;
}

/** `undefined` artinya belum pernah dicek, berbeda dengan `false` (sudah dicek, tidak utuh). */
const describeIntegrity = (isValid: boolean | undefined): IntegrityLabel => {
  if (isValid === undefined) return { tone: 'gray', label: 'Belum dicek' };
  return isValid
    ? { tone: 'green', label: 'Utuh · demo', icon: CheckCircle2 }
    : { tone: 'rose', label: 'Tidak utuh', icon: XCircle };
};

export const EvidenceHistoryScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [evidence, setEvidence] = useState<EvidenceRecord[]>([]);
  const [integrityById, setIntegrityById] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    void vaultApi
      .listEvidence()
      .then((items) => {
        if (isActive) setEvidence(items);
      })
      .catch((error: unknown) => {
        if (isActive) setErrorMessage(error instanceof Error ? error.message : 'Riwayat bukti gagal dimuat.');
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });
    return () => {
      isActive = false;
    };
  }, []);

  const checkIntegrity = async () => {
    setIsChecking(true);
    setErrorMessage(null);
    try {
      const results = await Promise.all(evidence.map((item) => vaultApi.checkEvidenceIntegrity(item.id)));
      setIntegrityById(Object.fromEntries(results.map((result) => [result.evidenceId, result.isValid])));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Pemeriksaan integritas gagal.');
    } finally {
      setIsChecking(false);
    }
  };

  const allEvidenceChecked = evidence.length > 0 && evidence.every((item) => integrityById[item.id] === true);

  const quickExit = (
    <button
      type="button"
      aria-label="Keluar cepat"
      onClick={() => setScreen('s03-calculator')}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-b-[3px] border-orange-200/70 border-b-orange-300/80 bg-[#FFEDE5] text-[#D9552F] transition-all duration-100 active:translate-y-[2px] active:border-b"
    >
      <LogOut size={16} strokeWidth={2.4} />
    </button>
  );

  return (
    <ScreenLayout
      title="Periksa keutuhan"
      onBack={() => setScreen('s04-vault-home')}
      headerRight={quickExit}
    >
      <FriendlyNote mascot="🥑" title="Aku cek satu per satu ya. Pelan-pelan saja." />

      {errorMessage && (
        <p role="alert" className="text-xs font-semibold text-rose-700">
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <p className="py-2 text-center text-xs text-[#7B7389]">Memuat riwayat demo...</p>
      ) : evidence.length > 0 ? (
        <ul className="space-y-2.5">
          {evidence.map((item, index) => {
            const { tone, label, icon } = describeIntegrity(integrityById[item.id]);
            return (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-[20px] border border-[#EAE2D3] bg-white p-3"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFE9DD] text-sm font-extrabold text-[#D9552F] ${
                    index % 2 === 0 ? '-rotate-3' : 'rotate-2'
                  }`}
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-extrabold">{item.title}</p>
                  <p className="mt-0.5 text-[10px] text-[#7B7389]">{item.timestamp}</p>
                </div>
                <StatusChip tone={tone} icon={icon}>
                  {label}
                </StatusChip>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-[20px] border border-dashed border-[#D9CFBC] bg-white/60 p-4 text-center text-xs text-[#7B7389]">
          Belum ada bukti di brankas.
        </p>
      )}

      <div
        className={`rounded-[22px] p-4 text-center ${
          allEvidenceChecked ? 'bg-emerald-600 text-white' : 'border border-emerald-200 bg-emerald-50 text-emerald-900'
        }`}
      >
        <div className="flex items-center justify-center gap-1.5 text-sm font-extrabold">
          <ShieldCheck size={18} />
          <span>
            {allEvidenceChecked
              ? `Simulasi: ${evidence.length} dari ${evidence.length} lolos`
              : 'Status integritas belum diperiksa'}
          </span>
        </div>
        <p className="mt-1 text-[11px] opacity-90">Hasil ini data demo; pemeriksaan hash server belum terhubung.</p>
      </div>

      <button
        type="button"
        disabled={isLoading || isChecking || evidence.length === 0}
        onClick={() => void checkIntegrity()}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-b-[3px] border-[#EAE2D3] border-b-[#D9CFBC] bg-white text-xs font-bold text-[#1E1B4B] transition-all duration-100 active:translate-y-[2px] active:border-b disabled:opacity-50"
      >
        <RefreshCw size={14} className={isChecking ? 'animate-spin' : ''} />
        {isChecking ? 'Memeriksa...' : 'Periksa ulang'}
      </button>
    </ScreenLayout>
  );
};