import type { ColorOption } from '@phone-catalog/shared';
import type * as React from 'react';
import styles from './ColorSelector.module.css';

export interface ColorSelectorProps {
  readonly options: readonly ColorOption[];
  readonly selected: ColorOption | null;
  readonly onChange: (color: ColorOption) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ options, selected, onChange }) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>COLOR. PICK YOUR FAVOURITE.</span>
      <div className={styles.options} role="radiogroup" aria-label="Selecciona un color">
        {options.map((option) => {
          const isSelected = selected?.name === option.name;
          return (
            <button
              key={option.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.colorBtn} ${isSelected ? styles.selected : ''}`}
              onClick={() => onChange(option)}
              title={option.name}
              style={{ backgroundColor: option.hexCode }}
            >
              <span className="sr-only">{option.name}</span>
            </button>
          );
        })}
      </div>
      {selected && <span className={styles.colorName}>{selected.name}</span>}
    </div>
  );
};
