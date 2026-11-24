import React, { useRef, useState } from 'react';
import { CheckCircle2, EyeOff, FileText, Heart, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ScreenHeader } from '../../components/shared/cute/ScreenHeader';
import { ComfortBanner } from '../../components/shared/cute/ComfortBanner';
import { FloatingDecor } from '../../components/shared/cute/FloatingDecor';
import { HeartBurst } from '../../components/shared/cute/HeartBurst';
import { DECOR_PRESETS } from '../../components/shared/cute/decorPresets';
import { useHeartBurst } from '../../hooks/useHeartBurst';
import { vaultApi } from './vaultApi';
import '../../styles/cute-animations.css';

interface SavedFile {
  name: string;
  timestamp: string;
}

const ACCEPTED_FILES = 'image/*,.pdf,.doc,.docx';
const SAVED_TIMESTAMP = 'Tersimpan aman · Hari ini';

export const PickFileScreen: React.FC = () => {
  const { addEvidence } = useVaultStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { particles, burst } = useHeartBurst();
  const [justSavedFile, setJustSavedFile] = useState<SavedFile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsSaving(true);
    setErrorMessage(null);
    try {
      const evidence = await vaultApi.saveEvidence({
        title: file.name,
        type: file.type.startsWith('image/') ? 'photo' : 'document',
      });
      addEvidence(evidence);
      setJustSavedFile({ name: file.name, timestamp: SAVED_TIMESTAMP });
      burst();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Berkas demo gagal disimpan.');
    } finally {
      setIsSaving(false);
      // Izinkan memilih berkas yang sama lagi.
      event.target.value = '';
    }
  };

  return (
    <MobileContainer className="relative flex flex-col justify-between overflow-hidden bg-[#FAF8FF] p-5 font-sans text-slate-800">
      <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#E2F7ED] opacity-75 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-[#F3E8FF] opacity-70 blur-3xl" />
      <FloatingDecor items={DECOR_PRESETS.file} />

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={ACCEPTED_FILES} className="hidden" />

      <ScreenHeader title="Pilih Berkas" />

      <ComfortBanner tone="emerald">Mode demo hanya mencatat nama berkas; upload isi berkas terenkripsi belum terhubung.</ComfortBanner>

      <section className="relative z-10 my-auto space-y-3">
        <div
          role="button"
          tabIndex={0}
          onClick={openFilePicker}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openFilePicker();
            }
          }}
          className="relative cursor-pointer space-y-4 rounded-[32px] border-2 border-dashed border-emerald-200 bg-gradient-to-b from-emerald-50/70 to-emerald-100/50 p-6 text-center shadow-[0_8px_25px_rgba(16,185,129,0.06)] transition-all hover:border-emerald-400 active:scale-[0.98]"
        >
          <div className="relative mx-auto h-16 w-16">
            <HeartBurst particles={particles} />
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-600 shadow-md transition-transform duration-300 hover:scale-110">
              <UploadCloud size={30} strokeWidth={1.7} />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-base font-semibold text-emerald-900">Simpan foto atau chat</h2>
            <p className="mx-auto max-w-[230px] text-[13px] leading-relaxed text-emerald-700">
              Ketuk area ini untuk memilih tangkapan layar, foto, atau dokumen. Semuanya langsung terkunci rapat.
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openFilePicker();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-xs font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-50 active:scale-95"
          >
            <ImageIcon size={16} />
            <span>Pilih dari HP</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-violet-100 bg-violet-50/70 p-2.5 text-violet-700">
            <EyeOff size={14} />
            <span className="text-[12px] font-semibold">Tidak tampil di luar</span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-rose-100 bg-rose-50/70 p-2.5 text-rose-600">
            <Heart size={14} />
            <span className="text-[12px] font-semibold">Aman & rahasia</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 mb-1 space-y-2 pt-2">
        <h3 className="px-1 text-left text-[13px] font-semibold text-slate-800">Baru saja disimpan</h3>
        {isSaving && <p className="text-xs text-slate-500">Menyimpan metadata demo...</p>}
        {errorMessage && <p role="alert" className="text-xs font-semibold text-rose-700">{errorMessage}</p>}

        {justSavedFile ? (
          <div key={justSavedFile.name} className="ja-pop flex items-center justify-between rounded-[22px] border border-white/90 bg-white/90 p-3.5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <p className="text-[13px] font-semibold leading-tight text-slate-900">{justSavedFile.name}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-slate-500">{justSavedFile.timestamp}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 size={12} /> Demo
            </span>
          </div>
        ) : (
          <div className="rounded-[22px] border border-dashed border-slate-200 bg-white/60 p-4 text-center text-xs text-slate-500">
            Belum ada berkas yang baru disimpan.
          </div>
        )}
      </section>
    </MobileContainer>
  );
};
