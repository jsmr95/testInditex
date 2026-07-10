import { ROUTES } from '@phone-catalog/shared';
import { useToast } from '@phone-catalog/ui';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../../core/context/cart/CartContext';
import styles from './CartPage.module.css';
import { CartEmpty } from './components/CartEmpty';
import { CartItemCard } from './components/CartItemCard';
import { CartSummary } from './components/CartSummary';

export const CartPage: React.FC = () => {
  const cartContext = React.useContext(CartContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = React.useState(false);

  if (!cartContext) return null;

  const { state, removeItem, clearCart, totalItemsCount, totalPrice } = cartContext;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      showToast('ORDER PLACED SUCCESSFULLY');
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate(ROUTES.HOME);
  };

  if (state.items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>CART</h1>
        <span className={styles.count}>
          ({totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'})
        </span>
      </div>

      <div className={styles.layout}>
        {/* Left column: Cart Items */}
        <div className={styles.itemsColumn}>
          {state.items.map((item) => {
            const key = `${item.productId}-${item.selectedColor.name}-${item.selectedStorage.capacity}`;
            return <CartItemCard key={key} item={item} onRemove={removeItem} />;
          })}
        </div>

        {/* Right column: Checkout Summary */}
        <div className={styles.summaryColumn}>
          <CartSummary
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
            isProcessing={isProcessing}
            onContinueShopping={handleContinueShopping}
          />
        </div>
      </div>
    </div>
  );
};
