import type { ProductListItem } from '@phone-catalog/shared';
import type * as React from 'react';
import { PhoneCard } from '../PhoneCard';
import styles from './PhoneGrid.module.css';

export interface PhoneGridProps {
  readonly phones: readonly ProductListItem[];
}

export const PhoneGrid: React.FC<PhoneGridProps> = ({ phones }) => {
  if (phones.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>NO DEVICES FOUND</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {phones.map((phone) => (
        <PhoneCard key={phone.id} phone={phone} />
      ))}
    </div>
  );
};
