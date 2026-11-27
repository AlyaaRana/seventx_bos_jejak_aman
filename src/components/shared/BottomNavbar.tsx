import React from 'react';
import {
  CloudUpload,
  FolderOpen,
  HeartHandshake,
  Home,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useVaultStore } from '../../store/useVaultStore';
import type { ScreenRoute } from '../../types/navigation';

interface NavItem {
  id: ScreenRoute;
  label: string;
  icon: LucideIcon;
}

const LEFT_ITEMS: readonly NavItem[] = [
  { id: 's04-vault-home', label: 'Beranda', icon: Home },
  { id: 's08-evidence-history', label: 'Bukti', icon: FolderOpen },
];

/** Tombol tengah yang menonjol: bantuan harus selalu paling mudah dijangkau. */
const CENTER_ITEM: NavItem = { id: 's18-help-center', label: 'Bantuan', icon: HeartHandshake };

const RIGHT_ITEMS: readonly NavItem[] = [
  { id: 's07-offline-queue', label: 'Antrean', icon: CloudUpload },
  { id: 's11-access-history', label: 'Akses', icon: Users },
];

/** Tab yang menampilkan jumlah bukti tersimpan. */
const EVIDENCE_TAB: ScreenRoute = 's08-evidence-history';
const MAX_BADGE = 99;

const Badge: React.FC<{ count: number }> = ({ count }) => (
  <span
    aria-label={`${count} bukti tersimpan`}
    className="absolute -right-2.5 -top-1.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full border-2 border-white bg-[#FF7A59] px-1 text-[9px] font-bold text-white"
  >
    {count > MAX_BADGE ? `${MAX_BADGE}+` : count}
  </span>
);

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  badge?: number;
  onSelect: (id: ScreenRoute) => void;
}

const NavButton: React.FC<NavButtonProps> = ({ item, isActive, badge = 0, onSelect }) => {
  const Icon = item.icon;

  return (
    <button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      onClick={() => onSelect(item.id)}
      className={`flex flex-col items-center gap-0.5 pb-0.5 pt-1.5 transition-colors active:scale-95 ${
        isActive ? 'text-[#1E1B4B]' : 'text-slate-400 hover:text-slate-500'
      }`}
    >
      <span className="relative">
        <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
        {badge > 0 && <Badge count={badge} />}
      </span>
      <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
      <span className={`h-1 w-1 rounded-full bg-[#FF7A59] ${isActive ? '' : 'invisible'}`} />
    </button>
  );
};

export const BottomNavbar: React.FC = () => {
  const { screen, setScreen, evidenceList } = useVaultStore();
  const CenterIcon = CENTER_ITEM.icon;
  const isCenterActive = screen === CENTER_ITEM.id;

  const renderItem = (item: NavItem) => (
    <NavButton
      key={item.id}
      item={item}
      isActive={screen === item.id}
      badge={item.id === EVIDENCE_TAB ? evidenceList.length : 0}
      onSelect={setScreen}
    />
  );

  return (
    <nav
      aria-label="Navigasi Utama"
      className="relative z-20 grid w-full shrink-0 select-none grid-cols-5 items-end rounded-t-[26px] border-t border-[#EAE2D3] bg-white px-2 pb-4 pt-1.5 shadow-[0_-10px_28px_-12px_rgba(42,36,56,0.18)]"
    >
      {LEFT_ITEMS.map(renderItem)}

      <button
        type="button"
        aria-current={isCenterActive ? 'page' : undefined}
        onClick={() => setScreen(CENTER_ITEM.id)}
        className="-mt-7 flex flex-col items-center gap-0.5 transition-transform active:scale-95"
      >
        <span
          className={`flex h-[58px] w-[58px] items-center justify-center rounded-full border-4 border-[#F5F0E6] bg-[#FF7A59] text-white shadow-[0_8px_18px_-4px_rgba(255,122,89,0.65)] ${
            isCenterActive ? 'ring-2 ring-[#FF7A59]/40' : ''
          }`}
        >
          <CenterIcon size={24} strokeWidth={2.2} />
        </span>
        <span className="text-[10px] font-bold text-[#D9552F]">{CENTER_ITEM.label}</span>
      </button>

      {RIGHT_ITEMS.map(renderItem)}
    </nav>
  );
};