import React from 'react';
import { Truck, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TopBanner: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <div className="top-banner">
      <div className="container top-banner__inner">
        <div className="top-banner__left">
          <Truck size={14} className="top-banner__icon" />
          <span>{t.freeShippingText}</span>
          <span className="top-banner__divider">|</span>
          <span>{t.easyReturnsText}</span>
        </div>
        <div className="top-banner__right">
          <a href="#track" className="top-banner__link">{t.trackOrder}</a>
          <span className="top-banner__divider">|</span>
          <a href="#help" className="top-banner__link">{t.helpCenter}</a>
          <span className="top-banner__divider">|</span>
          <a href="#sell" className="top-banner__link">{t.sellOnNovella}</a>
          <span className="top-banner__divider">|</span>

          {/* Language Switcher Button */}
          <button
            className="lang-switcher-btn"
            onClick={toggleLanguage}
            title={language === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            <Globe size={14} />
            <span className="lang-switcher-text">
              {language === 'ar' ? 'English (EN)' : 'العربية (AR)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
