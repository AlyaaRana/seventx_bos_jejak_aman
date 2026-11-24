import React from 'react';
import { useVaultStore } from './store/useVaultStore';
import { useQuickExit } from './hooks/useQuickExit';
import type { ScreenRoute } from './types/navigation';

import { WelcomeScreen } from './features/onboarding/WelcomeScreen';
import { SetupPinScreen } from './features/onboarding/SetupPinScreen';
import { CalculatorDisguise } from './features/auth-disguise/CalculatorDisguise';
import { VaultHome } from './features/vault/VaultHome';
import { CapturePhotoScreen } from './features/vault/CapturePhotoScreen';
import { RecordAudioScreen } from './features/vault/RecordAudioScreen';
import { PickFileScreen } from './features/vault/PickFileScreen';
import { WriteNoteScreen } from './features/vault/WriteNoteScreen';
import { OfflineQueueScreen } from './features/vault/OfflineQueueScreen';
import { EvidenceHistoryScreen } from './features/vault/EvidenceHistoryScreen';

import { FindResponderScreen } from './features/consent-access/FindResponderScreen';
import { AccessHistoryScreen } from './features/consent-access/AccessHistoryScreen';
import { ShareConsentScreen } from './features/consent-access/ShareConsentScreen';
import { ConsentGrantedScreen } from './features/consent-access/ConsentGrantedScreen';

import { ResponderWelcomeScreen } from './features/responder/ResponderWelcomeScreen';
import { ResponderNfcScanScreen } from './features/responder/ResponderNfcScanScreen';
import { ResponderOcrScanScreen } from './features/responder/ResponderOcrScanScreen';
import { ResponderOtpConfirmScreen } from './features/responder/ResponderOtpConfirmScreen';
import { ResponderDashboardScreen } from './features/responder/ResponderDashboardScreen';
import { ResponderEvidenceReviewScreen } from './features/responder/ResponderEvidenceReviewScreen';

import { HelpCenterScreen } from './features/help/HelpCenterScreen';
import { SettingsScreen } from './features/settings/SettingsScreen';
import { QuickExitFAB } from './components/shared/QuickExitFAB';

const RESPONDER_ROUTES: ScreenRoute[] = [
  's09-responder-welcome',
  's09b-responder-nfc',
  's09c-responder-ocr',
  's13-responder-otp',
  's15-responder-dashboard',
  's16-evidence-review',
];

export const App: React.FC = () => {
  const { screen, hasSetupPin, isVaultUnlocked } = useVaultStore();

  useQuickExit();

  const renderScreen = () => {
    switch (screen) {
      case 's01-welcome':
        return <WelcomeScreen />;
      case 's02-setup-pin':
        return <SetupPinScreen />;
      case 's03-calculator':
        return <CalculatorDisguise />;
      case 's04-vault-home':
        return <VaultHome />;
      case 's05-capture-photo':
        return <CapturePhotoScreen />;
      case 's06-record-audio':
        return <RecordAudioScreen />;
      case 's06b-pick-file':
        return <PickFileScreen />;
      case 's06c-write-note':
        return <WriteNoteScreen />;
      case 's07-offline-queue':
        return <OfflineQueueScreen />;
      case 's08-evidence-history':
        return <EvidenceHistoryScreen />;
      case 's09-responder-welcome':
        return <ResponderWelcomeScreen />;
      case 's09b-responder-nfc':
        return <ResponderNfcScanScreen />;
      case 's09c-responder-ocr':
        return <ResponderOcrScanScreen />;
      case 's10-find-responder':
        return <FindResponderScreen />;
      case 's11-access-history':
        return <AccessHistoryScreen />;
      case 's12-share-consent':
        return <ShareConsentScreen />;
      case 's13-responder-otp':
        return <ResponderOtpConfirmScreen />;
      case 's14-consent-granted':
        return <ConsentGrantedScreen />;
      case 's15-responder-dashboard':
        return <ResponderDashboardScreen />;
      case 's16-evidence-review':
        return <ResponderEvidenceReviewScreen />;
      case 's18-help-center':
        return <HelpCenterScreen />;
      case 's19-settings':
        return <SettingsScreen />;
      default:
        return <VaultHome />;
    }
  };

  if (RESPONDER_ROUTES.includes(screen)) {
    return renderScreen();
  }

  if (!hasSetupPin) {
    if (screen === 's02-setup-pin') return <SetupPinScreen />;
    return <WelcomeScreen />;
  }

  if (!isVaultUnlocked || screen === 's03-calculator') {
    return <CalculatorDisguise />;
  }

  return (
    <>
      {renderScreen()}
      <QuickExitFAB />
    </>
  );
};

export default App;