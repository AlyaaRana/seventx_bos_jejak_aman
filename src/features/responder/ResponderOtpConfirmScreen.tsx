// Layar S13 Langkah 3/3: Konfirmasi kode OTP 6-digit sebelum membuka dashboard pendamping.
import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ArrowLeft, LogOut, ShieldCheck, Delete } from 'lucide-react';

export const ResponderOtpConfirmScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [otp, setOtp] = useState('482');

  const handleDigit = (d: string) => {
    if (otp.length < 6) setOtp((prev) => prev + d);
  };

  const handleBack = () => {
    setOtp((prev) => prev.slice(0, -1));
  };

  return (
    <MobileContainer className="relative bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setScreen('s09b-responder-nfc')}
          className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-slate-700 shadow-xs"
        >
          <ArrowLeft size={16} />
        </button>

        <span className="text-[10px] font-extrabold text-[#7E22CE] bg-[#F3E8FF] px-3 py-1 rounded-full">
          Langkah 3 dari 3
        </span>

        <button
          type="button"
          onClick={() => setScreen('s03-calculator')}
          aria-label="Keluar Cepat"
          className="w-9 h-9 rounded-full bg-[#FFEDD5] text-[#D97706] flex items-center justify-center shadow-xs"
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* Institution Info Card */}
      <div className="bg-white border border-purple-100 rounded-2xl p-3.5 text-left space-y-1 shadow-xs mt-3">
        <span className="text-[10px] font-extrabold text-emerald-700 bg-[#DCFCE7] px-2.5 py-0.5 rounded-full inline-block">
          Konfirmasi izin
        </span>
        <h1 className="text-sm font-extrabold text-slate-900 pt-1">LBH Harapan Bersama</h1>
        <p className="text-[11px] text-slate-400">7 hari · hanya lihat · 3 bukti</p>
      </div>

      {/* OTP Input & Countdown */}
      <div className="text-center space-y-2 my-auto py-2">
        <h2 className="text-base font-extrabold text-slate-900">Cek emailmu</h2>
        <p className="text-[11px] text-slate-500 max-w-[240px] mx-auto leading-relaxed">
          Kode 6 digit dikirim ke email pemulihan <strong className="text-slate-700">a***@mail.com</strong>. Berlaku 5 menit.
        </p>

        <div className="flex justify-center gap-2 pt-2">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className={`w-10 h-11 rounded-xl border flex items-center justify-center text-base font-extrabold ${
                otp[idx]
                  ? 'bg-emerald-50 border-emerald-400 text-slate-900'
                  : 'bg-white border-purple-200 text-slate-400'
              }`}
            >
              {otp[idx] || ''}
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-400 pt-1">Kirim ulang dalam 0:42</p>
      </div>

      {/* Numeric Keypad */}
      <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto w-full pb-2">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleDigit(num)}
            className="h-10 rounded-xl bg-white border border-purple-100 text-slate-800 font-bold text-sm shadow-2xs active:scale-95 transition-all"
          >
            {num}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setOtp('')}
          className="h-10 rounded-xl bg-purple-50 text-purple-700 font-bold text-[11px]"
        >
          Hapus
        </button>
        <button
          type="button"
          onClick={() => handleDigit('0')}
          className="h-10 rounded-xl bg-white border border-purple-100 text-slate-800 font-bold text-sm shadow-2xs"
        >
          0
        </button>
        <button
          type="button"
          onClick={handleBack}
          aria-label="Hapus Satu Digit"
          className="h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center"
        >
          <Delete size={15} />
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={() => setScreen('s15-responder-dashboard')}
        className="w-full h-12 rounded-2xl bg-[#FF7E62] text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        <ShieldCheck size={16} />
        <span>Berikan izin 7 hari</span>
      </button>
    </MobileContainer>
  );
};