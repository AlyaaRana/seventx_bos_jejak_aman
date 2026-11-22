import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { VERIFIED_RESPONDERS, type VerifiedResponder } from '../../data/responders';
import { ArrowLeft, LogOut, Search, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const FindResponderScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'Semua' | VerifiedResponder['role']>('Semua');
  const [selectedResponder, setSelectedResponder] = useState<VerifiedResponder | null>(
    VERIFIED_RESPONDERS[0]
  );

  const filters: ('Semua' | VerifiedResponder['role'])[] = [
    'Semua',
    'Bantuan Hukum',
    'Konseling Psikologis',
    'Layanan Medis',
  ];

  const filteredResponders = VERIFIED_RESPONDERS.filter((item) => {
    const matchesRole = selectedFilter === 'Semua' || item.role === selectedFilter;
    const matchesText =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.institution.toLowerCase().includes(query.toLowerCase());
    return matchesRole && matchesText;
  });

  return (
    <MobileContainer className="bg-[#FAF8FF] text-slate-800 flex flex-col justify-between">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setScreen('s18-help-center')}
            className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-xs"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-[10px] text-slate-400 font-bold">Lembaga Terverifikasi</p>
            <h1 className="text-sm font-extrabold text-slate-900">Cari Pendamping</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setScreen('s03-calculator')}
          className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-3.5 flex-1 overflow-y-auto text-left">
        {/* Search Box */}
        <div className="bg-white border border-purple-100 rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-xs">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama pendamping atau lembaga..."
            className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {filters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-[#7E22CE] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List Pendamping */}
        <div className="space-y-2.5">
          {filteredResponders.map((person) => {
            const isSelected = selectedResponder?.id === person.id;
            return (
              <div
                key={person.id}
                onClick={() => setSelectedResponder(person)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all shadow-xs ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-400'
                    : 'bg-white border-slate-100 hover:border-purple-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-extrabold text-slate-900">{person.name}</p>
                      {person.verified && (
                        <span className="bg-[#DCFCE7] text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                          <ShieldCheck size={10} /> Resmi
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{person.institution}</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {person.role} · {person.area}
                    </p>
                  </div>

                  {isSelected && (
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Lanjut ke Pemberian Izin Berjangka */}
        <button
          type="button"
          disabled={!selectedResponder}
          onClick={() => setScreen('s12-share-consent')}
          className="w-full h-12 rounded-2xl bg-[#FF6B50] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 disabled:opacity-40 active:scale-95 transition-all"
        >
          <span>Lanjut Beri Akses Aman</span>
          <ArrowRight size={15} />
        </button>
      </div>

      <BottomNavbar />
    </MobileContainer>
  );
};