import React, { useState } from 'react';
import { BatteryLow, Cloud, Heart, Leaf } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ScreenHeader } from '../../components/shared/cute/ScreenHeader';
import { ComfortBanner } from '../../components/shared/cute/ComfortBanner';
import { FloatingDecor } from '../../components/shared/cute/FloatingDecor';
import { DECOR_PRESETS } from '../../components/shared/cute/decorPresets';
import { vaultApi } from './vaultApi';
import '../../styles/cute-animations.css';

const NOTE_MOODS = [
  { label: 'Lagi cemas', icon: Cloud },
  { label: 'Capek', icon: BatteryLow },
  { label: 'Mulai tenang', icon: Leaf },
] as const;

/** Garis buku tulis tipis di belakang teks. */
const NOTEBOOK_LINES: React.CSSProperties = {
  backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #EDE9FE 24px)',
  backgroundAttachment: 'local',
  lineHeight: '24px',
};

function getCheer(length: number): string {
  if (length === 0) return 'Tidak ada yang buru-buru. Mulai dari satu kalimat saja.';
  if (length < 200) return 'Aku mendengarkan.';
  return 'Terima kasih sudah mau bercerita. Kamu sangat berani.';
}

export const WriteNoteScreen: React.FC = () => {
  const { setScreen, addEvidence } = useVaultStore();
  const [mood, setMood] = useState<string>(NOTE_MOODS[0].label);
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cheer = getCheer(content.length);

  const handleSave = async () => {
    if (!content.trim() || isSaving) return;
    setIsSaving(true);
    setErrorMessage(null);
    try {
      const evidence = await vaultApi.saveEvidence({
        title: `Catatan Kronologi (${mood})`,
        type: 'note',
      });
      addEvidence(evidence);
      setScreen('s04-vault-home');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Catatan demo gagal disimpan.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MobileContainer className="relative flex flex-col justify-between overflow-hidden bg-[#FAF8FF] p-5 font-sans text-slate-800">
      <FloatingDecor items={DECOR_PRESETS.note} />
      <ScreenHeader title="Tulis Cerita" />

      <ComfortBanner tone="amber">Mode demo hanya mencatat metadata; isi catatan belum disimpan terenkripsi.</ComfortBanner>

      <div className="relative z-10 flex flex-1 flex-col space-y-4 py-2">
        <div>
          <p className="mb-2 text-[13px] font-medium text-slate-500">Bagaimana perasaanmu sekarang?</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih suasana hati">
            {NOTE_MOODS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                aria-pressed={mood === label}
                onClick={() => setMood(label)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                  mood === label
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'border border-violet-100 bg-white text-slate-600'
                }`}
              >
                <Icon size={13} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col rounded-3xl border border-white/90 bg-white/90 p-4 shadow-[0_8px_30px_rgba(76,29,149,0.05)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-800">Ceritamu hari ini</span>
            <span className="text-[11px] text-slate-500">{content.length} huruf</span>
          </div>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Hai, hari ini aku mau cerita..."
            aria-label="Tulis ceritamu"
            style={NOTEBOOK_LINES}
            className="min-h-[160px] w-full flex-1 resize-none border-none bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
          />

          <p key={cheer} className="ja-pop pt-2 text-center text-[12px] text-violet-500">
            {cheer}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={!content.trim() || isSaving}
        onClick={() => void handleSave()}
        className="relative z-10 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B50] text-sm font-semibold text-white shadow-sm transition-all active:scale-95 disabled:opacity-40"
      >
        <Heart size={18} />
        <span>{isSaving ? 'Menyimpan demo...' : 'Simpan cerita aman'}</span>
      </button>
      {errorMessage && <p role="alert" className="relative z-10 text-center text-xs font-semibold text-rose-700">{errorMessage}</p>}
    </MobileContainer>
  );
};
