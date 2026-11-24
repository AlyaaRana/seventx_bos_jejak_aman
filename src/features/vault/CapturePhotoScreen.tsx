import React, { useEffect, useRef, useState } from 'react';
import { Camera, Check } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ScreenHeader } from '../../components/shared/cute/ScreenHeader';
import { ComfortBanner } from '../../components/shared/cute/ComfortBanner';
import { FloatingDecor } from '../../components/shared/cute/FloatingDecor';
import { DECOR_PRESETS } from '../../components/shared/cute/decorPresets';
import { vaultApi } from './vaultApi';
import '../../styles/cute-animations.css';

const RETURN_DELAY_MS = 900;

/** Sudut-sudut bingkai kamera. */
const VIEWFINDER_CORNERS = [
  'left-4 top-4 rounded-tl-xl border-l-4 border-t-4',
  'right-4 top-4 rounded-tr-xl border-r-4 border-t-4',
  'bottom-4 left-4 rounded-bl-xl border-b-4 border-l-4',
  'bottom-4 right-4 rounded-br-xl border-b-4 border-r-4',
] as const;

export const CapturePhotoScreen: React.FC = () => {
  const { setScreen, addEvidence } = useVaultStore();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const returnTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(returnTimer.current), []);

  const handleCapture = async () => {
    if (isSaved || isSaving) return;
    setIsSaving(true);
    setErrorMessage(null);
    try {
      const evidence = await vaultApi.saveEvidence({ title: 'Foto Bukti', type: 'photo' });
      addEvidence(evidence);
      setIsSaved(true);
      returnTimer.current = window.setTimeout(() => setScreen('s04-vault-home'), RETURN_DELAY_MS);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Bukti gagal disimpan.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MobileContainer className="relative flex flex-col justify-between overflow-hidden bg-[#FAF8FF] p-5 font-sans text-slate-800">
      <FloatingDecor items={DECOR_PRESETS.photo} />
      <ScreenHeader title="Ambil Bukti" />

      <ComfortBanner tone="emerald">Mode demo: kamera belum terhubung; tombol hanya mencatat metadata bukti.</ComfortBanner>

      <section className="relative z-10 my-auto flex min-h-[300px] flex-col items-center justify-center space-y-4 overflow-hidden rounded-[32px] border border-white/90 bg-white/70 p-8 shadow-[0_8px_30px_rgba(76,29,149,0.05)] backdrop-blur-md">
        {VIEWFINDER_CORNERS.map((corner) => (
          <span key={corner} aria-hidden className={`absolute h-6 w-6 border-violet-200 ${corner}`} />
        ))}

        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-violet-100 bg-violet-50 text-violet-600">
          <Camera size={34} strokeWidth={1.7} />
        </div>

        <div className="space-y-1 text-center">
          <h2 className="text-sm font-semibold text-slate-800">Ambil bukti dengan tenang</h2>
          <p className="mx-auto max-w-[210px] text-[13px] text-slate-500">
            Foto langsung terkunci di brankas amanmu dan tidak muncul di galeri HP.
          </p>
        </div>

        {isSaved && (
          <>
            <div aria-hidden className="ja-flash absolute inset-0 z-20 bg-white" />
            <div className="ja-pop absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-emerald-50/90">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                <Check size={30} strokeWidth={3} />
              </span>
              <p className="text-sm font-semibold text-emerald-800">Metadata demo tercatat</p>
            </div>
          </>
        )}
      </section>

      <button
        type="button"
        onClick={() => void handleCapture()}
        disabled={isSaved || isSaving}
        className="relative z-10 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B50] text-sm font-semibold text-white shadow-sm transition-all active:scale-95 disabled:opacity-60"
      >
        <Camera size={18} />
        <span>{isSaving ? 'Menyimpan demo...' : isSaved ? 'Tercatat' : 'Ambil & simpan demo'}</span>
      </button>
      {errorMessage && <p role="alert" className="relative z-10 text-center text-xs font-semibold text-rose-700">{errorMessage}</p>}
    </MobileContainer>
  );
};
