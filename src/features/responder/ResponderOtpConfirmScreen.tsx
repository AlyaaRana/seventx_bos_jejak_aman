// Layar langkah 3/3: Simulasi konfirmasi OTP sebelum membuka dashboard pendamping.
import React, { useCallback, useEffect, useState } from 'react';
import { Delete, Mail, ShieldCheck } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ACCESS_GRANT, ROUTES } from './responderData';
import { responderApi } from './responderApi';
import { ResponderStepHeader } from './ResponderStepHeader';
import { Button, Card, Pill, ResponderScreen } from './ResponderUi';
import { cx } from './responderUtils';
import './responder-animations.css';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 42;
const KEYPAD_DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

type KeyTone = 'digit' | 'action';

const KEY_TONES: Record<KeyTone, string> = {
  digit: 'border border-purple-100 bg-white text-slate-800 shadow-sm',
  action: 'bg-purple-50 text-purple-700',
};

const formatCountdown = (totalSeconds: number): string =>
  `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;

function getBoxTone(isFilled: boolean, isCurrent: boolean): string {
  if (isFilled) return 'border-emerald-400 bg-emerald-50 text-slate-900';
  if (isCurrent) return 'border-[#3048D9] bg-white shadow-[0_0_0_4px_rgba(48,72,217,0.12)]';
  return 'border-purple-100 bg-white';
}

interface KeypadKeyProps {
  children: React.ReactNode;
  onClick: () => void;
  tone?: KeyTone;
  label?: string;
}

const KeypadKey: React.FC<KeypadKeyProps> = ({ children, onClick, tone = 'digit', label }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={cx(
      'flex h-12 items-center justify-center rounded-2xl text-lg font-bold transition-all active:scale-95',
      KEY_TONES[tone],
    )}
  >
    {children}
  </button>
);

export const ResponderOtpConfirmScreen: React.FC = () => {
  const { setScreen, responderFlowSession, updateResponderFlowSession } = useVaultStore();
  const { identity, otpChallenge } = responderFlowSession;
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isRequesting, setIsRequesting] = useState(Boolean(identity && !otpChallenge));
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isOtpComplete = otp.length === OTP_LENGTH;

  const appendDigit = useCallback((digit: string) => setOtp((prev) => (prev.length < OTP_LENGTH ? prev + digit : prev)), []);
  const removeLastDigit = useCallback(() => setOtp((prev) => prev.slice(0, -1)), []);
  const clearOtp = () => setOtp('');

  const requestOtp = useCallback(async () => {
    if (!identity) {
      setErrorMessage('Data identitas belum tersedia. Ulangi pemindaian e-KTP.');
      return;
    }

    setIsRequesting(true);
    setErrorMessage(null);
    try {
      const challenge = await responderApi.requestConsentOtp({
        responderId: identity.responderId,
        caseId: identity.caseId,
        duration: '7d',
      });
      updateResponderFlowSession({ otpChallenge: challenge });
      setSecondsLeft(RESEND_SECONDS);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Tidak dapat menyiapkan OTP demo.');
    } finally {
      setIsRequesting(false);
    }
  }, [identity, updateResponderFlowSession]);

  useEffect(() => {
    if (!identity || otpChallenge) return;
    let isActive = true;

    void responderApi
      .requestConsentOtp({
        responderId: identity.responderId,
        caseId: identity.caseId,
        duration: '7d',
      })
      .then((challenge) => {
        if (!isActive) return;
        updateResponderFlowSession({ otpChallenge: challenge });
        setSecondsLeft(RESEND_SECONDS);
      })
      .catch((error: unknown) => {
        if (isActive) setErrorMessage(error instanceof Error ? error.message : 'Tidak dapat menyiapkan OTP demo.');
      })
      .finally(() => {
        if (isActive) setIsRequesting(false);
      });

    return () => {
      isActive = false;
    };
  }, [identity, otpChallenge, updateResponderFlowSession]);

  const resendCode = async () => {
    setOtp('');
    await requestOtp();
  };

  useEffect(() => {
    if (!otpChallenge || secondsLeft === 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [otpChallenge, secondsLeft]);

  // Papan ketik fisik ikut bekerja (berguna saat demo di desktop).
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) appendDigit(event.key);
      else if (event.key === 'Backspace') removeLastDigit();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appendDigit, removeLastDigit]);

  const grantSummary = [ACCESS_GRANT.durationLabel, ACCESS_GRANT.modeLabel].join(' · ');
  const displayError = errorMessage ?? (!identity ? 'Data identitas belum tersedia. Ulangi pemindaian e-KTP.' : null);

  const verifyOtp = async () => {
    if (!identity || !otpChallenge || !isOtpComplete) return;
    setIsVerifying(true);
    setErrorMessage(null);
    try {
      const grant = await responderApi.verifyConsentOtp({
        challengeId: otpChallenge.challengeId,
        otpCode: otp,
        responderId: identity.responderId,
        duration: '7d',
      });
      updateResponderFlowSession({ grant });
      setScreen(ROUTES.dashboard);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Verifikasi OTP demo gagal.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <ResponderScreen>
      <ResponderStepHeader step={3} title="Konfirmasi Izin" backTarget={ROUTES.ocr} />

      <Card className="flex items-center gap-3 py-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <ShieldCheck size={21} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[15px] font-extrabold text-slate-900">{identity?.institution ?? 'Pendamping'}</h1>
          <p className="text-[12px] text-slate-500">{grantSummary}</p>
        </div>
        <Pill tone="success">Konfirmasi izin</Pill>
      </Card>

      <section className="flex flex-1 flex-col items-center justify-center gap-2 py-1 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
          <Mail size={22} strokeWidth={1.8} />
        </span>
        <h2 className="text-lg font-extrabold text-slate-900">{isRequesting ? 'Menyiapkan OTP demo...' : 'Masukkan OTP demo'}</h2>
        <p className="max-w-[270px] text-[13px] leading-relaxed text-slate-600">
          Backend email belum terhubung. Masukkan 6 digit angka apa saja untuk melanjutkan simulasi.
        </p>
        <span className="rounded-full bg-purple-50 px-3 py-1 text-[13px] font-bold text-purple-800">
          {otpChallenge?.maskedEmail ?? 'OTP simulasi · belum terkirim ke email'}
        </span>
        {displayError && <p role="alert" className="text-[12px] font-semibold text-rose-700">{displayError}</p>}

        <div className="flex justify-center gap-2 pt-3" aria-label={`Kode OTP, ${otp.length} dari ${OTP_LENGTH} digit terisi`}>
          {Array.from({ length: OTP_LENGTH }, (_, index) => {
            const isFilled = Boolean(otp[index]);
            const isCurrent = index === otp.length;

            return (
              <div
                key={index}
                className={cx(
                  'flex h-14 w-11 items-center justify-center rounded-2xl border-2 text-xl font-extrabold transition-all',
                  getBoxTone(isFilled, isCurrent),
                )}
              >
                {isFilled ? otp[index] : isCurrent && <span aria-hidden className="rp-caret h-6 w-0.5 rounded-full bg-[#3048D9]" />}
              </div>
            );
          })}
        </div>

        <div className="pt-1">
          {secondsLeft > 0 ? (
            <p className="text-[12px] text-slate-500">
              Ulangi simulasi dalam <span className="font-bold tabular-nums text-slate-700">{formatCountdown(secondsLeft)}</span>
            </p>
          ) : (
            <button type="button" onClick={() => void resendCode()} disabled={isRequesting} className="text-[13px] font-bold text-[#3048D9] hover:underline disabled:opacity-50">
              {isRequesting ? 'Menyiapkan OTP...' : 'Ulangi simulasi OTP'}
            </button>
          )}
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[300px] grid-cols-3 gap-2.5 pb-1">
        {KEYPAD_DIGITS.map((digit) => (
          <KeypadKey key={digit} onClick={() => appendDigit(digit)}>
            {digit}
          </KeypadKey>
        ))}
        <KeypadKey tone="action" label="Hapus semua digit" onClick={clearOtp}>
          <span className="text-[13px]">Hapus</span>
        </KeypadKey>
        <KeypadKey onClick={() => appendDigit('0')}>0</KeypadKey>
        <KeypadKey tone="action" label="Hapus satu digit" onClick={removeLastDigit}>
          <Delete size={18} />
        </KeypadKey>
      </div>

      <Button icon={ShieldCheck} disabled={!isOtpComplete || isVerifying || !otpChallenge} onClick={() => void verifyOtp()}>
        {isVerifying ? 'Memverifikasi...' : `Berikan izin ${ACCESS_GRANT.durationLabel}`}
      </Button>
    </ResponderScreen>
  );
};
