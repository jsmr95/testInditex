import type * as React from 'react';
import { NavLink } from 'react-router';

import styles from './Header.module.css';
import { useCartCount } from './hooks/useCartCount';
import { ROUTES } from '@phone-catalog/shared';
import { Badge } from '@phone-catalog/ui';

export const Header: React.FC = () => {
  const totalCount = useCartCount();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to={ROUTES.HOME} className={styles.logoLink} aria-label="Home - Zara Smartphones">
          <span className={styles.logo}>ZARA</span>
        </NavLink>

        <NavLink
          to={ROUTES.CART}
          className={({ isActive }) => `${styles.cartLink} ${isActive ? styles.active : ''}`}
          aria-label="View cart"
        >
          <div className={styles.cartIconWrapper}>
            {/* Minimalist Shopping Bag SVG */}
            <svg
              className={styles.cartIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="8" width="18" height="14" rx="2" ry="2" />
              <path d="M16 11V7a4 4 0 0 0-8 0v4" />
            </svg>
            <Badge count={totalCount} className={styles.badge} />
          </div>
        </NavLink>
      </div>
    </header>
  );
};
