import type * as React from 'react';
import { Link } from 'react-router';

import styles from './SimilarProducts.module.css';
import type { ProductListItem } from '@phone-catalog/shared';
import { ROUTES, formatPrice } from '@phone-catalog/shared';
import { Image } from '@phone-catalog/ui';

export interface SimilarProductsProps {
  readonly products: readonly ProductListItem[];
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  if (products.length === 0) return null;

  // Render max 4 items
  const displayProducts = products.slice(0, 4);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>SIMILAR ITEMS</h3>
      <div className={styles.carousel}>
        {displayProducts.map((product) => (
          <Link
            key={product.id}
            to={ROUTES.PRODUCT_DETAIL_PATH(product.id)}
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={product.imageUrl}
                alt={`${product.brand} ${product.name}`}
                placeholderHeight="100%"
                className={styles.image}
                wrapperClassName={styles.imageInnerWrapper}
              />
              <div className={styles.info}>
                <div className={styles.leftInfo}>
                  <span className={styles.brand}>{product.brand}</span>
                  <span className={styles.name}>{product.name}</span>
                </div>
                <span className={styles.price}>{formatPrice(product.basePrice)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
