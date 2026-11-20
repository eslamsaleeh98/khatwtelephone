import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Cpu,
  Smartphone,
  Camera,
  Battery,
  Layers,
  Plus,
  Minus,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { ProductCard } from '../products/ProductCard';
import { products } from '../../data/products';
import type { ProductColor, ProductStorage } from '../../types/product';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen
  } = useStore();
  const { t, language, isRTL } = useLanguage();

  const product = selectedProduct || products[0];

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<ProductStorage>(product.storageOptions[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Lightbox Zoom Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Compile full gallery images: color-specific image first, then product gallery, then fallback
  const galleryImages = useMemo(() => {
    const list: string[] = [];
    if (selectedColor?.image) list.push(selectedColor.image);
    if (product.image && !list.includes(product.image)) list.push(product.image);
    if (product.gallery) {
      product.gallery.forEach(img => {
        if (!list.includes(img)) list.push(img);
      });
    }
    // Provide additional high-res phone angles if gallery is short
    if (list.length < 3) {
      list.push('https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=85');
      list.push('https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1000&q=85');
    }
    return list;
  }, [product, selectedColor]);

  const currentImage = galleryImages[activeImageIndex] || galleryImages[0];

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedStorage(product.storageOptions[0]);
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isLightboxOpen) return;
    if (e.key === 'Escape') {
      setIsLightboxOpen(false);
      setZoomLevel(1);
    } else if (e.key === 'ArrowRight') {
      setActiveImageIndex(prev => (prev + 1) % galleryImages.length);
    } else if (e.key === 'ArrowLeft') {
      setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    }
  }, [isLightboxOpen, galleryImages.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentPrice = product.price + (selectedStorage?.priceDelta || 0);
  const isFav = isInWishlist(product.id);

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    setIsCartOpen(true);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev + 1) % galleryImages.length);
  };

  const openZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLightboxOpen(true);
    setZoomLevel(1);
  };

  return (
    <div className="product-detail-page page-view-enter">
      <div className="container">
        {/* Breadcrumb Navigation with Back button that smoothly restores previous position */}
        <div className="detail-breadcrumb">
          <button
            id="detail-back-home-btn"
            className="detail-back-btn"
            onClick={() => navigateTo('home')}
            title="الرجوع إلى الموضع السابق"
          >
            <ArrowLeft size={16} className={isRTL ? 'flip-rtl' : ''} />
            <span>{t.backToProducts}</span>
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-cat">{language === 'ar' ? product.categoryAr : product.category}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-active">{language === 'ar' ? product.nameAr : product.name}</span>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="detail-grid">
          {/* Media Showcase & Multi-Image Gallery */}
          <div className="detail-media-wrap">
            <div className="detail-main-image-container">
              <div
                className="detail-main-image"
                onClick={openZoom}
                title={language === 'ar' ? 'انقر لتكبير الصورة' : 'Click to zoom in'}
              >
                <img
                  src={currentImage}
                  alt={`${product.name} - view ${activeImageIndex + 1}`}
                  className="detail-img"
                />

                {/* Floating Zoom Action Button */}
                <button
                  type="button"
                  className="detail-zoom-trigger-btn"
                  onClick={openZoom}
                  aria-label="Zoom Image"
                >
                  <ZoomIn size={16} />
                  <span>{language === 'ar' ? 'تكبير' : 'Zoom'}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  className={`detail-wishlist-float ${isFav ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  title="Wishlist"
                >
                  <Heart
                    size={20}
                    fill={isFav ? '#E53E3E' : 'none'}
                    stroke={isFav ? '#E53E3E' : '#4B5563'}
                  />
                </button>

                {/* Main Image Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="detail-gallery-arrow detail-gallery-arrow--prev"
                      onClick={handlePrevImage}
                      aria-label="Previous Image"
                    >
                      <ChevronLeft size={22} className={isRTL ? 'flip-rtl' : ''} />
                    </button>
                    <button
                      type="button"
                      className="detail-gallery-arrow detail-gallery-arrow--next"
                      onClick={handleNextImage}
                      aria-label="Next Image"
                    >
                      <ChevronRight size={22} className={isRTL ? 'flip-rtl' : ''} />
                    </button>
                  </>
                )}

                {/* Image Counter Badge */}
                <div className="detail-gallery-badge">
                  {activeImageIndex + 1} / {galleryImages.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Strip with Active Rings */}
            {galleryImages.length > 1 && (
              <div className="detail-gallery-thumbs-row">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`gallery-thumb-btn ${activeImageIndex === idx ? 'is-active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    title={`عرض صورة ${idx + 1}`}
                  >
                    <img src={img} alt={`thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Selection Options */}
          <div className="detail-info-wrap">
            <div className="detail-brand-badge">{product.brand}</div>
            <h1 className="detail-title">{language === 'ar' ? product.nameAr : product.name}</h1>

            {/* Ratings */}
            <div className="detail-rating-row">
              <div className="product-card__stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F59E0B" stroke="#F59E0B" />
                ))}
              </div>
              <span className="detail-rating-score">{product.rating}</span>
              <span className="detail-rating-reviews">({product.reviewCount} {t.reviewsCount})</span>
              <span className="detail-stock-indicator">
                <Check size={14} /> {t.inStockReady}
              </span>
            </div>

            {/* Pricing Section */}
            <div className="detail-price-box">
              <div className="detail-price-main">
                <span className="detail-price-currency">$</span>
                <span className="detail-price-amount">{currentPrice.toFixed(2)}</span>
              </div>
              {product.originalPrice > product.price && (
                <div className="detail-price-old-wrap">
                  <span className="detail-price-original">
                    ${(product.originalPrice + (selectedStorage?.priceDelta || 0)).toFixed(2)}
                  </span>
                  <span className="detail-discount-badge">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% {language === 'ar' ? 'خصم' : 'OFF'}
                  </span>
                </div>
              )}
            </div>

            <p className="detail-desc">
              {language === 'ar' ? product.descriptionAr : product.description}
            </p>

            {/* 1. COLOR SELECTION */}
            <div className="detail-option-group">
              <div className="detail-option-header">
                <span className="detail-option-label">{t.chooseColor}:</span>
                <span className="detail-option-selected">
                  {language === 'ar' ? selectedColor.nameAr : selectedColor.name}
                </span>
              </div>
              <div className="detail-colors-list">
                {product.colors.map((color) => {
                  const isColorActive = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      className={`detail-color-pill ${isColorActive ? 'is-selected' : ''}`}
                      onClick={() => {
                        setSelectedColor(color);
                        if (color.image) {
                          const idx = galleryImages.indexOf(color.image);
                          if (idx !== -1) setActiveImageIndex(idx);
                        }
                      }}
                    >
                      <span className="color-swatch-circle" style={{ backgroundColor: color.hex }} />
                      <span className="color-swatch-name">
                        {language === 'ar' ? color.nameAr : color.name}
                      </span>
                      {isColorActive && <Check size={14} className="color-check-icon" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. STORAGE TIER SELECTION */}
            <div className="detail-option-group">
              <div className="detail-option-header">
                <span className="detail-option-label">{t.chooseStorage}:</span>
                <span className="detail-option-selected">{selectedStorage.size}</span>
              </div>
              <div className="detail-storage-grid">
                {product.storageOptions.map((storage) => {
                  const isStorageActive = selectedStorage.size === storage.size;
                  return (
                    <button
                      key={storage.size}
                      type="button"
                      className={`detail-storage-card ${isStorageActive ? 'is-selected' : ''}`}
                      onClick={() => setSelectedStorage(storage)}
                    >
                      <span className="storage-card-size">{storage.size}</span>
                      <span className="storage-card-delta">
                        {storage.priceDelta === 0
                          ? (language === 'ar' ? 'السعر الأساسي' : 'Base')
                          : `+$${storage.priceDelta}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. QUANTITY & CART ACTIONS */}
            <div className="detail-action-box">
              <div className="detail-qty-picker">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={15} />
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                className="detail-add-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>{t.addToCart}</span>
              </button>

              <button
                type="button"
                className="detail-buy-now-btn"
                onClick={handleBuyNow}
              >
                <Zap size={18} />
                <span>{t.buyNow}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="detail-trust-cards">
              <div className="detail-trust-card">
                <Truck size={20} className="trust-icon" />
                <div>
                  <h4>{language === 'ar' ? 'شحن سريع ومجاني' : 'Free Express Delivery'}</h4>
                  <p>{language === 'ar' ? 'توصيل خلال 24-48 ساعة' : 'Arrives in 24-48 hours'}</p>
                </div>
              </div>
              <div className="detail-trust-card">
                <ShieldCheck size={20} className="trust-icon" />
                <div>
                  <h4>{language === 'ar' ? 'ضمان رسمي عامين' : '2-Year Official Warranty'}</h4>
                  <p>{language === 'ar' ? 'وكالة معتمدة 100%' : '100% genuine guaranteed'}</p>
                </div>
              </div>
              <div className="detail-trust-card">
                <RotateCcw size={20} className="trust-icon" />
                <div>
                  <h4>{language === 'ar' ? 'إرجاع سهل 30 يوماً' : 'Easy 30-Day Returns'}</h4>
                  <p>{language === 'ar' ? 'استبدال أو استرجاع نقدي' : 'Hassle-free money back'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Matrix */}
        <div className="detail-specs-section">
          <h2 className="detail-section-heading">
            {language === 'ar' ? 'المواصفات التقنية الكاملة' : 'Technical Specifications'}
          </h2>
          <div className="detail-specs-grid">
            <div className="spec-card">
              <Smartphone size={22} className="spec-icon" />
              <span className="spec-name">{language === 'ar' ? 'الشاشة والعرض' : 'Display'}</span>
              <span className="spec-val">{product.specs.display}</span>
            </div>
            <div className="spec-card">
              <Cpu size={22} className="spec-icon" />
              <span className="spec-name">{language === 'ar' ? 'المعالج والأداء' : 'Processor'}</span>
              <span className="spec-val">{product.specs.processor}</span>
            </div>
            <div className="spec-card">
              <Camera size={22} className="spec-icon" />
              <span className="spec-name">{language === 'ar' ? 'نظام الكاميرات' : 'Camera System'}</span>
              <span className="spec-val">{product.specs.camera}</span>
            </div>
            <div className="spec-card">
              <Battery size={22} className="spec-icon" />
              <span className="spec-name">{language === 'ar' ? 'البطارية والشحن' : 'Battery & Power'}</span>
              <span className="spec-val">{product.specs.battery}</span>
            </div>
            <div className="spec-card">
              <Layers size={22} className="spec-icon" />
              <span className="spec-name">{language === 'ar' ? 'نظام التشغيل' : 'Operating System'}</span>
              <span className="spec-val">{product.specs.os}</span>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="detail-related-section">
            <div className="section-header">
              <h2 className="section-title">
                {language === 'ar' ? 'منتجات ذات صلة قد تعجبك' : 'Related Flagships'}
              </h2>
            </div>
            <div className="product-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX ZOOM MODAL (معرض التكبير التفاعلي) */}
      {isLightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => {
            setIsLightboxOpen(false);
            setZoomLevel(1);
          }}
        >
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Top Toolbar */}
            <div className="lightbox-toolbar">
              <div className="lightbox-title-info">
                <span className="lightbox-name">
                  {language === 'ar' ? product.nameAr : product.name}
                </span>
                <span className="lightbox-counter">
                  ({activeImageIndex + 1} / {galleryImages.length})
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="lightbox-controls">
                <button
                  type="button"
                  className="lightbox-ctrl-btn"
                  onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 3))}
                  title="تكبير"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  type="button"
                  className="lightbox-ctrl-btn"
                  onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 1))}
                  title="تصغير"
                  disabled={zoomLevel <= 1}
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  type="button"
                  className="lightbox-ctrl-btn"
                  onClick={() => setZoomLevel(1)}
                  title="إعادة ضبط"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  className="lightbox-ctrl-btn lightbox-ctrl-btn--close"
                  onClick={() => {
                    setIsLightboxOpen(false);
                    setZoomLevel(1);
                  }}
                  title="إغلاق (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Lightbox Viewport */}
            <div className="lightbox-viewport">
              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-btn--prev"
                onClick={handlePrevImage}
                aria-label="Previous"
              >
                <ChevronLeft size={30} className={isRTL ? 'flip-rtl' : ''} />
              </button>

              <div
                className="lightbox-image-stage"
                onClick={() => setZoomLevel(prev => (prev === 1 ? 2 : 1))}
              >
                <img
                  src={currentImage}
                  alt={product.name}
                  className="lightbox-magnified-img"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in'
                  }}
                />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-btn--next"
                onClick={handleNextImage}
                aria-label="Next"
              >
                <ChevronRight size={30} className={isRTL ? 'flip-rtl' : ''} />
              </button>
            </div>

            {/* Bottom Thumbnails Strip inside Lightbox */}
            <div className="lightbox-thumbs-bar">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`lightbox-thumb ${activeImageIndex === idx ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setZoomLevel(1);
                  }}
                >
                  <img src={img} alt={`thumb ${idx}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
