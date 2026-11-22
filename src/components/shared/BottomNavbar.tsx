import React from 'react';
import { useVaultStore } from '../../store/useVaultStore';
import { ShieldCheck, Users, Heart, Sparkles } from 'lucide-react';
import type { ScreenRoute } from '../../types/navigation';

export const BottomNavbar: React.FC = () => {
  const { screen, setScreen, evidenceList } = useVaultStore();

  // 3 Navigasi Utama: Brankas, Akses, Bantuan
  const navItems: {
    id: ScreenRoute;
    label: string;
    icon: React.ReactNode;
    activeClass: string;
    badgeCount?: number;
  }[] = [
    {
      id: 's04-vault-home',
      label: 'Brankas',
      icon: <ShieldCheck size={20} />,
      activeClass: 'bg-[#DCFCE7] text-[#047857] border-[#A7F3D0]/70 shadow-xs',
      badgeCount: evidenceList.length,
    },
    {
      id: 's11-access-history',
      label: 'Akses',
      icon: <Users size={20} />,
      activeClass: 'bg-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF]/70 shadow-xs',
    },
    {
      id: 's18-help-center',
      label: 'Bantuan',
      icon: <Heart size={20} />,
      activeClass: 'bg-[#FFE4E6] text-[#E11D48] border-[#FECDD3]/70 shadow-xs',
    },
  ];

  return (
    <div className="px-4 pb-4 pt-1 bg-transparent pointer-events-auto w-full">
      <nav 
        aria-label="Navigasi Utama"
        className="bg-white/95 backdrop-blur-xl border border-slate-100/90 rounded-[28px] p-2 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.06)] relative"
      >
        {navItems.map((item) => {
          const isActive = screen === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setScreen(item.id)}
              className={`relative flex-1 py-2.5 px-3 rounded-[22px] flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-95 border ${
                isActive
                  ? `${item.activeClass} font-extrabold translate-y-[-2px]`
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              {/* Glowing Dot Indicator saat Aktif */}
              {isActive && (
                <span className="absolute -top-1 w-2 h-2 rounded-full bg-current animate-pulse shadow-xs" />
              )}

              <div className="relative flex items-center justify-center">
                {/* Icon dengan Scaling Smooth */}
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110 rotate-3' : 'scale-100'}`}>
                  {item.icon}
                </div>

                {/* Counter Badge Mungil Bukti Terkunci */}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#FF6B50] text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white shadow-xs">
                    {item.badgeCount}
                  </span>
                )}
              </div>

              {/* Label Tab */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] leading-none tracking-tight">{item.label}</span>
                {isActive && item.id === 's04-vault-home' && (
                  <Sparkles size={10} className="text-emerald-600 animate-spin" />
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};