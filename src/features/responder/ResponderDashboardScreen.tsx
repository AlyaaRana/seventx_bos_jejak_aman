// Layar S15 Dashboard Pendamping terverifikasi e-KTP dengan timer akses, catatan kenyamanan, dan daftar bukti.
import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import {
  BadgeCheck,
  Clock,
  MessageSquareHeart,
  FileCheck2,
  Camera,
  Mic,
  FileText,
  NotebookPen,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const ResponderDashboardScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [durationFilter, setDurationFilter] = useState<'24j' | '7hari'>('7hari');
  const [noteInput, setNoteInput] = useState('');
  const [savedNote, setSavedNote] = useState<string | null>(null);

  const handleSaveNote = () => {
    if (!noteInput.trim()) return;
    setSavedNote(noteInput.trim());
    setNoteInput('');
  };

  return (
    <MobileContainer className="relative bg-[#FAF8FF] text-slate-800 p-4 flex flex-col justify-between overflow-y-auto font-sans space-y-3.5">
      {/* Top Responder Identity Card */}
      <div className="bg-white border border-purple-100 rounded-3xl p-4 shadow-xs space-y-2.5 text-left">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-sm">
              SK
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block">Pendamping Resmi</span>
              <h1 className="text-sm font-extrabold text-slate-900">Sari Kusuma, S.H.</h1>
              <p className="text-[10px] text-slate-400">LBH APIK · Kasus #C419</p>
            </div>
          </div>

          <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
            <BadgeCheck size={12} /> e-KTP Sah
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
          <span className="text-purple-700 font-bold">● Langkah 3 dari 3 · Hanya Baca</span>
          <button
            type="button"
            onClick={() => setScreen('s03-calculator')}
            className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full active:scale-95 transition-all"
          >
            Keluar
          </button>
        </div>
      </div>

      {/* Gentle Status Banner */}
      <div className="bg-[#DCFCE7]/80 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2 text-left">
        <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
        <p className="text-[11px] font-bold text-emerald-950">
          Identitas cocok. Semua berkas penyintas siap ditinjau dengan lembut.
        </p>
      </div>

      {/* Access Countdown Card */}
      <div className="bg-white border border-orange-100 rounded-3xl p-3.5 shadow-xs space-y-2 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
            <Clock size={14} className="text-orange-500" />
            <span>Batas Waktu Akses</span>
          </div>
          <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
            4h 22j 43m
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-[10px] text-slate-400">Otomatis terkunci saat habis</span>
          <div className="flex gap-1.5">
            {(['24j', '7hari'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setDurationFilter(tab)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                  durationFilter === tab
                    ? 'bg-[#FF7E62] text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab === '24j' ? '24J' : '7 Hari'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Client Comfort Note Card */}
      <div className="bg-purple-50/70 border border-purple-100 rounded-3xl p-3.5 space-y-2.5 text-left">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-purple-950">
          <MessageSquareHeart size={15} className="text-purple-600" />
          <span>Catatan Kenyamanan Klien</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Klien memilih komunikasi teks/suara tanpa tatap muka. Hindari mengulang pertanyaan kronologi yang sudah tertulis.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Tambah catatan sesi..."
            className="flex-1 h-9 px-3 rounded-xl bg-white border border-purple-200/70 text-xs text-slate-800 outline-none"
          />
          <button
            type="button"
            onClick={handleSaveNote}
            className="px-3.5 h-9 rounded-xl bg-[#FF7E62] text-white text-xs font-bold active:scale-95 transition-all"
          >
            Simpan
          </button>
        </div>

        {savedNote && (
          <p className="text-[11px] bg-white border border-purple-100 rounded-xl px-3 py-1.5 text-purple-900 font-medium">
            Catatan tersimpan: {savedNote}
          </p>
        )}
      </div>

      {/* Evidence List Section */}
      <div className="space-y-2 text-left pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-slate-900">Berkas Bukti (4)</h2>
          <button
            type="button"
            onClick={() => setScreen('s16-evidence-review')}
            className="bg-[#DCFCE7] text-[#047857] text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1"
          >
            <FileCheck2 size={12} /> Cek Keaslian
          </button>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setScreen('s16-evidence-review')}
            className="w-full bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-between shadow-2xs active:scale-[0.99] transition-all text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Camera size={17} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Foto Bukti #01</p>
                <p className="text-[10px] text-slate-400">19 Nov 2026 · 21:14 · 2.4 MB</p>
                <p className="text-[10px] text-slate-400">Terkunci aman · Siap ditinjau</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full">Asli</span>
              <ChevronRight size={15} className="text-slate-300" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setScreen('s16-evidence-review')}
            className="w-full bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-between shadow-2xs active:scale-[0.99] transition-all text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Mic size={17} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Rekaman Suara #01</p>
                <p className="text-[10px] text-slate-400">19 Nov 2026 · 21:18 · 3 mnt</p>
                <p className="text-[10px] text-slate-400">Terkunci aman · Siap didengar</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full">Asli</span>
              <ChevronRight size={15} className="text-slate-300" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setScreen('s16-evidence-review')}
            className="w-full bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-between shadow-2xs active:scale-[0.99] transition-all text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <FileText size={17} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Visum RSUD Tarakan</p>
                <p className="text-[10px] text-slate-400">20 Nov 2026 · 07:45</p>
                <p className="text-[10px] text-slate-400">Dikirim dr. Ratna Dewi · RSUD</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full">Asli</span>
              <ChevronRight size={15} className="text-slate-300" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setScreen('s16-evidence-review')}
            className="w-full bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-between shadow-2xs active:scale-[0.99] transition-all text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <NotebookPen size={17} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">Catatan Kronologi</p>
                <p className="text-[10px] text-slate-400">20 Nov 2026 · 08:10</p>
                <p className="text-[10px] text-slate-400">Ditulis penyintas · Terjaga utuh</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full">Asli</span>
              <ChevronRight size={15} className="text-slate-300" />
            </div>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
};