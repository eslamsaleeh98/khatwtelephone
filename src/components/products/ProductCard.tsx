import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../../types/product';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigateTo } = useStore();
  const { language } = useLanguage();
  const isFavorite = isInWishlist(product.id);

  return (
    <div
      className="product-card"
      onClick={() => navigateTo('product-detail', product.id)}
    >
      {/* Product Image Area */}
      <div className="product-card__image-container">
        <button
          className={`product-card__wishlist-btn ${isFavorite ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            fill={isFavorite ? '#E53E3E' : 'none'}
            stroke={isFavorite ? '#E53E3E' : '#4B5563'}
          />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />

        {/* Floating Brand Badge */}
        <span className="product-card__brand-pill">{product.brand}</span>
      </div>

      {/* Details */}
      <div className="product-card__details">
        {/* Colors Preview Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-card__colors-row">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                className="product-card__color-dot"
                style={{ backgroundColor: c.hex }}
                title={language === 'ar' ? c.nameAr : c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="product-card__color-more">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        <h3 className="product-card__title">
          {language === 'ar' ? product.nameAr : product.name}
        </h3>
        <span className="product-card__category">
          {language === 'ar' ? product.categoryAr : product.category}
        </span>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                className="product-card__star"
                fill="#F59E0B"
                stroke="#F59E0B"
              />
            ))}
          </div>
          <span className="product-card__reviews">({product.reviewCount})</span>
        </div>

        {/* Price & Action */}
        <div className="product-card__footer">
          <div className="product-card__prices">
            <span className="product-card__price">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="product-card__original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            className="product-card__cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            title="Add to Cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
