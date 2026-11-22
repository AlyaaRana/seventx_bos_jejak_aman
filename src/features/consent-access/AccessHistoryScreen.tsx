// Layar S11 untuk melihat riwayat izin pendamping yang aktif dan log audit pencatatan.
import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { ArrowLeft, LogOut, ShieldAlert } from 'lucide-react';

export const AccessHistoryScreen: React.FC = () => {
  const { setScreen } = useVaultStore();

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 flex flex-col justify-between">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-slate-100">
        <button onClick={() => setScreen('s04-vault-home')} className="flex items-center gap-1 text-xs font-bold text-slate-600">
          <ArrowLeft size={16} /> Kembali
        </button>
        <button onClick={() => setScreen('s03-calculator')} className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
          <LogOut size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-4 flex-1 overflow-y-auto">
        <h1 className="text-lg font-extrabold text-slate-900">Riwayat akses</h1>

        {/* Active Institution Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold text-slate-900">LBH APIK Jakarta</p>
            <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-bold px-2.5 py-0.5 rounded-full">Aktif</span>
          </div>
          <p className="text-[11px] text-slate-400">Foto & visum · Hanya lihat</p>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-[70%] h-full bg-[#10B981] rounded-full" />
          </div>
          <p className="text-[10px] text-slate-400">Sisa 5 dari 7 hari, berakhir otomatis</p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button onClick={() => setScreen('s12-share-consent')} className="h-9 rounded-xl bg-purple-50 text-purple-700 font-bold text-xs">Perpanjang</button>
            <button onClick={() => setScreen('s14-consent-granted')} className="h-9 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs">Cabut akses</button>
          </div>
        </div>

        {/* Audit Log Timeline */}
        <div className="space-y-2">
          <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Catatan</h2>
          <div className="space-y-2 text-left text-[11px] text-slate-600">
            <div className="flex gap-2">
              <span className="text-emerald-500">•</span>
              <p><strong>Pendamping membuka Foto Bukti #01</strong><br /><span className="text-slate-400 text-[10px]">Hari ini · 10:42</span></p>
            </div>
            <div className="flex gap-2">
              <span className="text-orange-500">•</span>
              <p><strong>Kamu memberi akses selama 7 hari</strong><br /><span className="text-slate-400 text-[10px]">Kemarin · 15:05</span></p>
            </div>
            <div className="flex gap-2">
              <span className="text-purple-500">•</span>
              <p><strong>Akses Klinik Pulih berakhir otomatis</strong><br /><span className="text-slate-400 text-[10px]">12 hari lalu</span></p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center gap-2 text-[11px] text-emerald-950">
          <ShieldAlert size={16} className="text-emerald-600 shrink-0" />
          <span>Kamu yang pegang kendali. Semua akses tercatat di sini.</span>
        </div>
      </div>

      <BottomNavbar />
    </MobileContainer>
  );
};