import type * as React from 'react';

import styles from './StorageSelector.module.css';
import type { StorageOption } from '@phone-catalog/shared';

export interface StorageSelectorProps {
  readonly options: readonly StorageOption[];
  readonly selected: StorageOption | null;
  readonly onChange: (storage: StorageOption) => void;
}

export const StorageSelector: React.FC<StorageSelectorProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>STORAGE</span>
      <div className={styles.options} role="radiogroup" aria-label="Select storage capacity">
        {options.map((option) => {
          const isSelected = selected?.capacity === option.capacity;
          return (
            <button
              key={option.capacity}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.storageBtn} ${isSelected ? styles.selected : ''}`}
              onClick={() => onChange(option)}
            >
              {option.capacity}
            </button>
          );
        })}
      </div>
    </div>
  );
};
