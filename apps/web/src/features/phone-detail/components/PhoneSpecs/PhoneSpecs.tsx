import type { ProductSpecs } from '@phone-catalog/shared';
import type * as React from 'react';
import styles from './PhoneSpecs.module.css';

export interface PhoneSpecsProps {
  readonly brand: string;
  readonly name: string;
  readonly description: string;
  readonly specs: ProductSpecs;
}

export const PhoneSpecs: React.FC<PhoneSpecsProps> = ({ brand, name, description, specs }) => {
  const specItems = [
    { label: 'BRAND', value: brand },
    { label: 'NAME', value: name },
    { label: 'DESCRIPTION', value: description },
    { label: 'SCREEN', value: specs.screen },
    { label: 'RESOLUTION', value: specs.resolution },
    { label: 'PROCESSOR', value: specs.processor },
    { label: 'MAIN CAMERA', value: specs.mainCamera },
    { label: 'SELFIE CAMERA', value: specs.selfieCamera },
    { label: 'BATTERY', value: specs.battery },
    { label: 'OS', value: specs.os },
    { label: 'SCREEN REFRESH RATE', value: specs.screenRefreshRate },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>SPECIFICATIONS</h3>
      <dl className={styles.list}>
        {specItems.map(
          (item) =>
            item.value && (
              <div key={item.label} className={styles.row}>
                <dt className={styles.label}>{item.label}</dt>
                <dd className={styles.value}>{item.value}</dd>
              </div>
            ),
        )}
      </dl>
    </div>
  );
};
