import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface BrandLogoProps {
  size?: 'normal' | 'large' | 'footer';
  onClick?: (e: React.MouseEvent) => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'normal', onClick }) => {
  const { language } = useLanguage();

  return (
    <div className={`brand-logo brand-logo--${size}`} onClick={onClick}>
      {/* Custom Designed Logo Icon: Phone Silhouette + Dynamic Continuous Line */}
      <svg
        className="brand-logo__icon"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sleek rounded-tile container */}
        <rect width="38" height="38" rx="10" fill="#111317" />
        
        {/* Subtle interior glow border */}
        <rect x="0.75" y="0.75" width="36.5" height="36.5" rx="9.25" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

        {/* Minimalist smartphone body */}
        <rect x="11" y="6" width="16" height="26" rx="4.5" stroke="#FFFFFF" strokeWidth="2.2" />
        
        {/* Speaker notch */}
        <line x1="16" y1="9.5" x2="22" y2="9.5" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" />

        {/* Home indicator bar */}
        <line x1="16.5" y1="28.5" x2="21.5" y2="28.5" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" />

        {/* Dynamic "خط" Signal Line connecting across */}
        <path
          d="M6 20C9.5 20 11.5 15.5 15 15.5C18.5 15.5 20 22 23.5 22C26.5 22 28.5 18 32 18"
          stroke="#C26A3E"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Signal pulse accent dot */}
        <circle cx="23.5" cy="22" r="1.8" fill="#FFFFFF" />
      </svg>

      <div className="brand-logo__text-wrap">
        <span className="brand-logo__text">
          {language === 'ar' ? 'موبايلي' : 'Mobily'}
        </span>
        <span className="brand-logo__subtext">
          {language === 'ar' ? 'Mobily' : 'موبايلي'}
        </span>
      </div>
    </div>
  );
};
