import { ACCESS_GRANT, EVIDENCE_ITEMS, RESPONDER } from './responderData';
import type {
  AccessGrant,
  EvidenceIntegrityResult,
  EvidenceRequestResult,
  NfcScanResult,
  OtpChallenge,
  ResponderDashboardData,
  ResponderIdentity,
} from '../../types/responder';

type ConsentDuration = '24h' | '7d';

/*
 * Kontrak backend yang diusulkan (path dapat disesuaikan bersama tim backend):
 * - NFC: bridge Android lokal untuk membaca chip; bukan endpoint HTTP browser.
 * - POST /api/responders/identity/ocr: kirim scanId, terima data identitas hasil OCR.
 * - POST /api/consents/otp/request dan /api/consents/otp/verify.
 * - GET /api/responders/dashboard dan GET /api/cases/{caseId}/evidence.
 * - GET /api/evidence/{evidenceId}/integrity.
 * - POST /api/cases/{caseId}/evidence-requests.
 * Jangan kirim foto/NIK mentah atau OTP ke log. Jalur produksi perlu transport aman,
 * otorisasi server, dan persetujuan pengguna sebelum memproses data e-KTP.
 */
export interface ResponderApi {
  readEktpNfc(): Promise<NfcScanResult>;
  readEktpOcr(scanId: string): Promise<ResponderIdentity>;
  requestConsentOtp(params: {
    responderId: string;
    caseId: string;
    duration: ConsentDuration;
  }): Promise<OtpChallenge>;
  verifyConsentOtp(params: {
    challengeId: string;
    otpCode: string;
    responderId: string;
    duration: ConsentDuration;
  }): Promise<AccessGrant>;
  getDashboard(grantId: string): Promise<ResponderDashboardData>;
  listCaseEvidence(caseId: string): Promise<ResponderDashboardData['evidence']>;
  verifyEvidenceIntegrity(evidenceId: string): Promise<EvidenceIntegrityResult>;
  requestAdditionalEvidence(caseId: string, evidenceId: string): Promise<EvidenceRequestResult>;
}

const DEMO_SCAN_ID = 'scan-demo-01';
const DEMO_CHALLENGE_ID = 'challenge-demo-01';
const DEMO_GRANT_ID = 'grant-demo-01';
const MOCK_DELAY_MS = 350;

const waitForMockResponse = () => new Promise<void>((resolve) => window.setTimeout(resolve, MOCK_DELAY_MS));

const DEMO_IDENTITY: ResponderIdentity = {
  responderId: 'responder-demo-01',
  ...RESPONDER,
  maskedNik: '3174 08•• •••• 0001',
};

const DEMO_GRANT: AccessGrant = {
  grantId: DEMO_GRANT_ID,
  durationLabel: ACCESS_GRANT.durationLabel,
  modeLabel: ACCESS_GRANT.modeLabel,
  remainingLabel: ACCESS_GRANT.remainingLabel,
  expiresAtIso: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
};

export const mockResponderApi: ResponderApi = {
  async readEktpNfc() {
    await waitForMockResponse();
    return { scanId: DEMO_SCAN_ID, detectedAtIso: new Date().toISOString() };
  },

  async readEktpOcr(scanId) {
    await waitForMockResponse();
    if (scanId !== DEMO_SCAN_ID) throw new Error('Sesi NFC tidak ditemukan. Ulangi pemindaian e-KTP.');
    return { ...DEMO_IDENTITY };
  },

  async requestConsentOtp() {
    await waitForMockResponse();
    return {
      challengeId: DEMO_CHALLENGE_ID,
      maskedEmail: 'a***@mail.com',
      expiresAtIso: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    };
  },

  async verifyConsentOtp({ challengeId, otpCode }) {
    await waitForMockResponse();
    if (challengeId !== DEMO_CHALLENGE_ID) throw new Error('Sesi OTP tidak valid. Minta kode baru.');
    if (!/^\d{6}$/.test(otpCode)) throw new Error('Masukkan 6 digit OTP demo.');
    return { ...DEMO_GRANT, expiresAtIso: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() };
  },

  async getDashboard(grantId) {
    await waitForMockResponse();
    if (grantId !== DEMO_GRANT_ID) throw new Error('Izin akses tidak ditemukan. Verifikasi OTP terlebih dahulu.');
    return {
      responder: { ...DEMO_IDENTITY },
      grant: { ...DEMO_GRANT },
      evidence: [...EVIDENCE_ITEMS],
    };
  },

  async listCaseEvidence(caseId) {
    await waitForMockResponse();
    if (caseId !== RESPONDER.caseId) throw new Error('Data kasus tidak ditemukan.');
    return [...EVIDENCE_ITEMS];
  },

  async verifyEvidenceIntegrity(evidenceId) {
    await waitForMockResponse();
    if (!EVIDENCE_ITEMS.some((item) => item.id === evidenceId)) throw new Error('Bukti tidak ditemukan.');
    return {
      evidenceId,
      fingerprint: 'a38f...c721',
      isValid: true,
      events: [
        { label: 'Dicatat dari ponsel', value: '19 Nov · 21:14' },
        { label: 'Terkunci di server', value: '19 Nov · 21:15' },
      ],
    };
  },

  async requestAdditionalEvidence(caseId, evidenceId) {
    await waitForMockResponse();
    if (caseId !== RESPONDER.caseId || !EVIDENCE_ITEMS.some((item) => item.id === evidenceId)) {
      throw new Error('Kasus atau bukti tidak ditemukan.');
    }
    return { requestId: 'request-demo-01', status: 'pending' };
  },
};

// Ganti implementasi ini dengan adapter HTTP setelah endpoint backend tersedia.
export const responderApi: ResponderApi = mockResponderApi;
