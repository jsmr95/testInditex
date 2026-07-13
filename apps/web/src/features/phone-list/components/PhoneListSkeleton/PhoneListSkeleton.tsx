import type * as React from 'react';

import styles from './PhoneListSkeleton.module.css';
import { Skeleton } from '@phone-catalog/ui';

export interface PhoneListSkeletonProps {
  readonly count?: number;
}

export const PhoneListSkeleton: React.FC<PhoneListSkeletonProps> = ({ count = 8 }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={styles.grid}>
      {items.map((i) => (
        <div key={i} className={styles.card} data-testid="phone-skeleton">
          <div className={styles.imageWrapper}>
            <Skeleton variant="rect" className={styles.imageSkeleton} />
          </div>
          <div className={styles.info}>
            <Skeleton variant="text" width="40%" height={12} />
            <Skeleton variant="text" width="70%" height={16} />
            <Skeleton variant="text" width="30%" height={14} />
          </div>
        </div>
      ))}
    </div>
  );
};
