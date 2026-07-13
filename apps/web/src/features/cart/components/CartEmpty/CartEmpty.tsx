import type * as React from 'react';
import { Link } from 'react-router';

import styles from './CartEmpty.module.css';
import { ROUTES } from '@phone-catalog/shared';
import { Button } from '@phone-catalog/ui';

export const CartEmpty: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>YOUR CART IS EMPTY</h2>
      <p className={styles.text}>Discover our new arrivals and find your perfect device.</p>
      <Link to={ROUTES.HOME}>
        <Button variant="primary">CONTINUE SHOPPING</Button>
      </Link>
    </div>
  );
};
