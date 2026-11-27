// Layar langkah 1/3: Simulasi membaca chip NFC e-KTP.
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, LoaderCircle, Nfc } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ROUTES } from './responderData';
import { ResponderStepHeader } from './ResponderStepHeader';
import { Button, Card, HelperBubble, Pill, ResponderScreen, TipsCard } from './ResponderUi';
import { responderApi } from './responderApi';

type ScanStatus = 'idle' | 'scanning' | 'verified' | 'error';

const NEXT_STEP_DELAY_MS = 900;

const SCAN_TIPS = [
  'Lepaskan casing HP jika terlalu tebal.',
  'Tahan e-KTP dan jangan digerakkan saat memindai.',
] as const;

const HELPER_TEXT: Record<ScanStatus, string> = {
  idle: 'Tempelkan e-KTP di belakang HP, lalu mulai pemindaian demo.',
  scanning: 'Sedang membaca chip e-KTP dalam mode demo.',
  verified: 'Chip e-KTP terbaca dalam simulasi. Membuka pengenalan data OCR...',
  error: 'Pemindaian belum berhasil. Coba tempelkan lagi.',
};

export const ResponderNfcScanScreen: React.FC = () => {
  const { setScreen, updateResponderFlowSession } = useVaultStore();
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const nextStepTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (nextStepTimer.current !== null) window.clearTimeout(nextStepTimer.current);
    },
    [],
  );

  const startScan = async () => {
    if (status === 'scanning') return;
    setStatus('scanning');
    setErrorMessage(null);
    try {
      const scan = await responderApi.readEktpNfc();
      updateResponderFlowSession({ nfcScanId: scan.scanId, identity: null, otpChallenge: null, grant: null });
      setStatus('verified');
      nextStepTimer.current = window.setTimeout(() => setScreen(ROUTES.ocr), NEXT_STEP_DELAY_MS);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Pemindaian NFC demo gagal.');
    }
  };

  const isScanning = status === 'scanning';
  const isVerified = status === 'verified';

  const actionButton = (
    <Button
      icon={isVerified ? CheckCircle2 : isScanning ? LoaderCircle : Nfc}
      disabled={isScanning || isVerified}
      onClick={() => void startScan()}
    >
      {isVerified ? 'Membuka tahap OCR...' : isScanning ? 'Sedang memindai...' : 'Tempel & mulai pemindaian demo'}
    </Button>
  );

  return (
    <ResponderScreen
      scrollable
      header={<ResponderStepHeader step={1} title="Pemindaian NFC e-KTP" backTarget={ROUTES.welcome} />}
      footer={actionButton}
    >
      <HelperBubble>{errorMessage ?? HELPER_TEXT[status]}</HelperBubble>

      <div className="my-auto">
        {isVerified ? (
          <Card tone="soft" className="space-y-3">
            <div className="flex items-center justify-between">
              <Pill tone="success" icon={CheckCircle2}>
                Chip terbaca
              </Pill>
              <Pill tone="neutral">Simulasi</Pill>
            </div>
            <div className="rounded-2xl border border-[#EAE2D3] bg-white p-3 text-center">
              <p className="text-sm font-extrabold">Contoh chip terdeteksi</p>
              <p className="mt-1 text-[11px] text-[#7B7389]">Data identitas akan ditampilkan pada tahap OCR.</p>
            </div>
          </Card>
        ) : (
          <Card className="space-y-3 py-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFE9DD] text-[#D9552F]">
              {isScanning ? <LoaderCircle size={34} className="animate-spin" /> : <Nfc size={34} />}
            </div>
            <h2 className="text-base font-extrabold">{isScanning ? 'Membaca chip e-KTP...' : 'Tempelkan e-KTP'}</h2>
            <p className="mx-auto max-w-[220px] text-[11px] leading-relaxed text-[#7B7389]">
              Simulasi ini belum terhubung ke sensor NFC perangkat.
            </p>
          </Card>
        )}
      </div>

      {!isVerified && <TipsCard title="Tips pemindaian:" tips={SCAN_TIPS} />}
    </ResponderScreen>
  );
};