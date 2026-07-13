import type * as React from 'react';

import styles from './PhoneDetailSkeleton.module.css';
import { Skeleton } from '@phone-catalog/ui';

export const PhoneDetailSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.columns}>
        {/* Left Column: Image skeleton */}
        <div className={styles.imageColumn}>
          <Skeleton variant="rect" className={styles.imageSkeleton} />
        </div>

        {/* Right Column: Info skeletons */}
        <div className={styles.infoColumn}>
          <div className={styles.header}>
            <Skeleton variant="text" width="30%" height={12} />
            <Skeleton variant="text" width="80%" height={28} />
            <Skeleton variant="text" width="20%" height={18} />
          </div>

          <div className={styles.description}>
            <Skeleton variant="text" width="100%" height={14} />
            <Skeleton variant="text" width="95%" height={14} />
            <Skeleton variant="text" width="70%" height={14} />
          </div>

          <div className={styles.selectors}>
            <Skeleton variant="text" width="25%" height={12} />
            <div className={styles.row}>
              <Skeleton variant="circle" width={24} height={24} />
              <Skeleton variant="circle" width={24} height={24} />
              <Skeleton variant="circle" width={24} height={24} />
            </div>
          </div>

          <div className={styles.selectors}>
            <Skeleton variant="text" width="25%" height={12} />
            <div className={styles.row}>
              <Skeleton variant="rect" width={64} height={36} />
              <Skeleton variant="rect" width={64} height={36} />
            </div>
          </div>

          <Skeleton variant="rect" width="100%" height={48} />
        </div>
      </div>
    </div>
  );
};
