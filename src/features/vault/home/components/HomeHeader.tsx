import React from 'react';
import { Home } from 'lucide-react';
import { getGreeting } from '../greeting';

interface HomeHeaderProps {
  /** Nama panggilan. Kalau kosong, sapaan tampil tanpa nama. */
  name?: string;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ name }) => {
  const { text, icon: GreetingIcon, tone } = getGreeting();

  return (
    <header>
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 -rotate-3 items-center justify-center rounded-xl bg-[#1E1B4B] text-[#FF9B7A]">
          <Home size={19} />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-extrabold tracking-tight text-[#2A2438]">Ruang Aman</p>
          <p className="text-[11px] text-[#7B7389]">Cuma kamu yang bisa masuk</p>
        </div>
      </div>

      <h1 className="mt-6 flex items-center gap-2 text-[32px] font-extrabold leading-none tracking-tight text-[#2A2438]">
        {name ? `${text}, ${name}` : text}
        <GreetingIcon size={26} className={tone} aria-hidden="true" />
      </h1>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8197]">
        Kamu aman di sini
      </p>
    </header>
  );
};