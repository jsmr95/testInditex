import type * as React from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  readonly size?: 'small' | 'medium' | 'large';
  readonly className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', className = '' }) => {
  return (
    // biome-ignore lint/a11y/useSemanticElements: role=status is correct for dynamic loading spinners
    <div className={`${styles.wrapper} ${className}`} role="status">
      <span className={`${styles.spinner} ${styles[size]}`} />
      <span className={styles.srOnly}>Cargando...</span>
    </div>
  );
};
