import React from 'react';
import { Heart, ShieldCheck, Users, type LucideIcon } from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import type { ScreenRoute } from '../../types/navigation';

interface NavItem {
  id: ScreenRoute;
  label: string;
  icon: LucideIcon;
  /** Kelas Tailwind untuk keadaan aktif. */
  active: { pill: string; icon: string; text: string };
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    id: 's04-vault-home',
    label: 'Brankas',
    icon: ShieldCheck,
    active: { pill: 'border-emerald-500/20 bg-emerald-500/10', icon: 'text-emerald-600', text: 'text-emerald-900' },
  },
  {
    id: 's11-access-history',
    label: 'Akses',
    icon: Users,
    active: { pill: 'border-violet-500/20 bg-violet-500/10', icon: 'text-violet-600', text: 'text-violet-900' },
  },
  {
    id: 's18-help-center',
    label: 'Bantuan',
    icon: Heart,
    active: { pill: 'border-rose-500/20 bg-rose-500/10', icon: 'text-rose-600', text: 'text-rose-900' },
  },
];

const MAX_BADGE = 99;

const Badge: React.FC<{ count: number }> = ({ count }) => (
  <span
    aria-label={`${count} bukti tersimpan`}
    className="absolute -right-2.5 -top-1.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[9px] font-bold text-white"
  >
    {count > MAX_BADGE ? `${MAX_BADGE}+` : count}
  </span>
);

export const BottomNavbar: React.FC = () => {
  const { screen, setScreen, evidenceList } = useVaultStore();
  const evidenceCount = evidenceList.length;

  return (
    <div className="pointer-events-auto relative z-10 w-full select-none bg-transparent px-5 pb-5 pt-1">
      <nav
        aria-label="Navigasi Utama"
        className="flex items-center justify-between rounded-full border border-white/90 bg-white/80 p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-2xl"
      >
        {NAV_ITEMS.map(({ id, label, icon: Icon, active }) => {
          const isActive = screen === id;

          return (
            <button
              key={id}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setScreen(id)}
              className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-full border transition-all duration-300 active:scale-95 ${
                isActive ? active.pill : 'border-transparent text-slate-500 hover:text-slate-600'
              }`}
            >
              <span className={`relative flex shrink-0 items-center justify-center transition-colors duration-300 ${isActive ? active.icon : 'text-slate-500'}`}>
                <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
                {id === 's04-vault-home' && evidenceCount > 0 && <Badge count={evidenceCount} />}
              </span>

              <span
                className={`text-xs tracking-tight transition-colors duration-300 ${
                  isActive ? `${active.text} font-semibold` : 'font-medium'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
