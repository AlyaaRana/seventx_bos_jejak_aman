// Layar S09b Langkah 2/3: Panduan menempelkan e-KTP fisik pada sensor NFC ponsel
import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ResponderStepHeader } from './ResponderStepHeader';
import { Nfc, Heart } from 'lucide-react';

export const ResponderNfcScanScreen: React.FC = () => {
  const { setScreen } = useVaultStore();

  return (
    <MobileContainer className="relative bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between overflow-hidden font-sans">
      <ResponderStepHeader
        step={2}
        title="Pemindaian e-KTP"
        backTarget="s09a-responder-method"
      />

      {/* Helper Bubble */}
      <div className="bg-white border border-purple-100 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs mt-3">
        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-extrabold shrink-0">
          😊
        </span>
        <p className="text-xs font-semibold text-slate-700 text-left">
          Tempel pelan di belakang HP ya, kita baca chip resminya bareng!
        </p>
      </div>

      {/* NFC Scan Card */}
      <div className="my-auto bg-white border border-purple-100 rounded-[28px] p-5 text-center space-y-3 shadow-xs relative">
        <button
          type="button"
          aria-label="Tandai Favorit"
          className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center ml-auto"
        >
          <Heart size={14} />
        </button>

        <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 text-[#FF7E62] flex items-center justify-center shadow-inner">
          <Nfc size={34} />
        </div>

        <h2 className="text-base font-extrabold text-slate-900">Tempelkan e-KTP</h2>
        <p className="text-[11px] text-slate-500 max-w-[220px] mx-auto leading-relaxed">
          Posisikan e-KTP di belakang HP, sesuaikan dengan posisi sensor NFC.
        </p>
      </div>

      {/* Tips Pemindaian */}
      <div className="bg-white border border-slate-100 rounded-2xl p-3.5 text-left space-y-1 shadow-xs mb-3">
        <p className="text-xs font-extrabold text-slate-800">Tips Pemindaian:</p>
        <ul className="text-[11px] text-slate-500 space-y-0.5 list-disc list-inside">
          <li>Lepaskan casing HP jika terlalu tebal.</li>
          <li>Tahan e-KTP dan jangan digerakkan saat memindai.</li>
        </ul>
      </div>

      {/* Action CTA */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setScreen('s13-responder-otp')}
          className="w-full h-12 rounded-2xl bg-[#FF7E62] text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Nfc size={16} />
          <span>Mulai Pemindaian</span>
        </button>

        <button
          type="button"
          onClick={() => setScreen('s09c-responder-ocr')}
          className="w-full text-[11px] font-bold text-orange-600 underline py-1"
        >
          HP tidak ada NFC? Pindai lewat Foto OCR →
        </button>
      </div>
    </MobileContainer>
  );
};