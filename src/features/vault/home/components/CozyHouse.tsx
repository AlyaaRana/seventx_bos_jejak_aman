import React from 'react';

/** Rumah kecil dengan jendela yang menyala hangat. Sekadar pemanis, tidak interaktif. */
export const CozyHouse: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 56" className={className} aria-hidden="true">
    <path
      d="M6 28 32 7l26 21"
      fill="none"
      stroke="#FF9B7A"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="12" y="28" width="40" height="24" rx="4" fill="#3A3480" />
    <rect x="19" y="33" width="13" height="12" rx="3" fill="#FFC96B" className="home-glow" />
    <rect x="38" y="35" width="9" height="17" rx="3" fill="#FF9B7A" />
  </svg>
);