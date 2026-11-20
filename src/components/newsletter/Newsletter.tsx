import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useStore();
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast(
        language === 'ar' ? 'البريد غير صحيح' : 'Invalid Email',
        language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address.',
        'info'
      );
      return;
    }

    setIsSubmitted(true);
    showToast(
      t.subscribedBtn,
      language === 'ar' ? 'شكراً لاشتراكك في نشرة موبايلي الحصرية!' : 'Welcome to the Mobily circle!',
      'success'
    );

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }
    });

    setEmail('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="newsletter-section reveal-on-scroll">
      <div className="container">
        <div className="newsletter-card">
          {/* Left Decorative Mail Art */}
          <div className="newsletter-media">
            <div className="newsletter-envelope-art">
              <svg viewBox="0 0 100 80" fill="none" className="newsletter-envelope-svg">
                <rect x="10" y="24" width="80" height="50" rx="6" fill="#EDE4D8" stroke="#D3C7B5" strokeWidth="2" />
                <path d="M12 26L50 52L88 26" stroke="#BAAA94" strokeWidth="2" strokeLinecap="round" />
                <rect x="22" y="6" width="56" height="34" rx="4" fill="#FFFFFF" stroke="#E2DCD2" strokeWidth="1.5" />
                <line x1="30" y1="14" x2="60" y2="14" stroke="#D3C7B5" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="30" y1="20" x2="70" y2="20" stroke="#E5DCD0" strokeWidth="2" strokeLinecap="round" />
                <line x1="30" y1="26" x2="52" y2="26" stroke="#E5DCD0" strokeWidth="2" strokeLinecap="round" />
                <circle cx="68" cy="14" r="3.5" fill="#C85A32" />
              </svg>
            </div>
          </div>

          {/* Center Info */}
          <div className="newsletter-content">
            <h3 className="newsletter-title">{t.newsletterTitle}</h3>
            <p className="newsletter-subtitle">{t.newsletterSubtitle}</p>
          </div>

          {/* Right Input Form */}
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <button
              type="submit"
              className="newsletter-submit-btn"
              disabled={isSubmitted}
            >
              {isSubmitted ? t.subscribedBtn : t.subscribeBtn}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
