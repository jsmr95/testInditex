import * as React from 'react';
import { useParams } from 'react-router';

import { PhoneDetailSkeleton } from './components/PhoneDetailSkeleton';
import { invalidatePhoneDetailCache } from './phone-detail.data';
import { PhoneDetailContent } from './PhoneDetailContent';
import styles from './PhoneDetailPage.module.css';
import { Button } from '@phone-catalog/ui';
import { ErrorBoundary } from '@phone-catalog/ui';

/**
 * PhoneDetailPage — Suspense + ErrorBoundary orchestrator.
 *
 * - Suspense: shows <PhoneDetailSkeleton /> while data loads.
 * - key={id} on <PhoneDetailContent>: forces a full remount (including state reset
 *   of selectedColor/Storage) whenever the user navigates to a different product.
 * - ErrorBoundary: catches errors thrown by use() inside PhoneDetailContent.
 *   A key based on id+errorKey forces remount on retry.
 */
export const PhoneDetailPage: React.FC = () => {
  const { id } = useParams<{ readonly id: string }>();
  const [errorKey, setErrorKey] = React.useState(0);

  const handleRetry = React.useCallback(() => {
    if (id) invalidatePhoneDetailCache(id);
    setErrorKey((k) => k + 1);
  }, [id]);

  if (!id) {
    return (
      <div className={styles.errorContainer} role="alert">
        <p className={styles.errorText}>Invalid product ID.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary
      key={`${id}-${errorKey}`}
      fallback={
        <div className={styles.errorContainer} role="alert">
          <p className={styles.errorText}>Error loading product. Please try again.</p>
          <Button variant="secondary" onClick={handleRetry}>
            TRY AGAIN
          </Button>
        </div>
      }
    >
      <React.Suspense fallback={<PhoneDetailSkeleton />}>
        {/* key={id} resets color/storage selection when navigating between products */}
        <PhoneDetailContent key={id} id={id} />
      </React.Suspense>
    </ErrorBoundary>
  );
};
