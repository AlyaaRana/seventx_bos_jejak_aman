import React, { useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ScreenHeader } from '../../components/shared/cute/ScreenHeader';
import { ComfortBanner } from '../../components/shared/cute/ComfortBanner';
import { FloatingDecor } from '../../components/shared/cute/FloatingDecor';
import { DECOR_PRESETS } from '../../components/shared/cute/decorPresets';
import { formatDuration, useElapsedSeconds } from '../../hooks/useElapsedSeconds';
import { vaultApi } from './vaultApi';
import '../../styles/cute-animations.css';

const BAR_COUNT = 24;
const ENCOURAGEMENT_INTERVAL_SECONDS = 6;
const ENCOURAGEMENTS = [
  'Kamu hebat, lanjutkan pelan-pelan.',
  'Aku mendengarkan, tidak ada yang buru-buru.',
  'Tarik napas dulu kalau perlu, ya.',
  'Suaramu aman bersamaku.',
] as const;

const WaveBars: React.FC<{ active: boolean }> = ({ active }) => (
  <div aria-hidden className="flex h-12 items-center justify-center gap-1">
    {Array.from({ length: BAR_COUNT }, (_, index) => (
      <span
        key={index}
        className={`h-full w-1 origin-center rounded-full ${active ? 'ja-wave bg-violet-400' : 'bg-violet-200'}`}
        style={
          active
            ? { animationDelay: `${(index * 97) % 700}ms`, animationDuration: `${700 + ((index * 53) % 500)}ms` }
            : { transform: 'scaleY(0.25)' }
        }
      />
    ))}
  </div>
);

export const RecordAudioScreen: React.FC = () => {
  const { setScreen, addEvidence } = useVaultStore();
  const [isRecording, setIsRecording] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const elapsed = useElapsedSeconds(isRecording);

  const encouragement = ENCOURAGEMENTS[Math.floor(elapsed / ENCOURAGEMENT_INTERVAL_SECONDS) % ENCOURAGEMENTS.length];

  const toggleRecording = async () => {
    if (!isRecording) {
      setIsRecording(true);
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);
    try {
      const evidence = await vaultApi.saveEvidence({ title: 'Rekaman Suara', type: 'audio' });
      addEvidence(evidence);
      setIsRecording(false);
      setScreen('s04-vault-home');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Rekaman demo gagal disimpan.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MobileContainer className="relative flex flex-col justify-between overflow-hidden bg-[#FAF8FF] p-5 font-sans text-slate-800">
      <FloatingDecor items={DECOR_PRESETS.audio} />
      <ScreenHeader title="Rekam Suara" />

      <ComfortBanner tone="purple">Mode demo: timer simulasi, belum merekam audio sungguhan.</ComfortBanner>

      <section className="relative z-10 my-auto flex min-h-[320px] flex-col items-center justify-center space-y-5 rounded-[32px] border border-white/90 bg-white/85 p-8 shadow-[0_8px_30px_rgba(76,29,149,0.05)] backdrop-blur-md">
        {isRecording && (
          <span className="ja-pop absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            REC {formatDuration(elapsed)}
          </span>
        )}

        <div className="relative">
          {isRecording && <span aria-hidden className="ja-halo absolute inset-0 rounded-full bg-violet-300/60" />}
          <div
            className={`relative flex h-24 w-24 items-center justify-center rounded-full text-violet-600 transition-all ${
              isRecording ? 'bg-violet-100' : 'bg-violet-50'
            }`}
          >
            <Mic size={38} strokeWidth={1.8} />
          </div>
        </div>

        <WaveBars active={isRecording} />

        <div className="space-y-1 text-center">
          <h2 className="text-base font-semibold text-slate-900">
            {isRecording ? 'Aku mendengarkan' : 'Ceritakan pelan-pelan'}
          </h2>
          <p
            key={isRecording ? encouragement : 'idle'}
            className="ja-pop mx-auto min-h-[32px] max-w-[220px] text-[13px] text-slate-500"
          >
            {isRecording ? encouragement : 'Suaramu langsung terkunci dan tidak muncul di pemutar musik HP.'}
          </p>
        </div>

        <div className="flex gap-2">
          <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-700">
            Bisa dijeda kapan saja
          </span>
          <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-700">
            Hanya kamu yang dengar
          </span>
        </div>
      </section>

      <button
        type="button"
        onClick={() => void toggleRecording()}
        disabled={isSaving}
        className={`relative z-10 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white shadow-sm transition-all active:scale-95 ${
          isRecording ? 'bg-red-500' : 'bg-[#FF6B50]'
        }`}
      >
        {isRecording ? <Square size={18} /> : <Mic size={18} />}
        <span>{isSaving ? 'Menyimpan demo...' : isRecording ? 'Hentikan & simpan' : 'Mulai rekam suara'}</span>
      </button>
      {errorMessage && <p role="alert" className="relative z-10 text-center text-xs font-semibold text-rose-700">{errorMessage}</p>}
    </MobileContainer>
  );
};
