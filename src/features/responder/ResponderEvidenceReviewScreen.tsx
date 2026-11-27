// Layar S16 peninjauan bukti ber-watermark read-only lengkap dengan validasi hash SHA-256.
import React, { useEffect, useState } from 'react';
import { Lock, PlusCircle, ShieldCheck } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ROUTES } from './responderData';
import {
  Button,
  Card,
  Pill,
  ResponderHeader,
  ResponderScreen,
  WatermarkedPreview,
  type PillTone,
} from './ResponderUi';
import { responderApi } from './responderApi';
import type { EvidenceIntegrityResult, EvidenceItem } from '../../types/responder';

const NO_CASE_MESSAGE = 'Data kasus belum tersedia. Verifikasi identitas terlebih dahulu.';

interface IntegrityView {
  tone: PillTone;
  label: string;
  message: string;
  messageClass: string;
}

const describeIntegrity = (integrity: EvidenceIntegrityResult | null): IntegrityView => {
  if (!integrity) {
    return {
      tone: 'neutral',
      label: 'Belum dicek',
      message: 'Jalankan pemeriksaan untuk melihat status integritas.',
      messageClass: 'text-[#7B7389]',
    };
  }
  if (integrity.isValid) {
    return {
      tone: 'success',
      label: 'Utuh',
      message: 'Seluruh rantai hash terverifikasi tanpa perubahan.',
      messageClass: 'text-emerald-700',
    };
  }
  return {
    tone: 'warning',
    label: 'Perlu ditinjau',
    message: 'Hash perlu diperiksa oleh petugas berwenang.',
    messageClass: 'text-amber-700',
  };
};

const NoteCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Card className="text-center text-sm font-semibold text-[#6B6480]">{children}</Card>
);

export const ResponderEvidenceReviewScreen: React.FC = () => {
  const { setScreen, responderFlowSession } = useVaultStore();
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [integrity, setIntegrity] = useState<EvidenceIntegrityResult | null>(null);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const identity = responderFlowSession.identity;
  const caseId = identity?.caseId;
  const selectedEvidence = evidence[0];

  useEffect(() => {
    if (!caseId) return;
    let isActive = true;

    void responderApi
      .listCaseEvidence(caseId)
      .then((result) => {
        if (isActive) setEvidence(result);
      })
      .catch((error: unknown) => {
        if (isActive) setErrorMessage(error instanceof Error ? error.message : 'Bukti kasus gagal dimuat.');
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [caseId]);

  const checkIntegrity = async () => {
    if (!selectedEvidence) return;
    setIsChecking(true);
    setErrorMessage(null);
    try {
      setIntegrity(await responderApi.verifyEvidenceIntegrity(selectedEvidence.id));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Pemeriksaan integritas gagal.');
    } finally {
      setIsChecking(false);
    }
  };

  const requestEvidence = async () => {
    if (!caseId || !selectedEvidence) return;
    setErrorMessage(null);
    try {
      await responderApi.requestAdditionalEvidence(caseId, selectedEvidence.id);
      setIsRequestSent(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Permintaan bukti gagal dikirim.');
    }
  };

  const integrityView = describeIntegrity(integrity);

  const actions = selectedEvidence && (
    <>
      <Button icon={ShieldCheck} disabled={isChecking} onClick={() => void checkIntegrity()}>
        {isChecking ? 'Memeriksa...' : 'Cek keutuhan seluruh rantai'}
      </Button>
      <Button variant="secondary" icon={PlusCircle} disabled={isRequestSent} onClick={() => void requestEvidence()}>
        {isRequestSent ? 'Permintaan bukti dikirim ke penyintas' : 'Minta bukti tambahan'}
      </Button>
      <p className="text-center text-[10px] text-[#7B7389]">Permintaan tambahan bebas ditolak penyintas.</p>
    </>
  );

  const renderBody = () => {
    if (!caseId) return <NoteCard>{NO_CASE_MESSAGE}</NoteCard>;
    if (isLoading) return <NoteCard>Memuat bukti demo...</NoteCard>;
    if (!selectedEvidence) return <NoteCard>Belum ada bukti pada kasus ini.</NoteCard>;

    return (
      <>
        <Card className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate text-xs font-extrabold">{selectedEvidence.title}</p>
            <Pill tone="neutral" icon={Lock}>
              Tidak bisa diunduh
            </Pill>
          </div>

          <WatermarkedPreview watermark={`${identity?.name ?? 'Pendamping'} · Kasus ${caseId}`} className="h-44">
            <span className="rounded-full border border-[#EAE2D3] bg-white px-3 py-1 text-[11px] font-bold text-[#1E1B4B]">
              Pratinjau demo
            </span>
          </WatermarkedPreview>

          <p className="text-center text-[10px] text-[#7B7389]">
            Tampilan contoh bertanda nama; berkas asli belum terhubung.
          </p>
        </Card>

        <Card tone="neutral" className="space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-extrabold">Sidik digital</p>
              <p className="mt-0.5 break-all font-mono text-[10px] text-[#7B7389]">
                {integrity?.fingerprint ?? 'belum diperiksa'}
              </p>
            </div>
            <Pill tone={integrityView.tone}>{integrityView.label}</Pill>
          </div>

          {integrity && integrity.events.length > 0 && (
            <dl className="space-y-1 text-[11px] text-[#7B7389]">
              {integrity.events.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-3">
                  <dt>{label}</dt>
                  <dd className="font-bold text-[#2A2438]">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className={`text-[11px] font-semibold ${integrityView.messageClass}`}>{integrityView.message}</p>
        </Card>
      </>
    );
  };

  return (
    <ResponderScreen
      scrollable
      header={
        <ResponderHeader
          eyebrow={`Kasus ${caseId ?? '—'} · hanya baca`}
          title="Tinjau bukti"
          onBack={() => setScreen(ROUTES.dashboard)}
        />
      }
      footer={actions}
    >
      {caseId && errorMessage && (
        <p role="alert" className="text-center text-[12px] font-semibold text-rose-700">
          {errorMessage}
        </p>
      )}
      {renderBody()}
    </ResponderScreen>
  );
};