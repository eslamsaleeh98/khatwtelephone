import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Check, Shield } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuickView();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const isFavorite = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    closeQuickView();
  };

  return (
    <div className="modal-overlay" onClick={closeQuickView}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeQuickView} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Product Image */}
          <div className="quickview-media">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="quickview-img"
            />
          </div>

          {/* Product Information */}
          <div className="quickview-details">
            <span className="quickview-category">{quickViewProduct.category}</span>
            <h2 className="quickview-title">{quickViewProduct.name}</h2>

            <div className="quickview-rating">
              <div className="product-card__stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill="#F59E0B"
                    stroke="#F59E0B"
                  />
                ))}
              </div>
              <span className="quickview-rating-val">{quickViewProduct.rating}</span>
              <span className="quickview-review-count">({quickViewProduct.reviewCount} customer reviews)</span>
            </div>

            <div className="quickview-price-wrap">
              <span className="quickview-price">${quickViewProduct.price.toFixed(2)}</span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <span className="quickview-original-price">
                  ${quickViewProduct.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="quickview-stock-badge">
                <Check size={14} /> In Stock & Ready to Ship
              </span>
            </div>

            <p className="quickview-desc">{quickViewProduct.description}</p>

            {quickViewProduct.features && (
              <ul className="quickview-features">
                {quickViewProduct.features.map((feat, i) => (
                  <li key={i}>
                    <Check size={14} className="feature-check" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Actions */}
            <div className="quickview-actions">
              <div className="cart-item__qty-control quickview-qty">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button className="quickview-add-btn" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>Add to Cart - ${(quickViewProduct.price * quantity).toFixed(2)}</span>
              </button>

              <button
                className={`quickview-wishlist-btn ${isFavorite ? 'is-active' : ''}`}
                onClick={() => toggleWishlist(quickViewProduct.id)}
                title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={20}
                  fill={isFavorite ? '#E53E3E' : 'none'}
                  stroke={isFavorite ? '#E53E3E' : '#4B5563'}
                />
              </button>
            </div>

            <div className="quickview-security">
              <Shield size={16} />
              <span>30-Day Money Back Guarantee &bull; 100% Authentic Products</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
