// Layar langkah 2/3: Simulasi pengenalan data e-KTP melalui OCR.
import React, { useEffect, useRef, useState } from 'react';
import { Building2, CheckCircle2, EyeOff, Hash, Maximize2, Sparkles, User, UserSquare2 } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ROUTES } from './responderData';
import { ResponderStepHeader } from './ResponderStepHeader';
import { DataField, ScanFrame } from './ResponderParts';
import { Button, Card, HelperBubble, Pill, ResponderScreen } from './ResponderUi';
import { responderApi } from './responderApi';
import type { ResponderIdentity } from '../../types/responder';
import './responder-animations.css';

type ScanStatus = 'scanning' | 'verified' | 'error';

const NEXT_STEP_DELAY_MS = 1100;
const MISSING_NFC_MESSAGE = 'Sesi NFC tidak ditemukan. Kembali dan pindai e-KTP terlebih dahulu.';

/** Garis placeholder yang meniru baris teks pada kartu. */
const CARD_SKELETON_LINES = ['h-2.5 w-32 bg-[#E5DDCC]', 'h-2 w-24 bg-[#EDE6D6]', 'h-2 w-20 bg-[#EDE6D6]'] as const;

export const ResponderOcrScanScreen: React.FC = () => {
  const { setScreen, responderFlowSession, updateResponderFlowSession } = useVaultStore();
  const [status, setStatus] = useState<ScanStatus>('scanning');
  const [identity, setIdentity] = useState<ResponderIdentity | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const nextStepTimer = useRef<number | null>(null);
  const nfcScanId = responderFlowSession.nfcScanId;

  useEffect(() => {
    if (!nfcScanId) return;
    let isActive = true;

    void responderApi
      .readEktpOcr(nfcScanId)
      .then((result) => {
        if (!isActive) return;
        setIdentity(result);
        updateResponderFlowSession({ identity: result });
        setStatus('verified');
        nextStepTimer.current = window.setTimeout(() => setScreen(ROUTES.otp), NEXT_STEP_DELAY_MS);
      })
      .catch((error: unknown) => {
        if (!isActive) return;
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Pengenalan data OCR gagal.');
      });

    return () => {
      isActive = false;
      if (nextStepTimer.current !== null) window.clearTimeout(nextStepTimer.current);
    };
  }, [nfcScanId, setScreen, updateResponderFlowSession]);

  // Tanpa sesi NFC, layar ini tidak punya apa-apa untuk dibaca.
  const displayStatus: ScanStatus = nfcScanId ? status : 'error';
  const displayError = errorMessage ?? (nfcScanId ? null : MISSING_NFC_MESSAGE);

  const helperText =
    displayError ??
    (displayStatus === 'verified'
      ? 'Data contoh berhasil dikenali. Membuka tahap OTP...'
      : 'Sedang membaca data e-KTP dengan OCR simulasi.');

  return (
    <ResponderScreen
      scrollable
      header={<ResponderStepHeader step={2} title="Pengenalan Data e-KTP" backTarget={ROUTES.nfc} />}
    >
      <HelperBubble>{helperText}</HelperBubble>

      <div className="my-auto">
        {displayStatus === 'scanning' && (
          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <Pill tone="neutral" icon={EyeOff}>
                OCR simulasi
              </Pill>
              <span className="flex items-center gap-1 text-[12px] font-bold text-[#1E1B4B]">
                <Maximize2 size={12} /> Data contoh
              </span>
            </div>

            <ScanFrame isScanning>
              <div className="space-y-2.5 rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                  Republik Indonesia · e-KTP
                </p>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex-1 space-y-2">
                    {CARD_SKELETON_LINES.map((line) => (
                      <div key={line} className={`rounded-full ${line}`} />
                    ))}
                  </div>
                  <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <UserSquare2 size={28} strokeWidth={1.6} />
                  </div>
                </div>
              </div>
            </ScanFrame>

            <p className="text-center text-[12px] text-[#7B7389]">Hasil ini bukan data asli dari e-KTP.</p>
          </Card>
        )}

        {displayStatus === 'verified' && identity && (
          <Card tone="soft" className="space-y-3">
            <div className="flex items-center justify-between">
              <Pill tone="success" icon={CheckCircle2}>
                Data contoh terbaca
              </Pill>
              <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-700">
                <Sparkles size={12} /> Terisi otomatis
              </span>
            </div>

            <div className="space-y-2">
              <DataField index={0} icon={Hash} label="NIK" value={identity.maskedNik} mono />
              <DataField index={1} icon={User} label="Nama Lengkap" value={identity.name} />
              <DataField index={2} icon={Building2} label="Organisasi" value={identity.institution} />
            </div>
          </Card>
        )}

        {displayStatus === 'error' && (
          <Card tone="neutral" className="space-y-3 text-center">
            <Pill tone="warning">OCR belum berhasil</Pill>
            <p className="text-sm font-bold">{displayError}</p>
            <Button onClick={() => setScreen(ROUTES.nfc)}>Ulangi pemindaian NFC</Button>
          </Card>
        )}
      </div>

      {displayStatus !== 'error' && (
        <p className="text-center text-[11px] text-[#7B7389]">
          Tahap berikutnya terbuka otomatis setelah simulasi selesai.
        </p>
      )}
    </ResponderScreen>
  );
};