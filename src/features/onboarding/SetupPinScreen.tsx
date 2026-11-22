import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { 
  ArrowLeft, 
  ArrowRight, 
  LogOut, 
  Delete, 
  Fingerprint,
  Lock
} from 'lucide-react';

export const SetupPinScreen: React.FC = () => {
  const [pin, setPin] = useState('');
  const [useBiometrics, setUseBiometrics] = useState(true);
  const { setupNewPin, setScreen } = useVaultStore();

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
  };

  const handleSavePin = () => {
    if (pin.length === 4) {
      setupNewPin(pin);
    }
  };

  return (
    <MobileContainer className="relative bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between font-sans min-h-screen">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#E2F7ED] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-[#FFF0F5] rounded-full blur-3xl opacity-70 pointer-events-none" />

      {/* Header Navigasi */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => setScreen('s01-welcome')}
          aria-label="Kembali"
          className="w-10 h-10 rounded-2xl bg-white border border-purple-100/80 flex items-center justify-center text-slate-600 shadow-sm active:scale-95 transition-all hover:bg-purple-50/50"
        >
          <ArrowLeft size={18} />
        </button>

        <span className="text-xs font-semibold text-slate-400">
          Pengaturan Awal
        </span>

        <button
          type="button"
          aria-label="Keluar Cepat"
          className="w-10 h-10 rounded-2xl bg-orange-100/80 border border-orange-200/50 text-orange-600 flex items-center justify-center shadow-sm active:scale-95 transition-all hover:bg-orange-200/50"
        >
          <LogOut size={16} className="translate-x-[0.5px]" />
        </button>
      </div>

      {/* Konten Utama & PIN */}
      <div className="relative z-10 my-auto space-y-4 py-2">
        {/* Card Judul */}
        <div className="bg-white/90 backdrop-blur-md rounded-[24px] p-4.5 shadow-[0_8px_30px_rgba(126,34,206,0.04)] border border-purple-100/80">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E9D5FF] to-[#FBCFE8] flex items-center justify-center text-purple-700 shrink-0 shadow-inner">
              <Lock size={22} />
            </div>

            <div className="text-left flex-1">
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                Buat kode rahasia
              </h1>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 font-medium">
                Ketik 4 digit. Nanti, masukkan kode ini lalu tekan <strong className="text-purple-700 font-extrabold text-xs">=</strong> di kalkulator untuk membuka brankas.
              </p>
            </div>
          </div>
        </div>

        {/* Indikator PIN */}
        <div className="bg-white/70 backdrop-blur-sm py-3.5 px-6 rounded-2xl border border-purple-100/60 max-w-[220px] mx-auto shadow-xs">
          <div className="flex justify-center items-center gap-4">
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = pin.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                    isFilled
                      ? 'bg-[#1E1B4B] scale-100 shadow-xs'
                      : 'bg-transparent border-2 border-purple-200'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Catatan Bantuan Keamanan */}
        <p className="text-[11px] text-slate-400 text-center max-w-[250px] mx-auto leading-relaxed">
          Hindari tanggal lahir atau kombinasi umum seperti 1234. Kode ini hanya disimpan di ponselmu.
        </p>

        {/* Keypad Angka */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[270px] mx-auto pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num)}
              className="h-12 rounded-[20px] bg-white border border-purple-100/80 text-slate-800 font-extrabold text-lg shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-95 transition-all flex items-center justify-center hover:border-purple-300"
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            onClick={handleClear}
            className="h-12 rounded-[20px] bg-purple-50/70 border border-purple-100/80 text-purple-700 font-semibold text-xs flex items-center justify-center active:scale-95 transition-all hover:bg-purple-100/70"
          >
            Hapus
          </button>

          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="h-12 rounded-[20px] bg-white border border-purple-100/80 text-slate-800 font-extrabold text-lg shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-95 transition-all flex items-center justify-center hover:border-purple-300"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleDelete}
            aria-label="Hapus Digit"
            className="h-12 rounded-[20px] bg-purple-50/70 border border-purple-100/80 text-purple-700 flex items-center justify-center active:scale-95 transition-all hover:bg-purple-100/70"
          >
            <Delete size={18} />
          </button>
        </div>

        {/* Opsi Biometrik / Sidik Jari */}
        <div className="bg-[#D1FADF]/70 p-3.5 rounded-[20px] flex items-center justify-between border border-emerald-200/60 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
              <Fingerprint size={18} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-emerald-950 leading-tight">
                Buka dengan sidik jari juga
              </p>
              <p className="text-[10px] text-emerald-700 font-medium leading-tight mt-0.5">
                Akses lebih cepat saat kondisi darurat
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={useBiometrics}
            onClick={() => setUseBiometrics(!useBiometrics)}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center shadow-inner ${
              useBiometrics ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                useBiometrics ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Tombol Aksi Simpan */}
      <button
        type="button"
        disabled={pin.length < 4}
        onClick={handleSavePin}
        className="w-full h-12 rounded-[20px] bg-[#FF7A59] text-white font-bold text-sm shadow-md shadow-orange-500/15 flex items-center justify-center gap-2 disabled:opacity-40 disabled:shadow-none active:scale-[0.98] transition-all mb-1 hover:brightness-105"
      >
        <span>Simpan & lanjut ke brankas</span>
        <ArrowRight size={17} />
      </button>
    </MobileContainer>
  );
};