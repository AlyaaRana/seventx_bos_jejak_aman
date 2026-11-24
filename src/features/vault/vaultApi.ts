import type { EvidenceKind, EvidenceRecord } from '../../types/evidence';

/*
 * Kontrak backend Vault yang diusulkan (path dapat disesuaikan bersama tim backend):
 * - POST /api/vault/evidence untuk menyimpan metadata + payload yang sudah dienkripsi klien.
 * - GET /api/vault/evidence untuk riwayat bukti.
 * - GET /api/vault/evidence/{id}/integrity untuk memeriksa hash/rantai integritas.
 * - GET /api/vault/sync-queue dan POST /api/vault/sync-queue/retry untuk antrean offline.
 * Jangan kirim catatan, foto, audio, atau berkas dalam bentuk plaintext.
 */
export interface EncryptedEvidencePayload {
  cipherTextBase64: string;
  ivBase64: string;
}

export interface NewEvidenceInput {
  title: string;
  type: EvidenceKind;
  encryptedPayload?: EncryptedEvidencePayload;
}

export interface SyncQueueItem {
  evidenceId: string;
  title: string;
  status: 'queued' | 'uploading' | 'synced';
  progress: number;
}

export interface EvidenceIntegrityCheck {
  evidenceId: string;
  isValid: boolean;
  checkedAtIso: string;
  isDemo: true;
}

export interface SyncQueueResult {
  syncedCount: number;
  items: SyncQueueItem[];
}

export interface VaultApi {
  listEvidence(): Promise<EvidenceRecord[]>;
  saveEvidence(input: NewEvidenceInput): Promise<EvidenceRecord>;
  checkEvidenceIntegrity(evidenceId: string): Promise<EvidenceIntegrityCheck>;
  listSyncQueue(): Promise<SyncQueueItem[]>;
  retrySyncQueue(wifiOnly: boolean): Promise<SyncQueueResult>;
}

const INITIAL_DEMO_EVIDENCE: readonly EvidenceRecord[] = [
  {
    id: '1',
    title: 'Foto Bukti #01',
    timestamp: '19 Nov · 21:14',
    sha256Hex: 'c178d0bf67dd4a21e5e619832fa60000',
    type: 'photo',
  },
  {
    id: '2',
    title: 'Rekaman Suara #01',
    timestamp: '19 Nov · 21:18',
    sha256Hex: 'c72d16905b953304fd85f604c178d0bf',
    type: 'audio',
  },
];

const MOCK_DELAY_MS = 250;
let nextEvidenceNumber = INITIAL_DEMO_EVIDENCE.length + 1;
const mockEvidence = INITIAL_DEMO_EVIDENCE.map((item) => ({ ...item }));
const mockQueue: SyncQueueItem[] = [
  { evidenceId: '1', title: 'Foto Bukti #01', status: 'queued', progress: 0 },
  { evidenceId: '2', title: 'Rekaman Suara #01', status: 'uploading', progress: 64 },
];

const waitForMockResponse = () => new Promise<void>((resolve) => window.setTimeout(resolve, MOCK_DELAY_MS));

export const mockVaultApi: VaultApi = {
  async listEvidence() {
    await waitForMockResponse();
    return mockEvidence.map((item) => ({ ...item }));
  },

  async saveEvidence(input) {
    await waitForMockResponse();
    const id = `demo-evidence-${nextEvidenceNumber++}`;
    const now = new Date();
    const record: EvidenceRecord = {
      id,
      title: input.title,
      timestamp: `Hari ini · ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`,
      sha256Hex: `demo-hash-${id}`,
      type: input.type,
      cipherTextBase64: input.encryptedPayload?.cipherTextBase64,
      ivBase64: input.encryptedPayload?.ivBase64,
    };
    mockEvidence.unshift(record);
    mockQueue.unshift({ evidenceId: id, title: input.title, status: 'queued', progress: 0 });
    return { ...record };
  },

  async checkEvidenceIntegrity(evidenceId) {
    await waitForMockResponse();
    if (!mockEvidence.some((item) => item.id === evidenceId)) throw new Error('Bukti tidak ditemukan.');
    return { evidenceId, isValid: true, checkedAtIso: new Date().toISOString(), isDemo: true };
  },

  async listSyncQueue() {
    await waitForMockResponse();
    return mockQueue.map((item) => ({ ...item }));
  },

  async retrySyncQueue(wifiOnly) {
    await waitForMockResponse();
    void wifiOnly;
    let syncedCount = 0;
    for (const item of mockQueue) {
      if (item.status !== 'synced') {
        item.status = 'synced';
        item.progress = 100;
        syncedCount += 1;
      }
    }
    return { syncedCount, items: mockQueue.map((item) => ({ ...item })) };
  },
};

// Ganti implementasi ini dengan adapter HTTP setelah backend tersedia.
export const vaultApi: VaultApi = mockVaultApi;
