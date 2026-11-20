import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { useLanguage } from './context/LanguageContext';
import { TopBanner } from './components/layout/TopBanner';
import { Header } from './components/layout/Header';
import { SubNav } from './components/layout/SubNav';
import { HeroSection } from './components/hero/HeroSection';
import { CategoryCircles } from './components/categories/CategoryCircles';
import { PromoCards } from './components/promos/PromoCards';
import { ProductSection } from './components/products/ProductSection';
import { FeatureBadges } from './components/features/FeatureBadges';
import { Newsletter } from './components/newsletter/Newsletter';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/modals/CartDrawer';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { ToastContainer } from './components/modals/ToastContainer';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { AllProductsPage } from './components/pages/AllProductsPage';
import { products } from './data/products';
import { useScrollReveal } from './utils/useScrollReveal';
import './styles/App.css';

const AppContent: React.FC = () => {
  const { currentView } = useStore();
  const { t } = useLanguage();

  // Activate scroll-reveal animations across views
  useScrollReveal(currentView);

  const trendingProducts = products.filter(p => p.section === 'trending');
  const recommendedProducts = products.filter(p => p.section === 'recommended');

  return (
    <div className="novella-app">
      {/* Top Notification Bar with Language Switcher */}
      <TopBanner />

      {/* Main Header with Search and Cart Count */}
      <Header />

      {/* Categories Sub Navigation */}
      <SubNav />

      {/* Main Dynamic View Switching */}
      <main id="main-content">
        {currentView === 'product-detail' ? (
          <ProductDetailPage />
        ) : currentView === 'products' ? (
          <AllProductsPage />
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection />

            {/* Shop by Category Circles */}
            <CategoryCircles />

            {/* 3 Promotional Cards */}
            <PromoCards />

            {/* Trending Smartphones */}
            <div id="products">
              <ProductSection
                id="trending"
                title={t.trendingNow}
                linkText={t.viewAllProducts}
                products={trendingProducts}
              />
            </div>

            {/* Trust Badges Bar */}
            <FeatureBadges />

            {/* Recommended Smartphones */}
            <ProductSection
              id="recommended"
              title={t.recommendedForYou}
              linkText={t.viewAllRecommendations}
              products={recommendedProducts}
            />

            {/* Stay in the Loop Newsletter */}
            <Newsletter />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </LanguageProvider>
  );
}

export default App;
