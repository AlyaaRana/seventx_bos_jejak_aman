// Layar langkah 1/3: Simulasi membaca chip NFC e-KTP.
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, LoaderCircle, Nfc } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ROUTES } from './responderData';
import { ResponderStepHeader } from './ResponderStepHeader';
import { Button, Card, HelperBubble, Pill, ResponderScreen, TipsCard } from './ResponderUi';
import { responderApi } from './responderApi';

const SCAN_TIPS = [
  'Lepaskan casing HP jika terlalu tebal.',
  'Tahan e-KTP dan jangan digerakkan saat memindai.',
] as const;

export const ResponderNfcScanScreen: React.FC = () => {
  const { setScreen, updateResponderFlowSession } = useVaultStore();
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verified' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scanTimer = useRef<number | null>(null);
  const nextTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (scanTimer.current !== null) window.clearTimeout(scanTimer.current);
      if (nextTimer.current !== null) window.clearTimeout(nextTimer.current);
    },
    [],
  );

  const startScan = async () => {
    if (status === 'scanning') return;
    setStatus('scanning');
    setErrorMessage(null);
    if (scanTimer.current !== null) window.clearTimeout(scanTimer.current);
    try {
      const scan = await responderApi.readEktpNfc();
      updateResponderFlowSession({ nfcScanId: scan.scanId, identity: null, otpChallenge: null, grant: null });
      setStatus('verified');
      nextTimer.current = window.setTimeout(() => setScreen(ROUTES.ocr), 900);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Pemindaian NFC demo gagal.');
    }
  };

  return (
    <ResponderScreen>
      <ResponderStepHeader step={1} title="Pemindaian NFC e-KTP" backTarget={ROUTES.welcome} />

      <HelperBubble>
        {errorMessage
          ? errorMessage
          : status === 'verified'
          ? 'Chip e-KTP terbaca dalam simulasi. Membuka pengenalan data OCR...'
          : status === 'scanning'
            ? 'Sedang membaca chip e-KTP dalam mode demo.'
            : 'Tempelkan e-KTP di belakang HP, lalu mulai pemindaian demo.'}
      </HelperBubble>

      <main className="flex flex-[1.15] flex-col justify-center py-1">
        {status !== 'verified' ? (
          <Card className="space-y-3 py-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-[#FF7E62] shadow-inner">
              {status === 'scanning' ? <LoaderCircle size={34} className="animate-spin" /> : <Nfc size={34} />}
            </div>
            <h2 className="text-base font-extrabold text-slate-900">
              {status === 'scanning' ? 'Membaca chip e-KTP...' : 'Tempelkan e-KTP'}
            </h2>
            <p className="mx-auto max-w-[220px] text-[11px] leading-relaxed text-slate-500">
              Simulasi ini belum terhubung ke sensor NFC perangkat.
            </p>
          </Card>
        ) : (
          <Card tone="soft" className="space-y-3">
            <div className="flex items-center justify-between">
              <Pill tone="success" icon={CheckCircle2}>Chip terbaca</Pill>
              <Pill tone="neutral">Simulasi</Pill>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-white p-3 text-center">
              <p className="text-sm font-extrabold text-slate-900">Contoh chip terdeteksi</p>
              <p className="mt-1 text-[11px] text-slate-500">Data identitas akan ditampilkan pada tahap OCR.</p>
            </div>
          </Card>
        )}
      </main>

      {status !== 'verified' && <TipsCard title="Tips Pemindaian:" tips={SCAN_TIPS} />}

      <div className="space-y-2">
        {status === 'idle' || status === 'error' ? (
          <Button icon={Nfc} onClick={startScan}>Tempel & mulai pemindaian demo</Button>
        ) : (
          <Button icon={status === 'scanning' ? LoaderCircle : CheckCircle2} onClick={startScan} disabled>
            {status === 'scanning' ? 'Sedang Memindai...' : 'Membuka tahap OCR...'}
          </Button>
        )}
      </div>
    </ResponderScreen>
  );
};
