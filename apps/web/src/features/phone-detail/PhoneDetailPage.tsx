import { formatPrice } from '@phone-catalog/shared';
import type { ColorOption, StorageOption } from '@phone-catalog/shared';
import { Button, Image, useToast } from '@phone-catalog/ui';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { CartContext } from '../../core/context/cart/CartContext';
import styles from './PhoneDetailPage.module.css';
import { ColorSelector } from './components/ColorSelector';
import { PhoneDetailSkeleton } from './components/PhoneDetailSkeleton';
import { PhoneSpecs } from './components/PhoneSpecs';
import { SimilarProducts } from './components/SimilarProducts';
import { StorageSelector } from './components/StorageSelector';
import { usePhone } from './hooks/usePhone';

export const PhoneDetailPage: React.FC = () => {
  const { id } = useParams<{ readonly id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const cartContext = React.useContext(CartContext);

  const { phone, isLoading, error, refetch } = usePhone(id);

  const [selectedColor, setSelectedColor] = React.useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = React.useState<StorageOption | null>(null);

  // Sync selectors once product loads
  React.useEffect(() => {
    if (phone) {
      setSelectedColor(phone.colorOptions[0] ?? null);
      if (phone.storageOptions.length === 1) {
        setSelectedStorage(phone.storageOptions[0] ?? null);
      } else {
        setSelectedStorage(null);
      }
    }
  }, [phone]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    if (!phone || !selectedColor || !selectedStorage || !cartContext) return;

    cartContext.addItem({
      productId: phone.id,
      brand: phone.brand,
      name: phone.name,
      imageUrl: selectedColor.imageUrl, // Image matching selected color
      selectedColor,
      selectedStorage,
      price: selectedStorage.price,
    });

    showToast('ADDED TO BASKET');
  };

  if (error) {
    return (
      <div className={styles.errorContainer} role="alert">
        <p className={styles.errorText}>{error}</p>
        <Button variant="secondary" onClick={refetch}>
          TRY AGAIN
        </Button>
      </div>
    );
  }

  if (isLoading || !phone) {
    return <PhoneDetailSkeleton />;
  }

  return (
    <div className={styles.container}>
      <button type="button" className={styles.backBtn} onClick={handleBack} aria-label="Go back">
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
            <span className={styles.price}>
              {selectedStorage
                ? formatPrice(selectedStorage.price)
                : `Desde ${formatPrice(
                    phone.storageOptions.length > 0
                      ? Math.min(...phone.storageOptions.map((o) => o.price))
                      : phone.basePrice,
                  )}`}
            </span>
          </div>

          <ColorSelector
            options={phone.colorOptions}
            selected={selectedColor}
            onChange={setSelectedColor}
          />

          <StorageSelector
            options={phone.storageOptions}
            selected={selectedStorage}
            onChange={setSelectedStorage}
          />

          <Button
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedStorage}
          >
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
