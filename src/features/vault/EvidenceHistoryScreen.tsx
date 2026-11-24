// Riwayat dan pemeriksaan integritas bukti melalui service Vault (mock sampai backend tersedia).
import React, { useEffect, useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { ArrowLeft, CheckCircle2, LogOut, RefreshCw, ShieldCheck } from 'lucide-react';
import { vaultApi } from './vaultApi';
import type { EvidenceRecord } from '../../types/evidence';

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

  return (
    <MobileContainer className="flex flex-col justify-between bg-[#FAF8FF] text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 bg-white p-4">
        <button
          type="button"
          onClick={() => setScreen('s04-vault-home')}
          className="flex items-center gap-1 text-xs font-bold text-slate-600"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
        <button
          type="button"
          aria-label="Keluar cepat"
          onClick={() => setScreen('s03-calculator')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600"
        >
          <LogOut size={16} />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        <h1 className="text-lg font-extrabold text-slate-900">Periksa keutuhan</h1>
        <div className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-white p-3.5 shadow-xs">
          <span className="text-xl">🥑</span>
          <p className="text-xs font-medium text-slate-600">Aku cek satu per satu ya. Pelan-pelan saja.</p>
        </div>

        {errorMessage && <p role="alert" className="text-xs font-semibold text-rose-700">{errorMessage}</p>}
        {isLoading ? (
          <p className="text-center text-xs text-slate-500">Memuat riwayat demo...</p>
        ) : evidence.length > 0 ? (
          <div className="relative space-y-3 pl-6 before:absolute before:bottom-4 before:left-2.5 before:top-4 before:w-0.5 before:border-dashed before:bg-emerald-300">
            {evidence.map((item, index) => {
              const isValid = integrityById[item.id];
              return (
                <div key={item.id} className="relative flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xs">
                  <div className="absolute -left-6 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#DCFCE7] text-emerald-600">
                    <CheckCircle2 size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-slate-900">{index + 1} · {item.title}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">{item.timestamp}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${isValid ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                    {isValid ? 'Utuh · demo' : 'Belum dicek'}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
            Belum ada bukti di brankas.
          </p>
        )}

        <div className={`space-y-1 rounded-2xl p-4 text-center shadow-sm ${allEvidenceChecked ? 'bg-[#10B981] text-white' : 'border border-emerald-100 bg-emerald-50 text-emerald-900'}`}>
          <div className="flex items-center justify-center gap-1.5 text-sm font-extrabold">
            <ShieldCheck size={18} />
            <span>{allEvidenceChecked ? `Simulasi: ${evidence.length} dari ${evidence.length} lolos` : 'Status integritas belum diperiksa'}</span>
          </div>
          <p className="text-[11px] opacity-90">Hasil ini data demo; pemeriksaan hash server belum terhubung.</p>
        </div>

        <button
          type="button"
          disabled={isLoading || isChecking || evidence.length === 0}
          onClick={() => void checkIntegrity()}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw size={14} className={isChecking ? 'animate-spin' : ''} />
          <span>{isChecking ? 'Memeriksa...' : 'Periksa ulang'}</span>
        </button>
      </div>

      <BottomNavbar />
    </MobileContainer>
  );
};
