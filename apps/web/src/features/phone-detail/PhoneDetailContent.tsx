import type { ColorOption, ProductDetail, StorageOption } from '@phone-catalog/shared';
import { useToast } from '@phone-catalog/ui';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../../core/context/cart/CartContext';
import { PhoneDetailView } from './PhoneDetailView';
import { getPhoneDetailPromise } from './phone-detail.data';

// ─── Interaction layer ───────────────────────────────────────────────────────

interface PhoneDetailLoadedProps {
  readonly phone: ProductDetail;
}

/**
 * PhoneDetailLoaded — state and interaction layer.
 * Receives `phone` as a prop (already resolved), so all hooks run at the top level
 * with data available from the very first render. No useEffect needed.
 *
 * `key={id}` on PhoneDetailContent guarantees remount when the product changes,
 * which resets these useState initializers automatically.
 */
const PhoneDetailLoaded: React.FC<PhoneDetailLoadedProps> = ({ phone }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const cartContext = React.useContext(CartContext);

  // Data is synchronously available → useState initializers work without useEffect
  const [selectedColor, setSelectedColor] = React.useState<ColorOption | null>(
    phone.colorOptions[0] ?? null,
  );
  const [selectedStorage, setSelectedStorage] = React.useState<StorageOption | null>(
    phone.storageOptions.length === 1 ? (phone.storageOptions[0] ?? null) : null,
  );

  const handleBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleAddToCart = React.useCallback(() => {
    if (!selectedColor || !selectedStorage || !cartContext) return;

    cartContext.addItem({
      productId: phone.id,
      brand: phone.brand,
      name: phone.name,
      imageUrl: selectedColor.imageUrl,
      selectedColor,
      selectedStorage,
      price: selectedStorage.price,
    });

    showToast('ADDED TO BASKET');
  }, [phone, selectedColor, selectedStorage, cartContext, showToast]);

  return (
    <PhoneDetailView
      phone={phone}
      selectedColor={selectedColor}
      selectedStorage={selectedStorage}
      onColorChange={setSelectedColor}
      onStorageChange={setSelectedStorage}
      onBack={handleBack}
      onAddToCart={handleAddToCart}
      canAddToCart={Boolean(selectedColor && selectedStorage)}
    />
  );
};

// ─── Data-fetching layer ─────────────────────────────────────────────────────

interface PhoneDetailContentProps {
  readonly id: string;
}

/**
 * PhoneDetailContent — suspending data-fetching layer.
 *
 * Uses React 19's `use()` to read a cached promise.
 * While pending → Suspense shows <PhoneDetailSkeleton />.
 * If the Result is an error → throws to the nearest ErrorBoundary.
 * On success → delegates rendering to PhoneDetailLoaded.
 *
 * NOTE: this component must always be rendered inside <Suspense>.
 */
export const PhoneDetailContent: React.FC<PhoneDetailContentProps> = ({ id }) => {
  const result = React.use(getPhoneDetailPromise(id));

  if (!result.ok) {
    throw result.error;
  }

  return <PhoneDetailLoaded phone={result.data} />;
};
