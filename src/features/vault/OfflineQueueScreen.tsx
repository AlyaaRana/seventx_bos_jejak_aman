import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, RefreshCw, WifiOff, type LucideIcon } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ScreenLayout } from '../../components/shared/ScreenLayout';
import { FriendlyNote } from '../../components/shared/FriendlyNote';
import { StatusChip, type StatusTone } from '../../components/shared/StatusChip';
import { vaultApi } from './vaultApi';
import type { SyncQueueItem } from './vaultApi';

const describeStatus = (item: SyncQueueItem): { tone: StatusTone; icon: LucideIcon; label: string } => {
  if (item.status === 'synced')return { tone: 'green', icon: CheckCircle2, label: 'Tersinkron · demo' };
  if (item.status === 'uploading') return { tone: 'indigo', icon: Clock, label: `Mengunggah ${item.progress}%` };
  return { tone: 'amber', icon: Clock, label: 'Menunggu' };
};

interface SwitchProps {
  checked: boolean;
  label: string;
  onChange: (next: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, label, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
      checked ? 'bg-emerald-600' : 'bg-slate-300'
    }`}
  >
    <span
      className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export const OfflineQueueScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [wifiOnly, setWifiOnly] = useState(true);
  const [queue, setQueue] = useState<SyncQueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    void vaultApi
      .listSyncQueue()
      .then((items) => {
        if (isActive) setQueue(items);
      })
      .catch((error: unknown) => {
        if (isActive) setErrorMessage(error instanceof Error ? error.message : 'Antrean gagal dimuat.');
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });
    return () => {
      isActive = false;
    };
  }, []);

  const retrySync = async () => {
    setIsSyncing(true);
    setErrorMessage(null);
    try {
      const result = await vaultApi.retrySyncQueue(wifiOnly);
      setQueue(result.items);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Sinkronisasi demo gagal.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <ScreenLayout title="Antrean bukti" subtitle="Status sinkron" onBack={() => setScreen('s04-vault-home')}>
      <FriendlyNote mascot="😊" title="Sinyal belum ada. Tidak apa-apa.">
        Mode demo: status antrean berubah lokal dan belum mengirim berkas ke server.
      </FriendlyNote>

      {errorMessage && (
        <p role="alert" className="text-xs font-semibold text-rose-700">
          {errorMessage}
        </p>
      )}

      {isLoading ? (
        <p className="py-2 text-center text-xs text-[#7B7389]">Memuat antrean demo...</p>
      ) : queue.length > 0 ? (
        <ul className="space-y-2.5">
          {queue.map((item) => {
            const { tone, icon, label } = describeStatus(item);
            return (
              <li key={item.evidenceId} className="rounded-[20px] border border-[#EAE2D3] bg-white p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-extrabold">{item.title}</p>
                    <p className="mt-0.5 text-[10px] text-[#7B7389]">ID bukti: {item.evidenceId}</p>
                  </div>
                  <StatusChip tone={tone} icon={icon}>
                    {label}
                  </StatusChip>
                </div>

                {item.status === 'uploading' && (
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#EFE9DD]">
                    <div className="h-full rounded-full bg-[#FF7A59]" style={{ width: `${item.progress}%` }} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-[20px] border border-dashed border-[#D9CFBC] bg-white/60 p-4 text-center text-xs text-[#7B7389]">
          Antrean kosong.
        </p>
      )}

      <p className="px-1 text-[11px] leading-relaxed text-[#7B7389]">
        Waktu pengambilan dicatat dari ponselmu. Cap waktu server menyusul saat tersambung, dan keduanya tampil di
        detail bukti.
      </p>

      <div className="flex items-center justify-between gap-3 rounded-[20px] border border-[#EAE2D3] bg-white p-3.5">
        <div className="flex items-center gap-2.5">
          <WifiOff size={18} className="shrink-0 text-[#6B6480]" />
          <span className="text-xs font-bold">Hemat data: kirim lewat Wi-Fi saja</span>
        </div>
        <Switch checked={wifiOnly} label="Kirim lewat Wi-Fi saja" onChange={setWifiOnly} />
      </div>

      <button
        type="button"
        disabled={isLoading || isSyncing || queue.length === 0}
        onClick={() => void retrySync()}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-b-[3px] border-[#E0603F] bg-[#FF7A59] text-sm font-bold text-white transition-all duration-100 active:translate-y-[2px] active:border-b disabled:border-b-0 disabled:opacity-50"
      >
        <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
        {isSyncing ? 'Menyinkronkan demo...' : 'Coba kirim sekarang'}
      </button>
    </ScreenLayout>
  );
};