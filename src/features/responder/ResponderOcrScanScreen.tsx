// Layar S09c Langkah 2/3 alternatif: Memotret e-KTP untuk pemindaian OCR tanpa menyimpan ke galeri.
import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ResponderStepHeader } from './ResponderStepHeader';
import { EyeOff, Camera, Maximize2, UserSquare2 } from 'lucide-react';

export const ResponderOcrScanScreen: React.FC = () => {
  const { setScreen } = useVaultStore();

  return (
    <MobileContainer className="relative bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between overflow-hidden font-sans">
      <ResponderStepHeader
        step={2}
        title="Foto OCR e-KTP"
        backTarget="s09b-responder-nfc"
      />

      {/* Helper Bubble */}
      <div className="bg-white border border-purple-100 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs mt-3">
        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-extrabold shrink-0">
          😊
        </span>
        <p className="text-xs font-semibold text-slate-700 text-left">
          Posisikan di kotak ya! Fotonya otomatis terhapus setelah cocok.
        </p>
      </div>

      {/* OCR Frame Card */}
      <div className="my-auto bg-white border border-purple-100 rounded-[28px] p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between text-[10px] font-bold">
          <span className="bg-[#DCFCE7] text-[#047857] px-2.5 py-1 rounded-full flex items-center gap-1">
            <EyeOff size={11} /> Tanpa Simpan Galeri
          </span>
          <span className="text-purple-700 flex items-center gap-1">
            <Maximize2 size={11} /> Posisikan Kartu
          </span>
        </div>

        <div className="border-2 border-dashed border-purple-200 bg-purple-50/40 rounded-2xl p-4 space-y-2 text-left">
          <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
            REPUBLIK INDONESIA · e-KTP
          </p>
          <div className="flex items-center justify-between pt-1">
            <div className="space-y-1.5 flex-1">
              <div className="h-2.5 w-32 bg-purple-200/80 rounded-full" />
              <div className="h-2 w-24 bg-purple-200/60 rounded-full" />
              <div className="h-2 w-20 bg-purple-200/60 rounded-full" />
            </div>
            <div className="w-12 h-14 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <UserSquare2 size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Tips Pemotretan */}
      <div className="bg-white border border-slate-100 rounded-2xl p-3.5 text-left space-y-1 shadow-xs mb-3">
        <p className="text-xs font-extrabold text-slate-800">Tips Pemotretan:</p>
        <ul className="text-[11px] text-slate-500 space-y-0.5 list-disc list-inside">
          <li>Pastikan cahaya cukup dan tidak silau pantulan.</li>
          <li>Posisikan seluruh kartu e-KTP di dalam kotak.</li>
        </ul>
      </div>

      {/* CTA & NFC Link */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setScreen('s13-responder-otp')}
          className="w-full h-12 rounded-2xl bg-[#FF7E62] text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Camera size={16} />
          <span>Ambil Foto e-KTP</span>
        </button>

        <button
          type="button"
          onClick={() => setScreen('s09b-responder-nfc')}
          className="w-full text-[11px] font-bold text-orange-600 underline py-1"
        >
          HP mendukung NFC? Pindai lebih cepat via NFC →
        </button>
      </div>
    </MobileContainer>
  );
};