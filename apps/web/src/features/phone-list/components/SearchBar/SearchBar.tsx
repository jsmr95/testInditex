import * as React from 'react';

import styles from './SearchBar.module.css';
import { debounce } from '@phone-catalog/shared';
import { Input } from '@phone-catalog/ui';

export interface SearchBarProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'SEARCH DEVICE...',
}) => {
  const [inputValue, setInputValue] = React.useState(value);

  // Sync internal state when external value changes (e.g. on clear)
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Debounced callback
  const [debouncedOnChange, cancelDebounce] = React.useMemo(
    () => debounce((val: string) => onChange(val), 300),
    [onChange],
  );

  // Clean up debounce on unmount
  React.useEffect(() => {
    return () => cancelDebounce();
  }, [cancelDebounce]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    setInputValue(nextVal);
    debouncedOnChange(nextVal);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <div className={styles.container}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onClear={handleClear}
        placeholder={placeholder}
        aria-label="Search smartphones"
        className={styles.input}
      />
    </div>
  );
};
