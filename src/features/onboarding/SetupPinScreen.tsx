import React, { useEffect, useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import {
  ArrowLeft,
  ArrowRight,
  LogOut,
  Delete,
  Fingerprint,
  Lock,
  Check,
  Shield,
} from 'lucide-react';

const PIN_LENGTH = 4;
const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const keyBase =
  'h-[52px] rounded-2xl flex items-center justify-center select-none transition-all duration-100 ' +
  'border border-b-[3px] active:border-b active:translate-y-[2px]';
const keyDigit =
  keyBase +
  ' bg-white border-purple-100 border-b-purple-200 text-slate-800 font-bold text-xl hover:bg-purple-50/40';
const keyAction =
  keyBase +
  ' bg-purple-100/60 border-purple-100 border-b-purple-200 text-purple-700 font-bold text-base hover:bg-purple-100';

export const SetupPinScreen: React.FC = () => {
  const [pin, setPin] = useState('');
  const [revealIdx, setRevealIdx] = useState<number | null>(null);
  const [useBiometrics, setUseBiometrics] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const { setupNewPin, setScreen } = useVaultStore();
  const isComplete = pin.length === PIN_LENGTH;

  useEffect(() => {
    if (revealIdx === null) return;
    const t = setTimeout(() => setRevealIdx(null), 600);
    return () => clearTimeout(t);
  }, [revealIdx]);

  const handleKeyPress = (digit: string) => {
    if (pin.length < PIN_LENGTH) {
      setRevealIdx(pin.length);
      setPin((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setRevealIdx(null);
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setRevealIdx(null);
    setPin('');
  };

  const handleSavePin = () => {
    if (!isComplete) return;
    setupNewPin(pin);
    setIsSaved(true);

    setTimeout(() => {
      setScreen('s04-vault-home');
    }, 800);
  };

  return (
    <MobileContainer className="relative bg-[#FAF8FF] text-slate-800 px-5 pt-4 pb-5 flex flex-col font-sans min-h-screen overflow-hidden">
      {/* Subtle Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(167,139,250,0.2) 1px, transparent 1.2px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Header Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setScreen('s01-welcome')}
          aria-label="Kembali"
          className="h-10 w-10 rounded-xl bg-white border border-b-[3px] border-purple-100 border-b-purple-200 flex items-center justify-center text-slate-700 active:border-b active:translate-y-[2px] transition-all"
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
        </button>

        {/* Tombol Keluar Cepat (Fitur Keamanan Utama) */}
        <button
          type="button"
          aria-label="Keluar Cepat"
          className="h-10 px-3.5 rounded-xl bg-[#FFEDE5] border border-b-[3px] border-orange-200 border-b-orange-300 text-[#D9552F] flex items-center gap-2 text-xs font-bold active:border-b active:translate-y-[2px] transition-all"
        >
          <LogOut size={15} strokeWidth={2.4} />
          Keluar Cepat
        </button>
      </div>

      {/* Main Title & Friendly Context */}
      <div className="relative z-10 mt-5 px-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/70 text-purple-800 text-[12px] font-semibold mb-2">
          <Shield size={13} />
          <span>Ruang Pribadi Aman</span>
        </div>

        <h1 className="text-[24px] font-extrabold text-slate-900 tracking-tight leading-tight">
          Buat Kunci Rahasia
        </h1>
        <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
          Pilih 4 angka yang mudah kamu ingat sendiri.
        </p>

        {/* Visual Guide 3 Langkah (Mudah Dipahami Orang Awam) */}
        <div className="mt-4 grid grid-cols-3 gap-2 bg-white/80 backdrop-blur-sm border border-purple-100 p-2.5 rounded-2xl text-center">
          <div className="flex flex-col items-center">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold flex items-center justify-center mb-1">
              1
            </span>
            <span className="text-[11px] font-medium text-slate-600 leading-tight">
              Pilih 4 angka
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-purple-100 px-1">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold flex items-center justify-center mb-1">
              2
            </span>
            <span className="text-[11px] font-medium text-slate-600 leading-tight">
              Ketik di kalkulator
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center mb-1">
              =
            </span>
            <span className="text-[11px] font-medium text-slate-600 leading-tight">
              Tekan <strong className="text-purple-700 font-bold">=</strong> untuk masuk
            </span>
          </div>
        </div>
      </div>

      {/* Calculator Display Screen */}
      <div className="relative z-10 mt-5">
        <div className="rounded-3xl bg-[#1E1B4B] px-5 py-4 shadow-lg flex items-center justify-between border border-indigo-900/40">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300/70">
            PIN KAMU
          </span>

          <div
            className="flex items-center gap-2 font-mono text-[32px] text-white"
            aria-label={`${pin.length} dari ${PIN_LENGTH} digit terisi`}
          >
            {Array.from({ length: PIN_LENGTH }).map((_, idx) => {
              const filled = idx < pin.length;
              const showDigit = filled && revealIdx === idx;
              return (
                <span
                  key={idx}
                  className={`w-[20px] text-center transition-all ${
                    filled ? 'text-white' : 'text-indigo-300/30'
                  }`}
                >
                  {showDigit ? pin[idx] : filled ? '•' : '·'}
                </span>
              );
            })}
            <span
              className={`ml-1 font-bold transition-all ${
                isComplete ? 'text-[#FF7A59] scale-110' : 'text-indigo-300/30'
              }`}
            >
              =
            </span>
          </div>
        </div>

        <p className="mt-2 px-1 flex items-center gap-1.5 text-[11px] text-slate-400">
          <Lock size={12} className="shrink-0 text-slate-400" />
          <span>Hanya kamu yang tahu kode ini. Simpan baik-baik ya.</span>
        </p>
      </div>

      {/* Keypad */}
      <div className="relative z-10 mt-3 grid grid-cols-3 gap-2">
        {DIGITS.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleKeyPress(num)}
            className={keyDigit}
          >
            {num}
          </button>
        ))}

        <button
          type="button"
          onClick={handleClear}
          aria-label="Hapus semua"
          className={keyAction}
        >
          C
        </button>

        <button
          type="button"
          onClick={() => handleKeyPress('0')}
          className={keyDigit}
        >
          0
        </button>

        <button
          type="button"
          onClick={handleDelete}
          aria-label="Hapus satu angka"
          className={keyAction}
        >
          <Delete size={19} />
        </button>
      </div>

      {/* Biometric Toggle (Bahasa Awam) */}
      <div className="relative z-10 mt-3 flex items-center justify-between rounded-2xl bg-emerald-50/80 border border-emerald-200/60 px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Fingerprint size={18} />
          </div>
          <div>
            <p className="text-[12px] font-bold text-emerald-950 leading-tight">
              Buka pakai Sidik Jari / Sidik Wajah
            </p>
            <p className="text-[10px] text-emerald-700/80 leading-tight mt-0.5">
              Supaya lebih cepat dibuka saat dibutuhkan
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={useBiometrics}
          aria-label="Pakai sidik jari"
          onClick={() => setUseBiometrics(!useBiometrics)}
          className={`w-10 h-5.5 rounded-full transition-colors p-0.5 flex items-center ${
            useBiometrics ? 'bg-emerald-600' : 'bg-slate-300'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
              useBiometrics ? 'translate-x-4.5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <div className="flex-1 min-h-3" />

      {/* Action Button */}
      {isSaved ? (
        <div className="relative z-10 w-full h-[50px] rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2">
          <Check size={18} />
          <span>Kunci tersimpan, membuka ruang aman...</span>
        </div>
      ) : (
        <button
          type="button"
          disabled={!isComplete}
          onClick={handleSavePin}
          className="relative z-10 w-full h-[50px] rounded-2xl bg-[#FF7A59] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none active:scale-[0.98] transition-all hover:bg-[#ff6943]"
        >
          {isComplete ? (
            <>
              <span>Simpan & Masuk</span>
              <ArrowRight size={16} />
            </>
          ) : (
            <span>
              {pin.length === 0
                ? 'Masukkan 4 angka kunci'
                : `Masih kurang ${PIN_LENGTH - pin.length} angka lagi`}
            </span>
          )}
        </button>
      )}
    </MobileContainer>
  );
};