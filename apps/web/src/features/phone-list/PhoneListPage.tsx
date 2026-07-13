import * as React from 'react';

import { PhoneListSkeleton } from './components/PhoneListSkeleton';
import { SearchBar } from './components/SearchBar';
import { invalidatePhoneListCache } from './phone-list.data';
import { PhoneListContent } from './PhoneListContent';
import styles from './PhoneListPage.module.css';
import { Button } from '@phone-catalog/ui';
import { ErrorBoundary } from '@phone-catalog/ui';

/**
 * PhoneListPage — orchestrator with useTransition + Suspense.
 *
 * useTransition: search state updates are marked as non-urgent.
 * While a new search is loading, React keeps the previous results
 * visible (dimmed via isPending) instead of flashing a skeleton.
 * The skeleton is only shown on the FIRST load.
 *
 * ErrorBoundary: per-section boundary so a fetch error doesn't crash
 * the whole page. A `key` prop forces remount (fresh error state) on retry.
 */
export const PhoneListPage: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [isPending, startTransition] = React.useTransition();
  const [errorKey, setErrorKey] = React.useState(0);

  const handleSearch = React.useCallback((query: string) => {
    // Mark as a low-priority transition: keeps old results visible while loading
    startTransition(() => setSearch(query));
  }, []);

  const handleRetry = React.useCallback(() => {
    // Remove the bad promise from the cache so the next render creates a fresh one
    invalidatePhoneListCache(search);
    // Increment key to remount ErrorBoundary (resetting its error state)
    setErrorKey((k) => k + 1);
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.pageTitle}>SMARTPHONES</h1>
        </div>
        <SearchBar value={search} onChange={handleSearch} />
      </div>

      <ErrorBoundary
        key={errorKey}
        fallback={
          <div className={styles.errorContainer} role="alert">
            <p className={styles.errorText}>Error loading phones. Please try again.</p>
            <Button variant="secondary" onClick={handleRetry}>
              TRY AGAIN
            </Button>
          </div>
        }
      >
        <React.Suspense fallback={<PhoneListSkeleton count={8} />}>
          <PhoneListContent query={search} isPending={isPending} />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};
