import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  ChevronRight,
  Maximize2,
  Minimize2,
  Share2,
  Move,
  Sparkles
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
    setIsCartOpen,
    showToast
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
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Compile full gallery images: color-specific image first, then product gallery
  const galleryImages = useMemo(() => {
    const list: string[] = [];
    if (selectedColor?.image) list.push(selectedColor.image);
    if (product.image && !list.includes(product.image)) list.push(product.image);
    if (product.gallery) {
      product.gallery.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    // High-res complementary angles
    if (list.length < 3) {
      list.push('https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=85');
      list.push('https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=1200&q=85');
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

  // Reset zoom & pan when image changes or lightbox toggles
  useEffect(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [activeImageIndex, isLightboxOpen]);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (isRTL ? (prev === 0 ? galleryImages.length - 1 : prev - 1) : (prev + 1) % galleryImages.length));
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (isRTL ? (prev + 1) % galleryImages.length : (prev === 0 ? galleryImages.length - 1 : prev - 1)));
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.5, 3.5));
      } else if (e.key === '-' || e.key === '_') {
        setZoomLevel((prev) => Math.max(prev - 0.5, 1));
      }
    },
    [isLightboxOpen, isRTL, galleryImages.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Body scroll lock during lightbox
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  const currentPrice = product.price + (selectedStorage?.priceDelta || 0);
  const originalPriceWithDelta = product.originalPrice + (selectedStorage?.priceDelta || 0);
  const discountPercent = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const isFav = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
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
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const openZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLightboxOpen(true);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      lightboxRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleWheelZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomLevel((prev) => Math.min(prev + 0.25, 3.5));
    } else {
      setZoomLevel((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPanOffset({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomLevel === 1) {
      setZoomLevel(2);
    } else if (zoomLevel === 2) {
      setZoomLevel(3);
    } else {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(
        language === 'ar' ? 'تم نسخ الرابط' : 'Link Copied',
        language === 'ar' ? 'تم نسخ رابط المنتج إلى الحافظة بنجاح.' : 'Product link copied to clipboard.',
        'info'
      );
    }
  };

  return (
    <div className="product-detail-page page-view-enter">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="detail-breadcrumb">
          <button
            id="detail-back-home-btn"
            className="detail-back-btn"
            onClick={() => navigateTo('home')}
            title="الرجوع إلى المتجر"
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
                title={language === 'ar' ? 'انقر لتكبير وتفحص الصورة' : 'Click to inspect & zoom in'}
              >
                <img
                  src={currentImage}
                  alt={`${product.name} - view ${activeImageIndex + 1}`}
                  className="detail-img"
                  loading="eager"
                />

                {/* Floating Top Left Zoom Action Button */}
                <button
                  type="button"
                  className="detail-zoom-trigger-btn"
                  onClick={openZoom}
                  aria-label="Zoom Image"
                >
                  <ZoomIn size={15} />
                  <span>{language === 'ar' ? 'تكبير وتفحص' : 'Click to Zoom'}</span>
                </button>

                {/* Floating Action Controls */}
                <div className="detail-floating-actions">
                  <button
                    type="button"
                    className={`detail-action-float ${isFav ? 'is-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    title={language === 'ar' ? 'إضافة إلى المفضلة' : 'Wishlist'}
                  >
                    <Heart
                      size={18}
                      fill={isFav ? '#E63946' : 'none'}
                      stroke={isFav ? '#E63946' : '#1F2937'}
                    />
                  </button>
                  <button
                    type="button"
                    className="detail-action-float"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                    title={language === 'ar' ? 'مشاركة الرابط' : 'Share'}
                  >
                    <Share2 size={17} stroke="#1F2937" />
                  </button>
                </div>

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

            {/* Highlights Bar */}
            {product.featuresAr && (
              <div className="detail-features-checklist">
                {(language === 'ar' ? product.featuresAr : product.features || product.featuresAr).map((feat, i) => (
                  <div key={i} className="detail-feature-item">
                    <Check size={15} className="detail-feature-icon" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Selection Options */}
          <div className="detail-info-wrap">
            {/* Brand Pill & Category */}
            <div className="detail-brand-row">
              <span className="detail-brand-pill">{product.brand}</span>
              <span className="detail-category-tag">{language === 'ar' ? product.categoryAr : product.category}</span>
            </div>

            <h1 className="detail-title">{language === 'ar' ? product.nameAr : product.name}</h1>

            {/* Ratings & Stock Availability */}
            <div className="detail-rating-row">
              <div className="detail-stars">
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
              <div className="detail-price-main-row">
                <div className="detail-price-main">
                  <span className="detail-price-currency">$</span>
                  <span className="detail-price-amount">{currentPrice.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="detail-price-old-wrap">
                    <span className="detail-price-original">
                      ${originalPriceWithDelta.toFixed(2)}
                    </span>
                    <span className="detail-discount-badge">
                      -{discountPercent}% {language === 'ar' ? 'خصم فوري' : 'OFF'}
                    </span>
                  </div>
                )}
              </div>
              <div className="detail-price-perk">
                <Sparkles size={14} />
                <span>{language === 'ar' ? 'يشمل ضريبة القيمة المضافة • شحن مجاني لكافة المدن' : 'VAT Included • Free Express Nationwide Shipping'}</span>
              </div>
            </div>

            {/* Description */}
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
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
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
                  <h4>{language === 'ar' ? 'شحن فوري ومجاني' : 'Free Express Delivery'}</h4>
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
              <div className="spec-card-head">
                <Smartphone size={20} className="spec-icon" />
                <span className="spec-name">{language === 'ar' ? 'الشاشة والعرض' : 'Display'}</span>
              </div>
              <span className="spec-val">{product.specs.display}</span>
            </div>
            <div className="spec-card">
              <div className="spec-card-head">
                <Cpu size={20} className="spec-icon" />
                <span className="spec-name">{language === 'ar' ? 'المعالج والأداء' : 'Processor'}</span>
              </div>
              <span className="spec-val">{product.specs.processor}</span>
            </div>
            <div className="spec-card">
              <div className="spec-card-head">
                <Camera size={20} className="spec-icon" />
                <span className="spec-name">{language === 'ar' ? 'نظام الكاميرات' : 'Camera System'}</span>
              </div>
              <span className="spec-val">{product.specs.camera}</span>
            </div>
            <div className="spec-card">
              <div className="spec-card-head">
                <Battery size={20} className="spec-icon" />
                <span className="spec-name">{language === 'ar' ? 'البطارية والشحن' : 'Battery & Power'}</span>
              </div>
              <span className="spec-val">{product.specs.battery}</span>
            </div>
            <div className="spec-card">
              <div className="spec-card-head">
                <Layers size={20} className="spec-icon" />
                <span className="spec-name">{language === 'ar' ? 'نظام التشغيل' : 'Operating System'}</span>
              </div>
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
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX ZOOM MODAL (معرض التكبير التفاعلي عبر React Portal) */}
      {isLightboxOpen &&
        createPortal(
          <div
            className="lightbox-overlay"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className={`lightbox-dialog ${isFullscreen ? 'is-fullscreen' : ''}`}
              ref={lightboxRef}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Toolbar */}
              <div className="lightbox-toolbar">
                <div className="lightbox-title-info">
                  <span className="lightbox-name">
                    {language === 'ar' ? product.nameAr : product.name}
                  </span>
                  <span className="lightbox-bullet">•</span>
                  <span className="lightbox-color-name">
                    {language === 'ar' ? selectedColor.nameAr : selectedColor.name}
                  </span>
                  <span className="lightbox-counter">
                    ({activeImageIndex + 1} / {galleryImages.length})
                  </span>
                </div>

                {/* Zoom Controls & Tools */}
                <div className="lightbox-controls">
                  <div className="lightbox-zoom-meter">
                    {Math.round(zoomLevel * 100)}%
                  </div>

                  <button
                    type="button"
                    className="lightbox-ctrl-btn"
                    onClick={() => setZoomLevel((prev) => Math.min(prev + 0.5, 3.5))}
                    title={language === 'ar' ? 'تكبير (+)' : 'Zoom In (+)'}
                  >
                    <ZoomIn size={18} />
                  </button>
                  <button
                    type="button"
                    className="lightbox-ctrl-btn"
                    onClick={() => {
                      setZoomLevel((prev) => {
                        const next = Math.max(prev - 0.5, 1);
                        if (next === 1) setPanOffset({ x: 0, y: 0 });
                        return next;
                      });
                    }}
                    title={language === 'ar' ? 'تصغير (-)' : 'Zoom Out (-)'}
                    disabled={zoomLevel <= 1}
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    type="button"
                    className="lightbox-ctrl-btn"
                    onClick={() => {
                      setZoomLevel(1);
                      setPanOffset({ x: 0, y: 0 });
                    }}
                    title={language === 'ar' ? 'إعادة ضبط التكبير' : 'Reset Zoom'}
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    type="button"
                    className="lightbox-ctrl-btn"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? (language === 'ar' ? 'خروج من ملء الشاشة' : 'Exit Fullscreen') : (language === 'ar' ? 'ملء الشاشة' : 'Fullscreen')}
                  >
                    {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                  </button>
                  <button
                    type="button"
                    className="lightbox-ctrl-btn lightbox-ctrl-btn--close"
                    onClick={() => setIsLightboxOpen(false)}
                    title={language === 'ar' ? 'إغلاق (Esc)' : 'Close (Esc)'}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Main Lightbox Viewport */}
              <div
                className="lightbox-viewport"
                onWheel={handleWheelZoom}
              >
                {/* Navigation Arrows */}
                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-nav-btn--prev"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} className={isRTL ? 'flip-rtl' : ''} />
                </button>

                {/* Magnified Image Stage with Drag & Pan */}
                <div
                  className={`lightbox-image-stage ${zoomLevel > 1 ? (isDragging ? 'is-dragging' : 'can-drag') : 'can-zoom'}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onClick={handleImageClick}
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="lightbox-magnified-img"
                    draggable={false}
                    style={{
                      transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`
                    }}
                  />

                  {/* Zoom hint overlay badge */}
                  {zoomLevel > 1 ? (
                    <div className="lightbox-pan-hint">
                      <Move size={14} />
                      <span>{language === 'ar' ? 'اسحب لتحريك الصورة وتفحص التفاصيل' : 'Drag to pan and inspect details'}</span>
                    </div>
                  ) : (
                    <div className="lightbox-click-hint">
                      <ZoomIn size={14} />
                      <span>{language === 'ar' ? 'انقر أو مرّر عجلة الماوس للتكبير' : 'Click or scroll wheel to zoom'}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-nav-btn--next"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={28} className={isRTL ? 'flip-rtl' : ''} />
                </button>
              </div>

              {/* Bottom Thumbnails Strip */}
              <div className="lightbox-thumbs-bar">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`lightbox-thumb ${activeImageIndex === idx ? 'is-active' : ''}`}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setZoomLevel(1);
                      setPanOffset({ x: 0, y: 0 });
                    }}
                  >
                    <img src={img} alt={`thumb ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
