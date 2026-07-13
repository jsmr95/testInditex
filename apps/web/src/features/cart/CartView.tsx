import type * as React from 'react';

import styles from './CartPage.module.css';
import { CartItemCard } from './components/CartItemCard';
import { CartSummary } from './components/CartSummary';
import type { CartItem } from '@phone-catalog/shared';

export interface CartViewProps {
  readonly items: readonly CartItem[];
  readonly totalItemsCount: number;
  readonly totalPrice: number;
  readonly onRemove: (productId: string, colorName: string, capacity: string) => void;
  readonly onCheckout: () => void;
  readonly onContinueShopping: () => void;
  readonly isProcessing: boolean;
}

/**
 * CartView — pure presentational component for the cart page.
 * Receives all data and callbacks as props; no hooks or side-effects.
 */
export const CartView: React.FC<CartViewProps> = ({
  items,
  totalItemsCount,
  totalPrice,
  onRemove,
  onCheckout,
  onContinueShopping,
  isProcessing,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>CART</h1>
        <span className={styles.count}>
          ({totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'})
        </span>
      </div>

      <div className={styles.layout}>
        {/* Left column: Cart items list */}
        <div className={styles.itemsColumn}>
          {items.map((item) => {
            const key = `${item.productId}-${item.selectedColor.name}-${item.selectedStorage.capacity}`;
            return <CartItemCard key={key} item={item} onRemove={onRemove} />;
          })}
        </div>

        {/* Right column: Order summary & checkout */}
        <div className={styles.summaryColumn}>
          <CartSummary
            totalPrice={totalPrice}
            onCheckout={onCheckout}
            isProcessing={isProcessing}
            onContinueShopping={onContinueShopping}
          />
        </div>
      </div>
    </div>
  );
};
