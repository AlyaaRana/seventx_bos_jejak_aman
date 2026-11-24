import React, { useState } from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { BottomNavbar } from '../../components/shared/BottomNavbar';
import { VERIFIED_RESPONDERS, type VerifiedResponder } from '../../data/responders';
import { 
  ChevronLeft, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  MapPin, 
  Building2 
} from 'lucide-react';

export const FindResponderScreen: React.FC = () => {
  const { setScreen } = useVaultStore();
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'Semua' | VerifiedResponder['role']>('Semua');
  const [selectedResponder, setSelectedResponder] = useState<VerifiedResponder | null>(
    VERIFIED_RESPONDERS[0] || null
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
      item.institution.toLowerCase().includes(query.toLowerCase()) ||
      item.area.toLowerCase().includes(query.toLowerCase());
    return matchesRole && matchesText;
  });

  return (
    <MobileContainer className="relative bg-gradient-to-b from-[#FAF8FF] via-[#F4F7FF] to-[#FFF5F8] text-slate-800 flex flex-col justify-between overflow-hidden font-sans min-h-screen select-none">
      {/* Background Soft Blobs */}
      <div className="absolute -top-14 -right-14 w-72 h-72 bg-[#FFE4E6]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#F3E8FF]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 p-4 flex items-center justify-between border-b border-slate-100/80 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setScreen('s18-help-center')}
            aria-label="Kembali"
            className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-xs active:scale-95 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-left">
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
              Lembaga Terverifikasi
            </p>
            <h1 className="text-sm font-black text-slate-900 tracking-tight">
              Cari Pendamping Resmi
            </h1>
          </div>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="relative z-10 p-5 space-y-4 flex-1 overflow-y-auto text-left pb-6">
        
        {/* Search Input Box */}
        <div className="relative bg-white/90 backdrop-blur-md border border-slate-200/80 focus-within:border-[#FF6B50] rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-xs transition-all">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, lembaga, atau kota..."
            className="w-full bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter Pills (Scrollbar Disembunyikan) */}
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {filters.map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
                  isActive
                    ? 'bg-[#FF6B50] text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* List Pendamping */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              Pilih Pendamping ({filteredResponders.length})
            </h2>
          </div>

          {filteredResponders.length === 0 ? (
            <div className="bg-white/80 rounded-2xl p-6 text-center border border-slate-100 space-y-1">
              <p className="text-xs font-bold text-slate-700">Pendamping tidak ditemukan</p>
              <p className="text-[11px] text-slate-400">Coba kata kunci pencarian yang lain.</p>
            </div>
          ) : (
            filteredResponders.map((person) => {
              const isSelected = selectedResponder?.id === person.id;
              return (
                <div
                  key={person.id}
                  onClick={() => setSelectedResponder(person)}
                  className={`p-4 rounded-[22px] border cursor-pointer transition-all duration-200 active:scale-[0.99] space-y-2.5 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FFF5F2] to-white border-[#FF6B50] shadow-[0_4px_18px_rgba(255,107,80,0.12)]'
                      : 'bg-white/90 backdrop-blur-md border-slate-100 hover:border-purple-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-black text-slate-900 leading-tight">
                          {person.name}
                        </p>
                        {person.verified && (
                          <span className="bg-[#D1FADF] text-[#047857] text-[9px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5 border border-[#A7F3D0]/60">
                            <ShieldCheck size={10} /> Terverifikasi
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
                        <Building2 size={12} className="text-slate-400 shrink-0" />
                        <span>{person.institution}</span>
                      </p>
                    </div>

                    {/* <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'text-[#FF6B50]' : 'text-slate-300'
                    }`}>
                      <CheckCircle2 size={19} />
                    </div> */}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium border-t border-slate-100">
                    <span className="bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-md font-bold">
                      {person.role}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <MapPin size={11} className="text-slate-400" /> {person.area}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* CTA Utama */}
        <div className="pt-2">
          <button
            type="button"
            disabled={!selectedResponder}
            onClick={() => setScreen('s12-share-consent')}
            className="w-full h-12 rounded-2xl bg-[#FF6B50] hover:bg-[#E0533C] text-white font-extrabold text-xs shadow-[0_6px_20px_rgba(255,107,80,0.25)] flex items-center justify-center gap-2 disabled:opacity-40 active:scale-[0.98] transition-all duration-200"
          >
            <span>Lanjut Beri Akses Aman</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </MobileContainer>
  );
};