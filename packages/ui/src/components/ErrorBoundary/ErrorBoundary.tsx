import * as React from 'react';

import styles from './ErrorBoundary.module.css';

export interface ErrorBoundaryProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // In production, we'd send this to Sentry, DataDog, etc.
    // We suppress console logs via biome lint if needed, but for logging errors it's allowed.
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.container} role="alert">
          <h2 className={styles.title}>SOMETHING WENT WRONG</h2>
          <p className={styles.message}>
            {this.state.error?.message ||
              'An unexpected error occurred while loading this section.'}
          </p>
          <button type="button" className={styles.button} onClick={this.handleRetry}>
            RETRY
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
