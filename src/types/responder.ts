import type { EvidenceKind } from './evidence';

export type { EvidenceKind } from './evidence';

export interface EvidenceItem {
  id: string;
  kind: EvidenceKind;
  title: string;
  meta: string;
  status: string;
}

export interface ResponderIdentity {
  responderId: string;
  initials: string;
  name: string;
  institution: string;
  caseId: string;
  maskedNik: string;
}

export interface NfcScanResult {
  scanId: string;
  detectedAtIso: string;
}

export interface OtpChallenge {
  challengeId: string;
  maskedEmail: string;
  expiresAtIso: string;
}

export interface AccessGrant {
  grantId: string;
  durationLabel: string;
  modeLabel: string;
  remainingLabel: string;
  expiresAtIso: string;
}

export interface HashEvent {
  label: string;
  value: string;
}

export interface EvidenceIntegrityResult {
  evidenceId: string;
  fingerprint: string;
  isValid: boolean;
  events: HashEvent[];
}

export interface EvidenceRequestResult {
  requestId: string;
  status: 'pending';
}

export interface ResponderDashboardData {
  responder: ResponderIdentity;
  grant: AccessGrant;
  evidence: EvidenceItem[];
}

export interface ResponderFlowSession {
  nfcScanId: string | null;
  identity: ResponderIdentity | null;
  otpChallenge: OtpChallenge | null;
  grant: AccessGrant | null;
}
