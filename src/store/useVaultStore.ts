// Store Zustand terpusat untuk menyimpan peran aktif, PIN rahasia, status unlock brankas, rute layar aktif, dan daftar bukti.
import { create } from 'zustand';
import type { EvidenceRecord } from '../types/evidence';
import type { ScreenRoute } from '../types/navigation';

export type UserRole = 'survivor' | 'responder';

interface VaultState {
  role: UserRole;
  hasSetupPin: boolean;
  secretPin: string;
  isVaultUnlocked: boolean;
  screen: ScreenRoute;
  evidenceList: EvidenceRecord[];
  setRole: (role: UserRole) => void;
  setScreen: (screen: ScreenRoute) => void;
  setupNewPin: (newPin: string) => void;
  unlockVaultWithPIN: (enteredPin: string) => boolean;
  lockVault: () => void;
  addEvidence: (item: EvidenceRecord) => void;
}

export const useVaultStore = create<VaultState>((set, get) => ({
  role: 'survivor',
  hasSetupPin: false, // Default false agar pengguna pertama kali masuk ke S01 & S02
  secretPin: '1407',
  isVaultUnlocked: false,
  screen: 's01-welcome',
  evidenceList: [
    {
      id: '1',
      title: 'Foto Bukti #01',
      timestamp: '19 Nov · 21:14',
      sha256Hex: 'c178d0bf67dd4a21e5e619832fa60000',
    },
    {
      id: '2',
      title: 'Rekaman Suara #01',
      timestamp: '19 Nov · 21:18',
      sha256Hex: 'c72d16905b953304fd85f604c178d0bf',
    },
  ],
  setRole: (role) =>
    set((state) => ({
      role,
      isVaultUnlocked: role === 'survivor' ? state.isVaultUnlocked : false,
      screen: role === 'responder' ? 's09a-responder-method' : 's01-welcome',
    })),
  setScreen: (screen) => set({ screen }),
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