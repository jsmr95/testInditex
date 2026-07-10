import type * as React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  readonly count: number;
  readonly max?: number;
  readonly className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ count, max = 99, className = '' }) => {
  if (count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  return (
    <span className={`${styles.badge} ${className}`} aria-label={`${count} items`}>
      {displayCount}
    </span>
  );
};
