import * as React from 'react';
import styles from './Toast.module.css';

export interface ToastMessage {
  readonly id: string;
  readonly message: string;
  readonly type?: 'success' | 'error' | 'info';
}

export interface ToastContextType {
  readonly showToast: (message: string, type?: ToastMessage['type']) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ readonly children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<readonly ToastMessage[]>([]);

  const showToast = React.useCallback((message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* biome-ignore lint/a11y/useSemanticElements: role=region is correct for dynamic notification regions */}
      <div className={styles.toastContainer} role="region" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.type ?? 'success']}`}>
            <span className={styles.message}>{toast.message}</span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              aria-label="Cerrar notificación"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
