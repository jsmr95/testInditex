import type * as React from 'react';

import styles from './CartSummary.module.css';
import { formatPrice } from '@phone-catalog/shared';
import { Button } from '@phone-catalog/ui';

export interface CartSummaryProps {
  readonly totalPrice: number;
  readonly onCheckout: () => void;
  readonly isProcessing?: boolean;
  readonly onContinueShopping?: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totalPrice,
  onCheckout,
  isProcessing = false,
  onContinueShopping,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ORDER SUMMARY</h2>
      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.label}>SUBTOTAL</span>
          <span className={styles.value}>{formatPrice(totalPrice)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>SHIPPING</span>
          <span className={styles.value}>FREE</span>
        </div>
        <div className={`${styles.row} ${styles.totalRow}`}>
          <span className={styles.totalLabel}>TOTAL</span>
          <span className={styles.totalValue}>{formatPrice(totalPrice)}</span>
        </div>
      </div>
      <Button variant="primary" fullWidth onClick={onCheckout} isLoading={isProcessing}>
        PROCESS ORDER
      </Button>
      {onContinueShopping && (
        <Button
          variant="secondary"
          fullWidth
          onClick={onContinueShopping}
          className={styles.continueBtn}
          disabled={isProcessing}
        >
          CONTINUE SHOPPING
        </Button>
      )}
    </div>
  );
};
