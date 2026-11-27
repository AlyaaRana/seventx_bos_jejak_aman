import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import {
  Shield,
  IdCard,
  ArrowRight,
  Lock,
  ShieldCheck,
  Info,
} from 'lucide-react';
import smile from '../../assets/smile.png';

const GREETINGS = [
  'Nggak perlu buru-buru ya.',
  'Ambil napas dulu, pelan aja.',
  'Ceritamu aman di sini.',
];

export const WelcomeScreen: React.FC = () => {
  const { setRole, setScreen } = useVaultStore();
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const currentNote = GREETINGS[tapCount % GREETINGS.length];

  return (
    <MobileContainer className="relative bg-gradient-to-b from-[#FAF8FF] via-[#F4F7FF] to-[#FFF5F8] text-slate-800 p-6 flex flex-col justify-between overflow-hidden font-sans min-h-screen select-none">
      {/* Subtle Background Glow */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#D1FADF]/45 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-88 h-88 bg-[#F3E8FF]/45 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7E22CE] flex items-center justify-center shadow-xs transition-transform hover:scale-105">
            <span className="text-xs font-black text-white tracking-tight">JA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400">Ruang Aman & Rahasia</span>
            <span className="text-sm font-extrabold text-slate-900 leading-tight tracking-tight mt-0.5">
              Jejak Aman
            </span>
          </div>
        </div>
      </div>

      {/* Main Centered Body */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-5 w-full py-2">
        {/* Hero Card */}
        <div className="w-full bg-white/85 backdrop-blur-md rounded-[32px] p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white space-y-3.5 transition-all duration-300 hover:shadow-[0_12px_35px_rgba(126,34,206,0.06)]">
          <button
            type="button"
            onClick={() => setTapCount((c) => c + 1)}
            aria-label="Sapa maskot"
            className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#A7F3D0] to-[#6EE7B7] flex items-center justify-center shadow-xs p-1 border-2 border-white animate-bounce duration-3000 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          >
            <img
              src={smile}
              alt="Jejak Aman Avatar"
              className="w-full h-full object-contain"
            />
          </button>

          <div className="space-y-1.5 pt-0.5">
            <h1 className="text-xl font-black text-slate-900 leading-tight tracking-tight">
              Selamat datang,
              <br />
              kamu aman di sini
            </h1>
            <p className="text-xs text-slate-400 max-w-[235px] mx-auto leading-relaxed font-medium">
              Pilih tujuanmu hari ini. Semua langkah dilakukan pelan-pelan saja.
            </p>
          </div>

          <p className="text-[11px] font-bold text-emerald-700/80 pt-0.5 transition-opacity duration-200">
            {currentNote}
          </p>
        </div>

        {/* Action Options */}
        <div className="w-full space-y-3">
          {/* Option 1: Masuk Ruang Aman */}
          <button
            type="button"
            onClick={() => {
              setRole('survivor');
              setScreen('s02-setup-pin');
            }}
            className="w-full p-4 rounded-[26px] bg-[#ECFDF5] hover:bg-[#D1FADF] text-[#065F46] flex items-center justify-between border border-emerald-200/60 shadow-xs active:scale-[0.98] hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
                <Shield className="text-[#10B981]" size={22} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 leading-tight group-hover:text-[#065F46] transition-colors">
                  Masuk Ruang Aman
                </p>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Simpan bukti & cerita rahasia
                </p>
              </div>
            </div>
            <ArrowRight
              className="text-emerald-600 mr-1 group-hover:translate-x-1.5 transition-transform duration-200 shrink-0"
              size={18}
            />
          </button>

          {/* Option 2: Saya Pendamping */}
          <button
            type="button"
            onClick={() => setRole('responder')}
            className="w-full p-4 rounded-[26px] bg-[#F5F3FF] hover:bg-[#E9D5FF] text-[#6B21A8] flex items-center justify-between border border-purple-200/60 shadow-xs active:scale-[0.98] hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200">
                <IdCard className="text-[#A855F7]" size={22} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 leading-tight group-hover:text-[#6B21A8] transition-colors">
                  Saya Pendamping
                </p>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Verifikasi e-KTP & bantu kasus
                </p>
              </div>
            </div>
            <ArrowRight
              className="text-purple-600 mr-1 group-hover:translate-x-1.5 transition-transform duration-200 shrink-0"
              size={18}
            />
          </button>
        </div>
      </div>

      {/* Footer Security Assurance */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1 pb-1">
        <button
          type="button"
          onClick={() => setShowSecurityInfo(!showSecurityInfo)}
          className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 hover:text-emerald-700 font-bold active:scale-95 transition-all cursor-pointer"
        >
          <Lock size={13} className="text-emerald-600" />
          <span>Tanpa akun · Data tetap di HP-mu</span>
          <Info
            size={12}
            className={`text-slate-300 transition-transform duration-200 ${
              showSecurityInfo ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showSecurityInfo ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-emerald-100 shadow-md text-[10px] text-slate-600 text-center max-w-[250px] space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-emerald-800 font-bold">
              <ShieldCheck size={13} />
              <span>Jaminan Keamanan 100%</span>
            </div>
            <p className="text-slate-500 leading-tight">
              Semua berkas tersimpan aman di memori HP-mu tanpa diunggah ke server luar mana pun.
            </p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};