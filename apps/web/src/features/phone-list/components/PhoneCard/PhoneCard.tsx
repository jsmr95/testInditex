import { ROUTES, formatPrice } from '@phone-catalog/shared';
import type { ProductListItem } from '@phone-catalog/shared';
import { Image } from '@phone-catalog/ui';
import type * as React from 'react';
import { Link } from 'react-router';
import styles from './PhoneCard.module.css';

export interface PhoneCardProps {
  readonly phone: ProductListItem;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  const { id, brand, name, basePrice, imageUrl } = phone;

  return (
    <Link
      to={ROUTES.PRODUCT_DETAIL_PATH(id)}
      className={styles.card}
      aria-label={`${brand} ${name}, precio ${formatPrice(basePrice)}`}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={`${brand} ${name}`}
          placeholderHeight={380}
          className={styles.image}
          wrapperClassName={styles.imageInnerWrapper}
        />
        <div className={styles.info}>
          <div className={styles.details}>
            <span className={styles.brand}>{brand}</span>
            <h2 className={styles.name}>{name}</h2>
          </div>
          <span className={styles.price}>{formatPrice(basePrice)}</span>
        </div>
      </div>
    </Link>
  );
};
