import type * as React from 'react';

import { PhoneGrid } from './components/PhoneGrid';
import { PhoneListSkeleton } from './components/PhoneListSkeleton';
import { SearchBar } from './components/SearchBar';
import styles from './PhoneListPage.module.css';
import type { ProductListItem } from '@phone-catalog/shared';
import { Button } from '@phone-catalog/ui';

export interface PhoneListViewProps {
  readonly phones: readonly ProductListItem[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly search: string;
  readonly onSearchChange: (value: string) => void;
  readonly onRetry: () => void;
}

/**
 * PhoneListView — pure presentational component for the phones listing page.
 * Handles all three states (loading, error, data) through conditional rendering.
 * Has no hooks or data-fetching logic of its own.
 */
export const PhoneListView: React.FC<PhoneListViewProps> = ({
  phones,
  isLoading,
  error,
  search,
  onSearchChange,
  onRetry,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.pageTitle}>SMARTPHONES</h1>
          {!isLoading && (
            <span className={styles.count}>
              {phones.length} {phones.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
            </span>
          )}
        </div>
        <SearchBar value={search} onChange={onSearchChange} />
      </div>

      {error ? (
        <div className={styles.errorContainer} role="alert">
          <p className={styles.errorText}>{error}</p>
          <Button variant="secondary" onClick={onRetry}>
            TRY AGAIN
          </Button>
        </div>
      ) : isLoading ? (
        <PhoneListSkeleton count={8} />
      ) : (
        <PhoneGrid phones={phones} />
      )}
    </div>
  );
};
