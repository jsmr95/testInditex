import type * as React from 'react';
import { Outlet } from 'react-router';

import { Header } from '../Header';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
