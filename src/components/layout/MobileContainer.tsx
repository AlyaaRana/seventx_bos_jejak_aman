//Wrapper layout yang memastikan tampilan selalu berbentuk aplikasi seluler yang presisi di berbagai layar.
import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-dvh w-full bg-slate-900 flex justify-center items-start sm:py-6 select-none">
      <main 
        className={`w-full max-w-md min-h-dvh sm:min-h-[844px] bg-[#1E293B] sm:rounded-[36px] ` +
          `shadow-2xl overflow-hidden flex flex-col relative transition-all border-slate-800 sm:border ${className}`}
      >
        {children}
      </main>
    </div>
  );
};