import React from 'react';
import aimImg from '../../../assets/smile.png';

type BannerTone = 'emerald' | 'purple' | 'amber' | 'rose';

const TONES: Record<BannerTone, { wrap: string; text: string }> = {
  emerald: { wrap: 'bg-emerald-50/80 border-emerald-100', text: 'text-emerald-900' },
  purple: { wrap: 'bg-violet-50/80 border-violet-100', text: 'text-violet-950' },
  amber: { wrap: 'bg-amber-50/80 border-amber-100', text: 'text-amber-950' },
  rose: { wrap: 'bg-rose-50/80 border-rose-100', text: 'text-rose-950' },
};

interface ComfortBannerProps {
  tone?: BannerTone;
  children: React.ReactNode;
}

/** Pesan menenangkan yang "diucapkan" oleh maskot kecil. */
export const ComfortBanner: React.FC<ComfortBannerProps> = ({ tone = 'emerald', children }) => {
  const { wrap, text } = TONES[tone];

  return (
    <div className={`relative z-10 my-3 flex items-center gap-3 rounded-[22px] border p-3 backdrop-blur-md ${wrap}`}>
      <div className="h-10 w-10 shrink-0 rounded-2xl border border-white bg-white p-1 shadow-sm">
        <img src={aimImg} alt="" className="h-full w-full object-contain" />
      </div>
      <p className={`text-[13px] font-medium leading-snug ${text}`}>{children}</p>
    </div>
  );
};
