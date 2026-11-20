import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, Info, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'cart':
              return <ShoppingBag size={18} className="toast-icon toast-icon--cart" />;
            case 'wishlist':
              return <Heart size={18} className="toast-icon toast-icon--wishlist" fill="#E53E3E" stroke="#E53E3E" />;
            case 'info':
              return <Info size={18} className="toast-icon toast-icon--info" />;
            default:
              return <CheckCircle2 size={18} className="toast-icon toast-icon--success" />;
          }
        };

        return (
          <div key={toast.id} className={`toast-card toast-card--${toast.type}`}>
            <div className="toast-icon-wrap">{getIcon()}</div>
            <div className="toast-body">
              <h5 className="toast-title">{toast.title}</h5>
              <p className="toast-message">{toast.message}</p>
            </div>
            <button
              className="toast-close-btn"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
