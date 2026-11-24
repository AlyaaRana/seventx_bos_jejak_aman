// Layar S16 peninjauan bukti ber-watermark read-only lengkap dengan validasi hash SHA-256.
import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Eye, Lock, PlusCircle, ShieldCheck } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ROUTES } from './responderData';
import { Button, Card, IconButton, Pill, ResponderScreen, WatermarkedPreview } from './ResponderUi';
import { responderApi } from './responderApi';
import type { EvidenceIntegrityResult, EvidenceItem } from '../../types/responder';

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
    let isActive = true;
    if (!caseId) return () => {
      isActive = false;
    };

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

  const displayError = errorMessage ?? (!caseId ? 'Data kasus belum tersedia. Verifikasi identitas terlebih dahulu.' : null);

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

  return (
    <ResponderScreen scrollable>
      <header className="flex items-center justify-between pt-1">
        <IconButton icon={ArrowLeft} label="Kembali" onClick={() => setScreen(ROUTES.dashboard)} />

        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400">Kasus {caseId ?? '—'}</p>
          <h1 className="text-sm font-extrabold text-slate-900">Tinjau bukti</h1>
        </div>

        <Pill tone="info" icon={Eye}>
          Hanya baca · demo
        </Pill>
      </header>

      {displayError && <p role="alert" className="text-center text-[12px] font-semibold text-rose-700">{displayError}</p>}

      {!caseId ? (
        <Card className="text-center text-sm font-semibold text-slate-600">{displayError}</Card>
      ) : isLoading ? (
        <Card className="text-center text-sm font-semibold text-slate-600">Memuat bukti demo...</Card>
      ) : selectedEvidence ? (
      <>
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold text-slate-900">{selectedEvidence.title}</p>
          <Pill tone="neutral" icon={Lock}>
            Tidak bisa diunduh
          </Pill>
        </div>

        <WatermarkedPreview watermark={`${identity?.name ?? 'Pendamping'} · Kasus ${caseId ?? ''}`} className="h-44">
          <span className="rounded-full border border-purple-200 bg-white/90 px-3 py-1 text-[11px] font-bold text-purple-900 shadow-2xs">
            Pratinjau demo
          </span>
        </WatermarkedPreview>

        <p className="text-center text-[10px] text-slate-400">
          Tampilan contoh bertanda nama; berkas asli belum terhubung.
        </p>
      </Card>

      <Card tone="neutral" className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold text-slate-900">
            Sidik digital {integrity?.fingerprint ?? 'belum diperiksa'}
          </p>
          <Pill tone={integrity?.isValid ? 'success' : 'neutral'} icon={CheckCircle2}>
            {integrity ? (integrity.isValid ? 'Utuh' : 'Perlu ditinjau') : 'Belum dicek'}
          </Pill>
        </div>

        <dl className="space-y-1 text-[11px] text-slate-500">
          {(integrity?.events ?? []).map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <dt>{label}</dt>
              <dd className="font-bold text-slate-700">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="pt-1 text-[10px] font-semibold text-emerald-700">
          {integrity
            ? integrity.isValid
              ? 'Seluruh rantai hash terverifikasi tanpa perubahan.'
              : 'Hash perlu diperiksa oleh petugas berwenang.'
            : 'Jalankan pemeriksaan untuk melihat status integritas.'}
        </p>
      </Card>

      <div className="space-y-2">
        <Button icon={ShieldCheck} disabled={isChecking} onClick={() => void checkIntegrity()}>
          {isChecking ? 'Memeriksa...' : 'Cek keutuhan seluruh rantai'}
        </Button>

        <Button variant="secondary" icon={PlusCircle} disabled={isRequestSent} onClick={() => void requestEvidence()}>
          {isRequestSent ? 'Permintaan bukti dikirim ke penyintas' : 'Minta bukti tambahan'}
        </Button>

        <p className="text-center text-[10px] text-slate-400">Permintaan tambahan bebas ditolak penyintas.</p>
      </div>
      </>
      ) : (
        <Card className="text-center text-sm font-semibold text-slate-600">Belum ada bukti pada kasus ini.</Card>
      )}
    </ResponderScreen>
  );
};
