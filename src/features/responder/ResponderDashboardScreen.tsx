// Layar S15 Dashboard Pendamping terverifikasi e-KTP dengan timer akses, catatan kenyamanan, dan daftar bukti.
import React, { useEffect, useState } from 'react';
import {
  Camera,
  ChevronRight,
  Clock,
  FileCheck2,
  FileText,
  MessageSquareHeart,
  Mic,
  NotebookPen,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ROUTES } from './responderData';
import { Button, Card, Pill, ResponderIdentityCard, ResponderScreen } from './ResponderUi';
import { cx } from './responderUtils';
import { responderApi } from './responderApi';
import type { EvidenceItem, EvidenceKind, ResponderDashboardData } from '../../types/responder';

/* -------------------------------------------------------------------------- */
/* Konfigurasi                                                                */
/* -------------------------------------------------------------------------- */

const EVIDENCE_KIND_STYLE: Record<EvidenceKind, { icon: LucideIcon; tile: string }> = {
  photo: { icon: Camera, tile: 'bg-orange-100 text-orange-600' },
  audio: { icon: Mic, tile: 'bg-purple-100 text-purple-600' },
  document: { icon: FileText, tile: 'bg-emerald-100 text-emerald-600' },
  note: { icon: NotebookPen, tile: 'bg-amber-100 text-amber-600' },
};

/* -------------------------------------------------------------------------- */
/* Bagian-bagian layar                                                        */
/* -------------------------------------------------------------------------- */

const StatusBanner: React.FC = () => (
  <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-3 py-2.5">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
      <ShieldCheck size={16} />
    </div>
    <p className="text-[10px] font-bold leading-snug text-emerald-950">
      Identitas contoh cocok. Semua bukti demo siap ditinjau.
    </p>
  </div>
);

interface AccessTimerCardProps {
  durationLabel: string;
  remainingLabel: string;
}

const AccessTimerCard: React.FC<AccessTimerCardProps> = ({ durationLabel, remainingLabel }) => (
  <Card tone="warm" className="space-y-2 py-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-900">
        <Clock size={14} className="text-orange-500" />
        <span>Batas Waktu Akses</span>
      </div>
      <Pill tone="warning">{remainingLabel}</Pill>
    </div>

    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] text-slate-400">Akses {durationLabel} · otomatis terkunci saat habis</span>
    </div>
  </Card>
);

const ComfortNoteCard: React.FC = () => {
  const [draft, setDraft] = useState('');
  const [savedNote, setSavedNote] = useState<string | null>(null);

  const saveNote = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setSavedNote(trimmed);
    setDraft('');
  };

  return (
    <Card tone="soft" className="space-y-2 py-3">
      <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-purple-950">
        <MessageSquareHeart size={15} className="text-purple-600" />
        <span>Catatan Kenyamanan Klien</span>
      </div>

      <p className="text-[10px] leading-relaxed text-slate-600">
        Klien memilih komunikasi teks/suara tanpa tatap muka. Hindari mengulang kronologi yang sudah tertulis.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Tambah catatan sesi..."
          aria-label="Catatan sesi"
          className="h-8 min-w-0 flex-1 rounded-xl border border-purple-200/70 bg-white px-3 text-[11px] text-slate-800 outline-none focus:border-purple-400"
        />
        <Button size="sm" onClick={saveNote}>
          Simpan
        </Button>
      </div>

      {savedNote && (
        <p className="rounded-xl border border-purple-100 bg-white px-3 py-1.5 text-[11px] font-medium text-purple-900">
          Catatan tersimpan: {savedNote}
        </p>
      )}
    </Card>
  );
};

interface EvidenceRowProps {
  item: EvidenceItem;
  onOpen: () => void;
}

const EvidenceRow: React.FC<EvidenceRowProps> = ({ item, onOpen }) => {
  const { icon: Icon, tile } = EVIDENCE_KIND_STYLE[item.kind];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white p-2.5 text-left shadow-2xs transition-all active:scale-[0.99]"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div className={cx('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', tile)}>
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[11px] font-extrabold text-slate-900">{item.title}</p>
          <p className="truncate text-[9px] text-slate-400">{item.meta}</p>
          <p className="truncate text-[9px] text-slate-400">{item.status}</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Pill tone="neutral">Demo</Pill>
        <ChevronRight size={15} className="text-slate-300" />
      </div>
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/* Layar                                                                      */
/* -------------------------------------------------------------------------- */

export const ResponderDashboardScreen: React.FC = () => {
  const { setScreen, responderFlowSession } = useVaultStore();
  const [dashboard, setDashboard] = useState<ResponderDashboardData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const grantId = responderFlowSession.grant?.grantId;

  const openEvidenceReview = () => setScreen(ROUTES.evidenceReview);

  useEffect(() => {
    let isActive = true;
    if (!grantId) return () => {
      isActive = false;
    };

    void responderApi
      .getDashboard(grantId)
      .then((result) => {
        if (isActive) setDashboard(result);
      })
      .catch((error: unknown) => {
        if (isActive) setErrorMessage(error instanceof Error ? error.message : 'Dashboard gagal dimuat.');
      });

    return () => {
      isActive = false;
    };
  }, [grantId]);

  const displayError = errorMessage ?? (!grantId ? 'Izin akses belum tersedia. Verifikasi OTP terlebih dahulu.' : null);

  if (displayError) {
    return (
      <ResponderScreen>
        <Card tone="neutral" className="space-y-3 text-center">
          <p role="alert" className="text-sm font-bold text-rose-700">{displayError}</p>
          <Button onClick={() => setScreen(ROUTES.otp)}>Kembali ke OTP</Button>
        </Card>
      </ResponderScreen>
    );
  }

  if (!dashboard) {
    return (
      <ResponderScreen>
        <Card className="text-center text-sm font-semibold text-slate-600">Memuat dashboard demo...</Card>
      </ResponderScreen>
    );
  }

  return (
    <ResponderScreen scrollable>
      <ResponderIdentityCard identity={dashboard.responder} onExit={() => setScreen(ROUTES.quickExit)} />
      <StatusBanner />
      <AccessTimerCard durationLabel={dashboard.grant.durationLabel} remainingLabel={dashboard.grant.remainingLabel} />
      <ComfortNoteCard />

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-slate-900">Berkas Bukti ({dashboard.evidence.length})</h2>
          <button type="button" onClick={openEvidenceReview} className="active:scale-95">
            <Pill tone="success" icon={FileCheck2}>
              Cek Keaslian
            </Pill>
          </button>
        </div>

        <div className="space-y-2">
          {dashboard.evidence.map((item) => (
            <EvidenceRow key={item.id} item={item} onOpen={openEvidenceReview} />
          ))}
        </div>
      </section>
    </ResponderScreen>
  );
};
