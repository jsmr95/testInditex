import { Button } from '@phone-catalog/ui';
import type * as React from 'react';
import styles from './PhoneListPage.module.css';
import { PhoneGrid } from './components/PhoneGrid';
import { PhoneListSkeleton } from './components/PhoneListSkeleton';
import { SearchBar } from './components/SearchBar';
import { usePhones } from './hooks/usePhones';

export const PhoneListPage: React.FC = () => {
  const { phones, isLoading, error, search, setSearch, refetch } = usePhones();

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
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {error ? (
        <div className={styles.errorContainer} role="alert">
          <p className={styles.errorText}>{error}</p>
          <Button variant="secondary" onClick={refetch}>
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
