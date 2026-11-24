// Konstanta, rute layar, dan data mock bersama untuk seluruh alur Pendamping (responder).
import { useVaultStore } from '../../store/useVaultStore';
import type { EvidenceItem } from '../../types/responder';

/** Tipe id layar, diambil langsung dari store agar rute selalu tervalidasi. */
export type ScreenId = Parameters<ReturnType<typeof useVaultStore.getState>['setScreen']>[0];

export const TOTAL_STEPS = 3;

export const ROUTES = {
  welcome: 's09-responder-welcome',
  quickExit: 's03-calculator',
  nfc: 's09b-responder-nfc',
  ocr: 's09c-responder-ocr',
  otp: 's13-responder-otp',
  dashboard: 's15-responder-dashboard',
  evidenceReview: 's16-evidence-review',
} as const satisfies Record<string, ScreenId>;

export const RESPONDER = {
  initials: 'SK',
  name: 'Sari Kusuma, S.H.',
  institution: 'LBH APIK',
  caseId: '#JA-2026-0419',
} as const;

export const ACCESS_GRANT = {
  durationLabel: '7 hari',
  modeLabel: 'hanya lihat',
  remainingLabel: '4 hari 22 jam 43 mnt',
} as const;

export const EVIDENCE_ITEMS: readonly EvidenceItem[] = [
  {
    id: 'photo-01',
    kind: 'photo',
    title: 'Foto Bukti #01',
    meta: '19 Nov 2026 · 21:14 · 2.4 MB',
    status: 'Terkunci aman · Siap ditinjau',
  },
  {
    id: 'audio-01',
    kind: 'audio',
    title: 'Rekaman Suara #01',
    meta: '19 Nov 2026 · 21:18 · 3 mnt',
    status: 'Terkunci aman · Siap didengar',
  },
  {
    id: 'document-01',
    kind: 'document',
    title: 'Visum RSUD Tarakan',
    meta: '20 Nov 2026 · 07:45',
    status: 'Dikirim dr. Ratna Dewi · RSUD',
  },
  {
    id: 'note-01',
    kind: 'note',
    title: 'Catatan Kronologi',
    meta: '20 Nov 2026 · 08:10',
    status: 'Ditulis penyintas · Terjaga utuh',
  },
];
