import React from 'react';

interface FriendlyNoteProps {
  /** Maskot kecil: emoji atau gambar. */
  mascot: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}

/** Catatan ramah di awal layar. Satu-satunya "hiasan" per layar, biar tetap bersih. */
export const FriendlyNote: React.FC<FriendlyNoteProps> = ({ mascot, title, children }) => (
  <div className="flex items-center gap-3 rounded-[22px] border border-[#F3E3BC] bg-[#FFF3D6] p-3.5">
    <div className="flex h-11 w-11 shrink-0 -rotate-3 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 text-xl">
      {mascot}
    </div>
    <div className="min-w-0">
      <p className="text-[13px] font-extrabold leading-tight text-[#5C4A1E]">{title}</p>
      {children && <p className="mt-0.5 text-[11px] leading-snug text-[#7B6A4A]">{children}</p>}
    </div>
  </div>
);