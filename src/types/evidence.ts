export type EvidenceKind = 'photo' | 'audio' | 'document' | 'note';

export interface EvidenceRecord {
  id: string;
  title: string;
  timestamp: string;
  sha256Hex: string;
  type?: EvidenceKind;
  cipherTextBase64?: string;
  ivBase64?: string;
}