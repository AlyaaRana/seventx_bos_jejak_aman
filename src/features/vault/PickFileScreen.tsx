import React, { useRef, useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { 
  ArrowLeft, 
  LogOut, 
  UploadCloud, 
  Image as ImageIcon, 
  EyeOff, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

export const PickFileScreen: React.FC = () => {
  const { setScreen, addEvidence } = useVaultStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [justSavedFile, setJustSavedFile] = useState<{
    name: string;
    timestamp: string;
  } | null>({
    name: 'Tangkapan_Chat_WA.png',
    timestamp: 'Tersimpan aman · Hari ini',
  });

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      addEvidence({
        id: Date.now().toString(),
        title: fileName,
        timestamp: 'Hari ini · Baru saja',
        sha256Hex: 'f1edc0c5d2c7d27be9ef2e00323256e7',
      });

      setJustSavedFile({
        name: fileName,
        timestamp: 'Tersimpan aman · Hari ini',
      });
    }
  };

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 p-5 flex flex-col justify-between overflow-hidden font-sans">
      {/* Decorative Ambient Orbs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#E2F7ED] rounded-full blur-3xl opacity-75 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#F3E8FF] rounded-full blur-3xl opacity-70 pointer-events-none" />

      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf,.doc,.docx"
        className="hidden"
      />

      {/* Navigation Header */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen('s04-vault-home')}
            aria-label="Kembali ke Brankas"
            className="w-10 h-10 rounded-2xl bg-white border border-purple-100 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-all hover:bg-purple-50"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-[10px] font-bold text-emerald-700 leading-tight">Brankas Pribadi</p>
            <h1 className="text-base font-extrabold text-slate-900 leading-tight">Pilih Berkas</h1>
          </div>
        </div>

        <button
          onClick={() => setScreen('s03-calculator')}
          aria-label="Keluar Cepat"
          className="w-10 h-10 rounded-2xl bg-orange-100/80 border border-orange-200/50 text-orange-600 flex items-center justify-center shadow-xs active:scale-90 transition-all"
        >
          <LogOut size={16} className="translate-x-[0.5px]" />
        </button>
      </div>

      {/* Comfort Info Banner */}
      <div className="relative z-10 my-3 bg-[#DCFCE7]/70 backdrop-blur-md border border-[#A7F3D0] p-3.5 rounded-[22px] flex items-center gap-3 shadow-xs">
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center shrink-0">
          <ShieldCheck size={16} />
        </div>
        <p className="text-[11px] text-[#065F46] font-semibold leading-snug">
          Pilih tangkapan chat atau foto pentingmu untuk dikunci rapi di brankas[cite: 26].
        </p>
      </div>

      {/* Main Upload Dropzone Card */}
      <div className="relative z-10 my-auto space-y-3">
        <div
          onClick={triggerFilePicker}
          className="bg-gradient-to-b from-[#DCFCE7]/60 to-[#D1FADF]/80 border-2 border-[#A7F3D0] rounded-[32px] p-6 text-center space-y-4 shadow-[0_8px_25px_rgba(16,185,129,0.06)] cursor-pointer active:scale-[0.98] transition-all hover:border-emerald-400"
        >
          {/* Cloud Upload Icon */}
          <div className="w-16 h-16 mx-auto rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-md transform transition-transform duration-300 hover:scale-110">
            <UploadCloud size={32} />
          </div>

          <div className="space-y-1">
            <h2 className="text-base font-extrabold text-[#065F46]">
              Simpan Foto atau Chat
            </h2>
            <p className="text-[11px] text-[#047857] max-w-[230px] mx-auto leading-relaxed font-medium">
              Ketuk area ini untuk memilih tangkapan layar, foto, atau dokumen. Semuanya langsung terkunci rapat[cite: 26].
            </p>
          </div>

          {/* Button Pilih dari HP */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              triggerFilePicker();
            }}
            className="px-5 py-2.5 rounded-full bg-white border border-emerald-200 text-[#047857] font-extrabold text-xs shadow-sm inline-flex items-center gap-2 active:scale-95 transition-all hover:bg-emerald-50"
          >
            <ImageIcon size={16} />
            <span>Pilih dari HP</span>
          </button>
        </div>

        {/* Security Feature Badges */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-[#F3E8FF]/70 border border-[#E9D5FF] p-2.5 rounded-2xl flex items-center justify-center gap-2 text-[#7E22CE]">
            <EyeOff size={14} />
            <span className="text-[11px] font-bold">Tidak tampil di luar</span>
          </div>
          <div className="bg-[#FFE4E6]/70 border border-[#FECDD3] p-2.5 rounded-2xl flex items-center justify-center gap-2 text-[#E11D48]">
            <Heart size={14} />
            <span className="text-[11px] font-bold">Aman & rahasia</span>
          </div>
        </div>
      </div>

      {/* Section Baru Saja Disimpan */}
      <div className="relative z-10 space-y-2 pt-2 mb-1">
        <h3 className="text-xs font-extrabold text-slate-800 text-left px-1">
          Baru Saja Disimpan[cite: 26]
        </h3>

        {justSavedFile ? (
          <div className="bg-white border border-slate-100 rounded-[22px] p-3.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#047857] flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {justSavedFile.name}[cite: 26]
                </p>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  {justSavedFile.timestamp}[cite: 26]
                </p>
              </div>
            </div>

            <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#A7F3D0]">
              <CheckCircle2 size={12} /> Utuh[cite: 26]
            </span>
          </div>
        ) : (
          <div className="bg-white/60 border border-dashed border-slate-200 rounded-[22px] p-4 text-center text-xs text-slate-400">
            Belum ada berkas yang baru disimpan.
          </div>
        )}
      </div>
    </MobileContainer>
  );
};