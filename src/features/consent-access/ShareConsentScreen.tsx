import React, { useMemo, useState } from 'react';
import {
  Clock,
  Delete,
  Lock,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { QuickExitFAB } from '../../components/shared/QuickExitFAB';
import { useVaultStore } from '../../store/useVaultStore';

type DurationPreset = '24h' | '7d' | 'custom';

const KEYPAD_DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const PIN_SLOTS = [0, 1, 2, 3, 4, 5] as const;

const DURATION_OPTIONS: ReadonlyArray<{
  id: DurationPreset;
  label: string;
}> = [
  { id: '24h', label: '24 Jam' },
  { id: '7d', label: '7 Hari' },
  { id: 'custom', label: 'Atur Jam' },
];

export const ShareConsentScreen: React.FC = () => {
  const { setScreen, secretPin } = useVaultStore();

  const [durationPreset, setDurationPreset] = useState<DurationPreset>('7d');
  const [customHours, setCustomHours] = useState<string>('48');
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const durationLabel = useMemo(() => {
    if (durationPreset === '24h') return '24 Jam';
    if (durationPreset === '7d') return '7 Hari';
    const parsed = Number(customHours);
    const safeHours = Number.isFinite(parsed) && parsed > 0 ? parsed : 48;
    return `${safeHours} Jam`;
  }, [durationPreset, customHours]);

  const handleAppendDigit = (digit: string) => {
    setErrorMsg('');
    setPin((prev) => (prev.length < 6 ? prev + digit : prev));
  };

  const handleDeleteDigit = () => {
    setErrorMsg('');
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClearPin = () => {
    setErrorMsg('');
    setPin('');
  };

  const handleCustomHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '') {
      setCustomHours('');
      return;
    }
    const numeric = Number(raw);
    if (!Number.isNaN(numeric) && numeric >= 1 && numeric <= 720) {
      setCustomHours(String(Math.floor(numeric)));
    }
  };

  const handleSubmitConsent = () => {
    if (pin.length < 4) {
      setErrorMsg('Masukkan minimal 4 digit PIN persetujuan.');
      return;
    }

    const matchesStoredPin = pin === secretPin;
    const isFullSixDigitPin = pin.length === 6;

    if (!matchesStoredPin && !isFullSixDigitPin) {
      setErrorMsg('PIN persetujuan belum sesuai. Silakan coba lagi.');
      return;
    }

    setScreen('s14-consent-granted');
  };

  const isSubmitDisabled = pin.length < 4;

  return (
    <MobileContainer className="relative min-h-screen bg-gradient-to-b from-[#FAF8FF] via-[#F6F4FF] to-[#FFF6F9] text-slate-800 px-5 pt-5 pb-6 flex flex-col justify-between overflow-y-auto font-sans">
      {/* Ambient Soft Glows */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -right-16 w-60 h-60 rounded-full bg-rose-200/35 blur-3xl" />

      <QuickExitFAB />

      <div className="relative z-10 space-y-3.5">
        {/* Top Header */}
        <header className="flex items-start justify-between pr-24">
          <div className="space-y-0.5 text-left">
            <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full">
              <Sparkles size={10} />
              <span>Persetujuan Akses</span>
            </div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 pt-0.5">
              Bagikan dengan Aman
            </h1>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
              Akses baca-saja berbatas waktu. Kendali penuh ada di tanganmu.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setScreen('s11-access-history')}
            aria-label="Tutup Halaman Izin"
            className="w-9 h-9 rounded-2xl bg-white/90 hover:bg-white border border-purple-100 shadow-xs flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all active:scale-95 shrink-0"
          >
            <X size={16} />
          </button>
        </header>

        {/* Recipient Summary Card */}
        <section
          aria-label="Informasi Pendamping"
          className="rounded-3xl bg-white/90 backdrop-blur-md border border-purple-100/90 p-3.5 shadow-[0_6px_20px_rgba(76,29,149,0.04)] flex items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 border border-purple-200/60 flex items-center justify-center text-xs font-black text-purple-800 shrink-0">
              LA
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-slate-900 truncate">
                LBH APIK Jakarta
              </p>
              <p className="text-[11px] font-medium text-slate-500 truncate">
                Sari Kusuma, S.H. · Mode Baca-Saja
              </p>
            </div>
          </div>

          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1">
            <ShieldCheck size={12} />
            <span>Resmi</span>
          </span>
        </section>

        {/* Duration Selection Card */}
        <section
          aria-label="Durasi Izin"
          className="rounded-3xl bg-white/90 backdrop-blur-md border border-purple-100/90 p-3.5 shadow-[0_6px_20px_rgba(76,29,149,0.04)] space-y-2.5 text-left"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
              <span className="w-6 h-6 rounded-xl bg-orange-50 text-[#FF6B50] flex items-center justify-center">
                <Clock size={13} />
              </span>
              <span>Durasi Izin</span>
            </span>

            <span className="text-[10px] font-extrabold text-purple-800 bg-purple-100/80 px-2.5 py-0.5 rounded-full">
              Aktif {durationLabel}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {DURATION_OPTIONS.map((option) => {
              const active = durationPreset === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDurationPreset(option.id)}
                  className={`h-9 rounded-2xl text-xs font-extrabold transition-all active:scale-95 ${
                    active
                      ? 'bg-gradient-to-r from-[#FF7E62] to-[#FF6347] text-white shadow-[0_4px_12px_rgba(255,107,80,0.28)]'
                      : 'bg-slate-50/90 hover:bg-purple-50/70 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {durationPreset === 'custom' && (
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <label
                htmlFor="custom-hours-input"
                className="text-[11px] font-semibold text-slate-600"
              >
                Atur lama akses (1–720 jam)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  id="custom-hours-input"
                  type="number"
                  min={1}
                  max={720}
                  value={customHours}
                  onChange={handleCustomHoursChange}
                  className="w-20 h-8 px-2.5 rounded-xl bg-slate-50 border border-purple-200 text-right text-xs font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <span className="text-[11px] font-bold text-slate-500">jam</span>
              </div>
            </div>
          )}
        </section>

        {/* PIN Confirmation & Keypad Card */}
        <section
          aria-label="Konfirmasi PIN Persetujuan"
          className="rounded-3xl bg-white/95 backdrop-blur-md border border-purple-100/90 p-4 shadow-[0_8px_24px_rgba(76,29,149,0.05)] space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
              <span className="w-6 h-6 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Lock size={13} />
              </span>
              <span>PIN Persetujuan</span>
            </span>
            <span className="text-[11px] font-bold text-slate-400 tabular-nums">
              {pin.length} / 6 digit
            </span>
          </div>

          {/* PIN Dots Indicator */}
          <div
            role="status"
            aria-label={`PIN terisi ${pin.length} dari 6 digit`}
            className="flex items-center justify-center gap-3 py-1"
          >
            {PIN_SLOTS.map((slot) => {
              const filled = slot < pin.length;
              return (
                <span
                  key={slot}
                  className={`h-3 rounded-full transition-all duration-150 ${
                    filled
                      ? 'w-5 bg-gradient-to-r from-purple-700 to-indigo-600 shadow-2xs'
                      : 'w-3 bg-slate-200/90'
                  }`}
                />
              );
            })}
          </div>

          {errorMsg && (
            <p
              role="alert"
              className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200/70 rounded-2xl px-3 py-1.5 text-center"
            >
              {errorMsg}
            </p>
          )}

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2 max-w-[264px] mx-auto pt-0.5">
            {KEYPAD_DIGITS.map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleAppendDigit(digit)}
                className="h-11 rounded-2xl bg-slate-50/90 hover:bg-purple-50/80 active:bg-purple-100/80 border border-slate-200/70 text-sm font-extrabold text-slate-800 shadow-2xs transition-all active:scale-95 tabular-nums"
              >
                {digit}
              </button>
            ))}

            <button
              type="button"
              onClick={handleClearPin}
              className="h-11 rounded-2xl bg-slate-100/90 hover:bg-slate-200/70 text-[11px] font-extrabold text-slate-600 transition-colors active:scale-95"
            >
              Hapus
            </button>

            <button
              type="button"
              onClick={() => handleAppendDigit('0')}
              className="h-11 rounded-2xl bg-slate-50/90 hover:bg-purple-50/80 active:bg-purple-100/80 border border-slate-200/70 text-sm font-extrabold text-slate-800 shadow-2xs transition-all active:scale-95 tabular-nums"
            >
              0
            </button>

            <button
              type="button"
              onClick={handleDeleteDigit}
              aria-label="Hapus Satu Digit PIN"
              className="h-11 rounded-2xl bg-slate-100/90 hover:bg-slate-200/70 text-slate-600 flex items-center justify-center transition-colors active:scale-95"
            >
              <Delete size={16} />
            </button>
          </div>
        </section>
      </div>

      {/* Bottom Action Bar */}
      <footer className="relative z-10 grid grid-cols-5 gap-2.5 pt-3.5">
        <button
          type="button"
          onClick={() => setScreen('s11-access-history')}
          className="col-span-2 h-12 rounded-2xl bg-white/90 hover:bg-purple-50/80 border border-purple-200/80 text-xs font-extrabold text-purple-900 transition-all active:scale-95"
        >
          Batal
        </button>

        <button
          type="button"
          disabled={isSubmitDisabled}
          onClick={handleSubmitConsent}
          className="col-span-3 h-12 rounded-2xl bg-gradient-to-r from-[#FF7E62] to-[#FF5E42] text-white text-xs font-extrabold shadow-[0_8px_20px_rgba(255,107,80,0.3)] disabled:opacity-40 disabled:shadow-none transition-all active:scale-[0.98]"
        >
          Kirim Izin Aman
        </button>
      </footer>
    </MobileContainer>
  );
};