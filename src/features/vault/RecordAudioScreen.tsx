import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { ArrowLeft, Mic, LogOut, Square } from 'lucide-react';

export const RecordAudioScreen: React.FC = () => {
  const { setScreen, addEvidence } = useVaultStore();
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      addEvidence({
        id: Date.now().toString(),
        title: `Rekaman Suara #${Math.floor(Math.random() * 100)}`,
        timestamp: 'Hari ini · Baru saja',
        sha256Hex: '3304fd85f604c178d0bf67dd5b95c72d',
      });
      setScreen('s04-vault-home');
    } else {
      setIsRecording(true);
    }
  };

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setScreen('s04-vault-home')}
          className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-xs"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-[11px] font-bold text-slate-500">Rekam Suara</span>
        <button 
          onClick={() => setScreen('s03-calculator')}
          className="w-9 h-9 rounded-full bg-[#FFEDD5] text-[#D97706] flex items-center justify-center shadow-xs"
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* Comfort Banner */}
      <div className="bg-purple-50 border border-purple-200 p-3.5 rounded-2xl flex items-center gap-2.5">
        <span className="text-base">🎙️</span>
        <p className="text-[11px] text-purple-950 font-semibold leading-tight">
          Pelan-pelan saja. Aku mendengarkan dan menjaganya.
        </p>
      </div>

      {/* Audio Wave Visual Area */}
      <div className="bg-white rounded-[32px] p-8 border border-purple-100 shadow-sm flex flex-col items-center justify-center space-y-6 my-auto min-h-[320px]">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-purple-600 transition-all ${
          isRecording ? 'bg-purple-100 animate-pulse' : 'bg-purple-50'
        }`}>
          <Mic size={40} />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-base font-extrabold text-slate-900">Ceritakan Pelan-pelan</h2>
          <p className="text-[11px] text-slate-400 max-w-[220px] mx-auto">
            Suaramu langsung terkunci dan tidak muncul di pemutar musik HP[cite: 26].
          </p>
        </div>

        <div className="flex gap-2">
          <span className="text-[10px] bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-bold">Bisa dijeda kapan saja</span>
          <span className="text-[10px] bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-bold">Hanya kamu yang dengar</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={toggleRecording}
        className={`w-full h-12 rounded-2xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all ${
          isRecording ? 'bg-red-500 text-white' : 'bg-[#FF6B50] text-white'
        }`}
      >
        {isRecording ? <Square size={18} /> : <Mic size={18} />}
        <span>{isRecording ? 'Hentikan & Simpan' : 'Mulai Rekam Suara'}</span>
      </button>
    </MobileContainer>
  );
};