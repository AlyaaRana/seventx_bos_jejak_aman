import React, { useEffect, useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { ChevronLeft, WifiOff, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { vaultApi } from './vaultApi';
import type { SyncQueueItem } from './vaultApi';

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
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 flex flex-col justify-between">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('s04-vault-home')}
            className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-xs"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <p className="text-[10px] font-bold text-emerald-700 leading-tight">Status sinkron</p>
            <h1 className="text-base font-extrabold text-slate-900 leading-tight flex items-center gap-1.5">Antrean bukti</h1>
          </div>
        </div>
        
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-3.5 flex-1 overflow-y-auto">
        {/* Offline Warning Banner */}
        <div className="bg-[#FEF3C7] border border-amber-200 p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
            😊
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-amber-950">Sinyal belum ada. Tidak apa-apa.</p>
            <p className="text-[10px] text-amber-800 leading-tight">
              Mode demo: status antrean berubah lokal dan belum mengirim berkas ke server.
            </p>
          </div>
        </div>

        {/* Queue Items */}
        {errorMessage && <p role="alert" className="text-xs font-semibold text-rose-700">{errorMessage}</p>}
        <div className="space-y-2.5">
          {isLoading ? (
            <p className="text-center text-xs text-slate-500">Memuat antrean demo...</p>
          ) : queue.length ? (
            queue.map((item) => (
              <div key={item.evidenceId} className="space-y-2 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xs">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.title}</p>
                    <p className="text-[10px] text-slate-400">ID bukti: {item.evidenceId}</p>
                  </div>
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    item.status === 'synced'
                      ? 'bg-[#DCFCE7] text-[#047857]'
                      : item.status === 'uploading'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status === 'synced' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                    {item.status === 'synced' ? 'Tersinkron · demo' : item.status === 'uploading' ? `Mengunggah ${item.progress}%` : 'Menunggu'}
                  </span>
                </div>
                {item.status === 'uploading' && (
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[#FF6B50]" style={{ width: `${item.progress}%` }} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
              Antrean kosong.
            </p>
          )}
        </div>

        {/* Note Box */}
        <div className="bg-purple-50/60 border border-purple-100 p-3.5 rounded-2xl text-[11px] text-slate-500 leading-relaxed">
          Waktu pengambilan dicatat dari ponselmu. Cap waktu server menyusul saat tersambung, dan keduanya tampil di detail bukti.
        </div>

        {/* Wi-Fi Toggle Switch */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <WifiOff size={18} className="text-slate-500" />
            <span className="text-xs font-bold text-slate-800">Hemat data: kirim lewat Wi-Fi saja</span>
          </div>
          <button
            onClick={() => setWifiOnly(!wifiOnly)}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              wifiOnly ? 'bg-purple-600' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${wifiOnly ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Action Button */}
        <button
          type="button"
          disabled={isLoading || isSyncing || queue.length === 0}
          onClick={() => void retrySync()}
          className="w-full h-12 rounded-2xl bg-[#FF6B50] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          <RefreshCw size={16} />
          <span>{isSyncing ? 'Menyinkronkan demo...' : 'Coba kirim sekarang'}</span>
        </button>
      </div>

      <BottomNavbar />
    </MobileContainer>
  );
};