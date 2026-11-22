// Layar S09a Langkah 1/3: Memilih metode verifikasi identitas pendamping (Tempel NFC atau Foto OCR).
import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ResponderStepHeader } from './ResponderStepHeader';
import { Nfc, Camera, UserCheck, Radio } from 'lucide-react';

export const ResponderVerifyMethodScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [method, setMethod] = useState<'nfc' | 'ocr'>('nfc');

  const handleNext = () => {
    if (method === 'nfc') {
      setScreen('s09b-responder-nfc');
    } else {
      setScreen('s09c-responder-ocr');
    }
  };

  return (
    <MobileContainer className="relative bg-gradient-to-b from-[#FAF8FF] via-[#F7F5FF] to-[#F3FAF7] text-slate-800 p-5 flex flex-col justify-between overflow-hidden font-sans min-h-screen">
      {/* Decorative Ambient Orbs */}
      <div className="absolute -top-14 -left-14 w-60 h-60 bg-[#F3E8FF]/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#DCFCE7]/70 rounded-full blur-3xl pointer-events-none" />

      {/* Top Section: Header, Greeting & Mode Switcher */}
      <div className="relative z-10 space-y-3">
        {/* <ResponderStepHeader
          step={1}
          title="Pilih Cara Verifikasi"
          backTarget="s01-welcome"
          leftLabel="Ganti Peran"
        /> */}

        {/* Greeting Bubble */}
        <div className="bg-white/90 backdrop-blur-xs border border-purple-100 rounded-2xl p-3 flex items-center gap-2.5 shadow-2xs">
          <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-extrabold shrink-0">
            😊
          </span>
          <p className="text-xs font-semibold text-slate-700 text-left leading-snug">
            Halo Kak Pendamping! Yuk kenalan lewat e-KTP dulu ya.
          </p>
        </div>

        {/* Method Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setMethod('nfc')}
            className={`h-11 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition-all active:scale-95 ${
              method === 'nfc'
                ? 'bg-[#FF7E62] text-white border-transparent shadow-xs'
                : 'bg-white text-slate-700 border-purple-100 hover:bg-purple-50/50'
            }`}
          >
            <Nfc size={15} />
            <span>Tempel NFC</span>
          </button>

          <button
            type="button"
            onClick={() => setMethod('ocr')}
            className={`h-11 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition-all active:scale-95 ${
              method === 'ocr'
                ? 'bg-[#FF7E62] text-white border-transparent shadow-xs'
                : 'bg-white text-slate-700 border-purple-100 hover:bg-purple-50/50'
            }`}
          >
            <Camera size={15} />
            <span>Foto OCR</span>
          </button>
        </div>
      </div>

      {/* Middle Section: e-KTP Preview Card */}
      <div className="relative z-10 my-4 bg-gradient-to-br from-[#F3E8FF]/90 via-white to-[#DCFCE7]/70 border border-purple-200/80 rounded-[26px] p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-[10px] font-extrabold text-purple-800">
          <span>KARTU E-KTP RESMI</span>
          <span className="bg-white/95 px-2.5 py-0.5 rounded-full border border-purple-100 flex items-center gap-1 text-slate-700">
            <Radio size={11} className="text-emerald-600" />
            <span>{method === 'nfc' ? 'NFC Chip' : 'Kamera OCR'}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            {method === 'nfc' ? <UserCheck size={22} /> : <Camera size={22} />}
          </div>
          <div>
            <p className="text-[11px] font-mono text-slate-500">NIK: ••••••••••••••••</p>
            <p className="text-sm font-extrabold text-slate-900">
              {method === 'nfc' ? 'Siap dipindai' : 'Siap dipotret'}
            </p>
            <p className="text-[10px] text-slate-500">
              {method === 'nfc'
                ? 'Tempelkan di belakang HP'
                : 'Arahkan e-KTP ke dalam bingkai'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="w-full h-11 rounded-2xl bg-[#FF7E62] text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all hover:brightness-105"
        >
          {method === 'nfc' ? <Nfc size={15} /> : <Camera size={15} />}
          <span>{method === 'nfc' ? 'Lanjut Pindai NFC' : 'Lanjut Foto OCR'}</span>
        </button>
      </div>

      
    </MobileContainer>
  );
};