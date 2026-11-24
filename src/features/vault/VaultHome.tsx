import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { QuickExitFAB } from '../../components/shared/QuickExitFAB';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { useHeartBurst } from '../../hooks/useHeartBurst';
import '../../styles/cute-animations.css';

import { HUG_REPLIES, MOODS, NEUTRAL_MESSAGE, SOOTHING_QUOTES } from './home/constants';
import { useAmbientSound } from './home/hooks/useAmbientSound';
import { useCalmGarden } from './home/hooks/useCalmGarden';
import type { Mood } from './home/types';
import { toEvidencePreviews } from './home/utils';
import { vaultApi } from './vaultApi';

import { ActionGrid } from './home/components/ActionGrid';
import { AmbientBackdrop } from './home/components/AmbientBackdrop';
import { AmbientSoundBar } from './home/components/AmbientSoundBar';
import { BreathingModal } from './home/components/BreathingModal';
import { CallConfirmModal } from './home/components/CallConfirmModal';
import { CalmGarden } from './home/components/CalmGarden';
import { CalmSpace } from './home/components/CalmSpace';
import { EvidenceTimeline } from './home/components/EvidenceTimeline';
import { GreetingHeader } from './home/components/GreetingHeader';
import { MascotCard } from './home/components/MascotCard';
import { MoodSupport } from './home/components/MoodSupport';
import { QuoteModal } from './home/components/QuoteModal';
import { VaultStatusCard } from './home/components/VaultStatusCard';

type ActiveModal = 'quote' | 'breathing' | 'call' | null;

export const VaultHome: React.FC = () => {
  const { evidenceList, setScreen, setEvidenceList } = useVaultStore();
  const [evidenceError, setEvidenceError] = useState<string | null>(null);

  // Belum ada suasana hati terpilih: Home tidak berasumsi apa pun tentang perasaan korban.
  const [mood, setMood] = useState<Mood | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [hugCount, setHugCount] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [modal, setModal] = useState<ActiveModal>(null);

  const { sound, pending, select, confirm, cancel } = useAmbientSound();
  const { blooms, plant } = useCalmGarden();
  const { particles, burst } = useHeartBurst();

  useEffect(() => {
    let isActive = true;
    void vaultApi
      .listEvidence()
      .then((items) => {
        if (isActive) setEvidenceList(items);
      })
      .catch((error: unknown) => {
        if (isActive) setEvidenceError(error instanceof Error ? error.message : 'Bukti gagal dimuat.');
      });
    return () => {
      isActive = false;
    };
  }, [setEvidenceList]);

  const evidence = useMemo(() => toEvidencePreviews(evidenceList), [evidenceList]);

  const closeModal = useCallback(() => setModal(null), []);

  const handleHug = () => {
    burst();
    plant();
    setReply(HUG_REPLIES[hugCount % HUG_REPLIES.length]);
    setHugCount((count) => count + 1);
  };

  /** Mengetuk suasana hati yang sama sekali lagi mengembalikan Home ke keadaan netral. */
  const handleMoodChange = (next: Mood) => {
    setMood((current) => (current === next ? null : next));
    setReply(null);
  };

  const handleNextQuote = () => {
    setQuoteIndex((index) => (index + 1) % SOOTHING_QUOTES.length);
    plant();
  };

  const message = reply ?? (mood ? MOODS[mood].message : NEUTRAL_MESSAGE);

  return (
    <MobileContainer className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-gradient-to-b from-[#F7F5FF] via-[#F3F6FF] to-[#FFF7F8] font-sans text-slate-800">
      <QuickExitFAB />
      <AmbientBackdrop mood={mood} />
      <GreetingHeader />

      <main className="relative z-10 flex-1 space-y-3.5 overflow-y-auto px-5 pb-4 pt-1">
        <MascotCard
          mood={mood}
          message={message}
          particles={particles}
          onMoodChange={handleMoodChange}
          onHug={handleHug}
          onOpenQuote={() => setModal('quote')}
        />

        <MoodSupport
          mood={mood}
          onOpenBreathing={() => setModal('breathing')}
          onOpenQuote={() => setModal('quote')}
          onCall={() => setModal('call')}
        />

        {evidenceError && <p role="alert" className="text-center text-xs font-semibold text-rose-700">{evidenceError}</p>}

        <ActionGrid onNavigate={setScreen} />

        <VaultStatusCard
          evidenceCount={evidence.length}
          onOpenQueue={() => setScreen('s07-offline-queue')}
          onOpenBreathing={() => setModal('breathing')}
        />

        <EvidenceTimeline items={evidence} onOpenHistory={() => setScreen('s08-evidence-history')} />

        <CalmSpace bloomCount={blooms.length} isSoundOn={sound !== 'off'}>
          <AmbientSoundBar
            sound={sound}
            pending={pending}
            onSelect={select}
            onConfirm={confirm}
            onCancel={cancel}
          />
          <CalmGarden blooms={blooms} onWater={plant} />
        </CalmSpace>
      </main>

      {modal === 'quote' && (
        <QuoteModal quote={SOOTHING_QUOTES[quoteIndex]} onNext={handleNextQuote} onClose={closeModal} />
      )}
      {modal === 'breathing' && <BreathingModal onClose={closeModal} onCycleComplete={plant} />}
      {modal === 'call' && <CallConfirmModal onClose={closeModal} />}

      <BottomNavbar />
    </MobileContainer>
  );
};
