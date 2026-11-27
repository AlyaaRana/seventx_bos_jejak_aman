import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { QuickExitFAB } from '../../components/shared/QuickExitFAB';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import '../../styles/cute-animations.css';
import '../../styles/home-motion.css';

import { HUG_REPLIES, MOODS, NEUTRAL_MESSAGE, SOOTHING_QUOTES } from './home/constants';
import { useAmbientSound } from './home/hooks/useAmbientSound';
import { useCalmGarden } from './home/hooks/useCalmGarden';
import { useHugBurst } from './home/hooks/useHugBurst';
import type { Mood } from './home/types';
import { toEvidencePreviews } from './home/utils';
import { vaultApi } from './vaultApi';

import { ActionGrid } from './home/components/ActionGrid';
import { ActivityStrip } from './home/components/ActivityStrip';
import { AmbientSoundBar } from './home/components/AmbientSoundBar';
import { BreathingModal } from './home/components/BreathingModal';
import { CallConfirmModal } from './home/components/CallConfirmModal';
import { CalmGarden } from './home/components/CalmGarden';
import { CalmSpace } from './home/components/CalmSpace';
import { EvidenceTimeline } from './home/components/EvidenceTimeline';
import { HeroCard } from './home/components/HeroCard';
import { HomeHeader } from './home/components/HomeHeader';
import { MoodSupport } from './home/components/MoodSupport';
import { QuoteModal } from './home/components/QuoteModal';

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
  const { hearts, burst } = useHugBurst();

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
    <MobileContainer className="relative flex h-[100dvh] flex-col overflow-hidden bg-[#F5F0E6] font-sans text-[#2A2438]">
      <QuickExitFAB />

      <main className="relative z-10 min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 pb-10 pt-5">
        <HomeHeader />

        <ActivityStrip
          evidenceCount={evidence.length}
          onOpenHistory={() => setScreen('s08-evidence-history')}
          onOpenQueue={() => setScreen('s07-offline-queue')}
        />

        <HeroCard
          mood={mood}
          message={message}
          hearts={hearts}
          onMoodChange={handleMoodChange}
          onHug={handleHug}
          onOpenBreathing={() => setModal('breathing')}
          onOpenQuote={() => setModal('quote')}
          onCall={() => setModal('call')}
        />

        <MoodSupport
          mood={mood}
          onOpenBreathing={() => setModal('breathing')}
          onOpenQuote={() => setModal('quote')}
          onCall={() => setModal('call')}
        />

        {evidenceError && (
          <p role="alert" className="text-center text-xs font-semibold text-rose-700">
            {evidenceError}
          </p>
        )}

        <ActionGrid onNavigate={setScreen} />

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