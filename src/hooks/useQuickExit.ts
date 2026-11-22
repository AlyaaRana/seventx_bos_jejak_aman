import { useEffect, useCallback } from 'react';
import { useVaultStore } from '../store/useVaultStore';

export const useQuickExit = () => {
  const { lockVault, setScreen } = useVaultStore();

  const executeQuickExit = useCallback(() => {
    lockVault();
    setScreen('s03-calculator');
    sessionStorage.clear();
  }, [lockVault, setScreen]);

  useEffect(() => {
    // =========================================================================
    // DIKOMENTAR SEMENTARA BIAR GAK AUTO-BACK PAS EDIT UI / PINDAH WINDOW VSCODE
    // =========================================================================
    /*
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        executeQuickExit();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', executeQuickExit);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', executeQuickExit);
    };
    */
  }, [executeQuickExit]);

  return { executeQuickExit };
};