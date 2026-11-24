// Store Zustand terpusat untuk menyimpan peran aktif, PIN rahasia, status unlock brankas, rute layar aktif, dan daftar bukti.
import { create } from 'zustand';
import type { EvidenceRecord } from '../types/evidence';
import type { ScreenRoute } from '../types/navigation';
import type { ResponderFlowSession } from '../types/responder';

export type UserRole = 'survivor' | 'responder';

interface VaultState {
  role: UserRole;
  hasSetupPin: boolean;
  secretPin: string;
  isVaultUnlocked: boolean;
  screen: ScreenRoute;
  evidenceList: EvidenceRecord[];
  responderFlowSession: ResponderFlowSession;
  setRole: (role: UserRole) => void;
  setScreen: (screen: ScreenRoute) => void;
  setEvidenceList: (items: EvidenceRecord[]) => void;
  updateResponderFlowSession: (session: Partial<ResponderFlowSession>) => void;
  clearResponderFlowSession: () => void;
  setupNewPin: (newPin: string) => void;
  unlockVaultWithPIN: (enteredPin: string) => boolean;
  lockVault: () => void;
  addEvidence: (item: EvidenceRecord) => void;
}

const createEmptyResponderFlowSession = (): ResponderFlowSession => ({
  nfcScanId: null,
  identity: null,
  otpChallenge: null,
  grant: null,
});

export const useVaultStore = create<VaultState>((set, get) => ({
  role: 'survivor',
  hasSetupPin: false, // Default false agar pengguna pertama kali masuk ke S01 & S02
  secretPin: '1407',
  isVaultUnlocked: false,
  screen: 's01-welcome',
  responderFlowSession: createEmptyResponderFlowSession(),
  evidenceList: [],
  setRole: (role) =>
    set((state) => ({
      role,
      isVaultUnlocked: role === 'survivor' ? state.isVaultUnlocked : false,
      screen: role === 'responder' ? 's09-responder-welcome' : 's01-welcome',
      responderFlowSession: createEmptyResponderFlowSession(),
    })),
  setScreen: (screen) => set({ screen }),
  setEvidenceList: (items) => set({ evidenceList: items }),
  updateResponderFlowSession: (session) =>
    set((state) => ({ responderFlowSession: { ...state.responderFlowSession, ...session } })),
  clearResponderFlowSession: () => set({ responderFlowSession: createEmptyResponderFlowSession() }),
  setupNewPin: (newPin) => {
    set({
      role: 'survivor',
      secretPin: newPin,
      hasSetupPin: true,
      isVaultUnlocked: true,
      screen: 's04-vault-home',
    });
  },
  unlockVaultWithPIN: (enteredPin) => {
    if (enteredPin === get().secretPin) {
      set({ role: 'survivor', isVaultUnlocked: true, screen: 's04-vault-home' });
      return true;
    }
    return false;
  },
  lockVault: () => set({ isVaultUnlocked: false, screen: 's03-calculator' }),
  addEvidence: (item) =>
    set((state) => ({ evidenceList: [item, ...state.evidenceList] })),
}));