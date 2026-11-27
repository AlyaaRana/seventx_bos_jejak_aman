// Layar langkah 3/3: Simulasi konfirmasi OTP sebelum membuka dashboard pendamping.
import React, { useCallback, useEffect, useState } from 'react';
import { Delete, Mail, ShieldCheck } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import { ACCESS_GRANT, ROUTES } from './responderData';
import { responderApi } from './responderApi';
import { ResponderStepHeader } from './ResponderStepHeader';
import { Button, Card, ResponderScreen } from './ResponderUi';
import { cx } from './responderUtils';
import './responder-animations.css';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 42;
const KEYPAD_DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const MISSING_IDENTITY_MESSAGE = 'Data identitas belum tersedia. Ulangi pemindaian e-KTP.';

type KeyTone = 'digit' | 'action';

const KEY_TONES: Record<KeyTone, string> = {
  digit: 'border-[#EAE2D3] border-b-[#D9CFBC] bg-white text-[#2A2438]',
  action: 'border-[#E5DDCC] border-b-[#D4C9B3] bg-[#EFE9DD] text-[#1E1B4B]',
};

const formatCountdown = (totalSeconds: number): string =>
  `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;

const getBoxTone = (isFilled: boolean, isCurrent: boolean): string => {
  if (isFilled) return 'border-emerald-400 bg-emerald-50';
  if (isCurrent) return 'border-[#1E1B4B] bg-white shadow-[0_0_0_4px_rgba(30,27,75,0.1)]';
  return 'border-[#EAE2D3] bg-white';
};

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
      'flex h-12 items-center justify-center rounded-2xl border border-b-[3px] text-lg font-bold',
      'transition-all duration-100 active:translate-y-[2px] active:border-b',
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

  const appendDigit = useCallback(
    (digit: string) => setOtp((prev) => (prev.length < OTP_LENGTH ? prev + digit : prev)),
    [],
  );
  const removeLastDigit = useCallback(() => setOtp((prev) => prev.slice(0, -1)), []);
  const clearOtp = () => setOtp('');

  const requestOtp = useCallback(async () => {
    if (!identity) {
      setErrorMessage(MISSING_IDENTITY_MESSAGE);
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

  // Minta OTP otomatis saat layar dibuka, selama belum ada tantangan aktif.
  useEffect(() => {
    if (identity && !otpChallenge) void requestOtp();
  }, [identity, otpChallenge, requestOtp]);

  // Hitung mundur berjalan terus supaya tombol ulang tetap muncul walau permintaan pertama gagal.
  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  // Papan ketik fisik ikut bekerja (berguna saat demo di desktop).
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) appendDigit(event.key);
      else if (event.key === 'Backspace') removeLastDigit();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appendDigit, removeLastDigit]);

  const resendCode = async () => {
    setOtp('');
    await requestOtp();
  };

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

  const grantSummary = [ACCESS_GRANT.durationLabel, ACCESS_GRANT.modeLabel].join(' · ');
  const displayError = errorMessage ?? (identity ? null : MISSING_IDENTITY_MESSAGE);

  const submitButton = (
    <Button
      icon={ShieldCheck}
      disabled={!isOtpComplete || isVerifying || !otpChallenge}
      onClick={() => void verifyOtp()}
    >
      {isVerifying ? 'Memverifikasi...' : `Berikan izin ${ACCESS_GRANT.durationLabel}`}
    </Button>
  );

  return (
    <ResponderScreen
      scrollable
      header={<ResponderStepHeader step={3} title="Konfirmasi Izin" backTarget={ROUTES.ocr} />}
      footer={submitButton}
    >
      <Card className="flex items-center gap-3 py-3">
        <span className="flex h-11 w-11 shrink-0 -rotate-3 items-center justify-center rounded-2xl bg-[#D8F3E4] text-[#14532D]">
          <ShieldCheck size={21} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[15px] font-extrabold">{identity?.institution ?? 'Pendamping'}</h2>
          <p className="text-[12px] text-[#7B7389]">{grantSummary}</p>
        </div>
      </Card>

      <section className="my-auto flex flex-col items-center gap-2 text-center">
        <h2 className="text-lg font-extrabold">{isRequesting ? 'Menyiapkan OTP demo...' : 'Masukkan OTP demo'}</h2>
        <p className="max-w-[270px] text-[13px] leading-relaxed text-[#6B6480]">
          Backend email belum terhubung. Masukkan 6 digit angka apa saja untuk melanjutkan simulasi.
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFE9DD] px-3 py-1 text-[13px] font-bold text-[#1E1B4B]">
          <Mail size={13} />
          {otpChallenge?.maskedEmail ?? 'OTP simulasi · belum terkirim ke email'}
        </span>
        {displayError && (
          <p role="alert" className="text-[12px] font-semibold text-rose-700">
            {displayError}
          </p>
        )}

        <div
          className="flex justify-center gap-2 pt-3"
          aria-label={`Kode OTP, ${otp.length} dari ${OTP_LENGTH} digit terisi`}
        >
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
                {isFilled
                  ? otp[index]
                  : isCurrent && <span aria-hidden className="rp-caret h-6 w-0.5 rounded-full bg-[#1E1B4B]" />}
              </div>
            );
          })}
        </div>

        <div className="pt-1">
          {secondsLeft > 0 ? (
            <p className="text-[12px] text-[#7B7389]">
              Ulangi simulasi dalam{' '}
              <span className="font-bold tabular-nums text-[#2A2438]">{formatCountdown(secondsLeft)}</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={() => void resendCode()}
              disabled={isRequesting}
              className="text-[13px] font-bold text-[#D9552F] hover:underline disabled:opacity-50"
            >
              {isRequesting ? 'Menyiapkan OTP...' : 'Ulangi simulasi OTP'}
            </button>
          )}
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[300px] grid-cols-3 gap-2.5">
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
    </ResponderScreen>
  );
};