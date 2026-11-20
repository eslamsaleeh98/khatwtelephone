import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FeatureBadges: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Truck,
      title: t.freeShippingTitle,
      subtitle: t.freeShippingSub
    },
    {
      icon: RotateCcw,
      title: t.easyReturnsTitle,
      subtitle: t.easyReturnsSub
    },
    {
      icon: ShieldCheck,
      title: t.securePaymentsTitle,
      subtitle: t.securePaymentsSub
    },
    {
      icon: Headphones,
      title: t.supportTitle,
      subtitle: t.supportSub
    }
  ];

  return (
    <section className="features-section reveal-on-scroll">
      <div className="container">
        <div className="features-card">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className={`feature-item reveal-on-scroll stagger-${idx + 1}`}>
                <div className="feature-icon-wrapper">
                  <Icon size={22} className="feature-icon" />
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">{feat.title}</h4>
                  <p className="feature-subtitle">{feat.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
