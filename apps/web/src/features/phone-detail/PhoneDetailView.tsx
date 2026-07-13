import type { ColorOption, ProductDetail, StorageOption } from '@phone-catalog/shared';
import { formatPrice } from '@phone-catalog/shared';
import { Button, Image } from '@phone-catalog/ui';
import type * as React from 'react';
import styles from './PhoneDetailPage.module.css';
import { ColorSelector } from './components/ColorSelector';
import { PhoneSpecs } from './components/PhoneSpecs';
import { SimilarProducts } from './components/SimilarProducts';
import { StorageSelector } from './components/StorageSelector';

export interface PhoneDetailViewProps {
  readonly phone: ProductDetail;
  readonly selectedColor: ColorOption | null;
  readonly selectedStorage: StorageOption | null;
  readonly onColorChange: (color: ColorOption) => void;
  readonly onStorageChange: (storage: StorageOption) => void;
  readonly onBack: () => void;
  readonly onAddToCart: () => void;
  readonly canAddToCart: boolean;
}

/**
 * PhoneDetailView — pure presentational component.
 * Receives all data and callbacks as props; contains zero hooks or side-effects.
 */
export const PhoneDetailView: React.FC<PhoneDetailViewProps> = ({
  phone,
  selectedColor,
  selectedStorage,
  onColorChange,
  onStorageChange,
  onBack,
  onAddToCart,
  canAddToCart,
}) => {
  const currentPrice = selectedStorage
    ? formatPrice(selectedStorage.price)
    : `Desde ${formatPrice(
        phone.storageOptions.length > 0
          ? Math.min(...phone.storageOptions.map((o) => o.price))
          : phone.basePrice,
      )}`;

  return (
    <div className={styles.container}>
      <button type="button" className={styles.backBtn} onClick={onBack} aria-label="Go back">
        &larr; BACK
      </button>

      <div className={styles.columns}>
        {/* Left column: Image showcase */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <Image
              src={selectedColor?.imageUrl ?? phone.colorOptions[0]?.imageUrl}
              alt={`${phone.brand} ${phone.name}`}
              placeholderHeight="100%"
              className={styles.image}
            />
          </div>
        </div>

        {/* Right column: Purchase & Specs info */}
        <div className={styles.infoColumn}>
          <div className={styles.header}>
            <span className={styles.brand}>{phone.brand}</span>
            <h1 className={styles.name}>{phone.name}</h1>
            <span className={styles.price}>{currentPrice}</span>
          </div>

          <ColorSelector
            options={phone.colorOptions}
            selected={selectedColor}
            onChange={onColorChange}
          />

          <StorageSelector
            options={phone.storageOptions}
            selected={selectedStorage}
            onChange={onStorageChange}
          />

          <Button variant="primary" fullWidth onClick={onAddToCart} disabled={!canAddToCart}>
            ADD TO BASKET
          </Button>
        </div>

        {/* Full-width block below: Specifications */}
        <div className={styles.specsColumn}>
          <PhoneSpecs
            brand={phone.brand}
            name={phone.name}
            description={phone.description}
            specs={phone.specs}
          />
        </div>
      </div>

      <SimilarProducts products={phone.similarProducts} />
    </div>
  );
};
