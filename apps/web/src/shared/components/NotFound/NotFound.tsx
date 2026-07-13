import type * as React from 'react';
import { Link } from 'react-router';

import styles from './NotFound.module.css';
import { ROUTES } from '@phone-catalog/shared';
import { Button } from '@phone-catalog/ui';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>PAGE NOT FOUND</p>
      <p className={styles.text}>The page you are looking for does not exist or has been moved.</p>
      <Link to={ROUTES.HOME}>
        <Button variant="primary">BACK TO HOME</Button>
      </Link>
    </div>
  );
};
