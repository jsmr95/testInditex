import * as React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
  readonly error?: string;
  readonly onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, onClear, className = '', id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const hasValue = Boolean(props.value);

    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.wrapper}>
          <input
            ref={ref}
            id={inputId}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {onClear && hasValue && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={onClear}
              aria-label="Clear field"
            >
              &times;
            </button>
          )}
        </div>
        {error && (
          <span id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
