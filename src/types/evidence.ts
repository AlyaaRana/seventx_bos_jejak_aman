export interface EvidenceRecord {
  id: string;
  title: string;
  timestamp: string;
  sha256Hex: string;
  cipherTextBase64?: string;
  ivBase64?: string;
}