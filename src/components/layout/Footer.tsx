import React from 'react';
import { Play, Apple } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { navigateTo } = useStore();

  return (
    <footer className="main-footer">
      <div className="container main-footer__inner">
        {/* Brand & Socials */}
        <div className="footer-col footer-col--brand">
          <a
            href="#"
            className="footer-logo"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            style={{ textDecoration: 'none' }}
          >
            <BrandLogo size="footer" />
          </a>
          <p className="footer-tagline">{t.footerDesc}</p>
          <div className="footer-socials">
            <a href="#facebook" className="footer-social-btn" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#instagram" className="footer-social-btn" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#twitter" className="footer-social-btn" aria-label="X Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#youtube" className="footer-social-btn" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4 className="footer-heading">{t.shop}</h4>
          <ul className="footer-list">
            <li><button onClick={() => navigateTo('products')}>{t.flagshipPhones}</button></li>
            <li><button onClick={() => navigateTo('products')}>{t.appleIphones}</button></li>
            <li><button onClick={() => navigateTo('products')}>{t.samsungGalaxy}</button></li>
            <li><button onClick={() => navigateTo('products')}>{t.googlePixel}</button></li>
            <li><button onClick={() => navigateTo('products')}>{t.smartAccessories}</button></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-col">
          <h4 className="footer-heading">{t.customerService}</h4>
          <ul className="footer-list">
            <li><a href="#help">{t.helpCenter}</a></li>
            <li><a href="#track">{t.trackOrder}</a></li>
            <li><a href="#returns">{t.easyReturnsTitle}</a></li>
            <li><a href="#shipping">{t.freeShippingTitle}</a></li>
          </ul>
        </div>

        {/* About Novella */}
        <div className="footer-col">
          <h4 className="footer-heading">{t.aboutUs}</h4>
          <ul className="footer-list">
            <li><a href="#about">{t.aboutUs}</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#press">Press & News</a></li>
            <li><a href="#sell">{t.sellOnNovella}</a></li>
          </ul>
        </div>

        {/* App Download */}
        <div className="footer-col footer-col--apps">
          <h4 className="footer-heading">{t.downloadApp}</h4>
          <p className="footer-app-desc">{t.downloadAppSub}</p>
          <div className="footer-app-buttons">
            <a href="#google-play" className="app-badge">
              <Play size={18} fill="#FFFFFF" />
              <div className="app-badge__text">
                <span className="app-badge__sub">GET IT ON</span>
                <span className="app-badge__main">Google Play</span>
              </div>
            </a>
            <a href="#app-store" className="app-badge">
              <Apple size={20} fill="#FFFFFF" />
              <div className="app-badge__text">
                <span className="app-badge__sub">Download on the</span>
                <span className="app-badge__main">App Store</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom__inner">
          <p className="footer-copyright">{t.rightsReserved}</p>
          <div className="footer-legal-links">
            <a href="#privacy">{t.privacyPolicy}</a>
            <span className="footer-divider">|</span>
            <a href="#terms">{t.termsOfService}</a>
            <span className="footer-divider">|</span>
            <a href="#cookies">{t.cookiePolicy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
