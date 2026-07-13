import type * as React from 'react';

import styles from './CartItemCard.module.css';
import type { CartItem } from '@phone-catalog/shared';
import { formatPrice } from '@phone-catalog/shared';
import { Image } from '@phone-catalog/ui';

export interface CartItemCardProps {
  readonly item: CartItem;
  readonly onRemove: (productId: string, colorName: string, capacity: string) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove }) => {
  const { productId, brand, name, imageUrl, selectedColor, selectedStorage, price, quantity } =
    item;

  const handleRemove = () => {
    onRemove(productId, selectedColor.name, selectedStorage.capacity);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={`${brand} ${name}`}
          placeholderHeight={120}
          className={styles.image}
        />
      </div>

      <div className={styles.details}>
        <div className={styles.header}>
          <div className={styles.titleInfo}>
            <span className={styles.brand}>{brand}</span>
            <h2 className={styles.name}>{name}</h2>
          </div>
          <span className={styles.price}>{formatPrice(price * quantity)}</span>
        </div>

        <div className={styles.options}>
          <span className={styles.option}>COLOR: {selectedColor.name.toUpperCase()}</span>
          <span className={styles.option}>STORAGE: {selectedStorage.capacity}</span>
          {quantity > 1 && <span className={styles.option}>QUANTITY: {quantity}</span>}
        </div>

        <button
          type="button"
          className={styles.removeBtn}
          onClick={handleRemove}
          aria-label={`Remove ${brand} ${name} from cart`}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};
