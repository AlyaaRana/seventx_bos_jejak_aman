// Komponen tombol ergonomis berstandar WCAG 2.1 AA dengan ukuran sentuh minimal 48px.
import React from 'react';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'emerald' | 'danger' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 
    'min-h-[48px] px-5 py-3 rounded-2xl font-semibold text-base transition-all duration-150 ' +
    'flex items-center justify-center gap-2 active:scale-[0.98] focus-visible:outline-none ' +
    'focus-visible:ring-4 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#F97316] text-slate-950 hover:bg-orange-400 focus-visible:ring-orange-300',
    secondary: 'bg-[#334155] text-slate-100 hover:bg-slate-600 focus-visible:ring-slate-300',
    emerald: 'bg-[#10B981] text-slate-950 hover:bg-emerald-400 focus-visible:ring-emerald-300',
    danger: 'bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-300',
    ghost: 'bg-transparent text-slate-400 hover:bg-slate-800 focus-visible:ring-slate-400',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};