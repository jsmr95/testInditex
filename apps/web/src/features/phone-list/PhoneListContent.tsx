import type { ProductListItem } from '@phone-catalog/shared';
import * as React from 'react';
import styles from './PhoneListPage.module.css';
import { PhoneGrid } from './components/PhoneGrid';
import { getPhoneListPromise } from './phone-list.data';

interface PhoneListContentProps {
  readonly query: string;
  /**
   * True while a useTransition is pending in the parent.
   * When true the grid is dimmed to signal "loading new results"
   * without replacing the content with a skeleton.
   */
  readonly isPending: boolean;
}

function deduplicateById(items: readonly ProductListItem[]): readonly ProductListItem[] {
  return items.filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index);
}

/**
 * PhoneListContent — suspending data-fetching layer.
 *
 * Uses React 19's `use()` hook to read a cached promise.
 * While pending → Suspense shows <PhoneListSkeleton />.
 * If the Result is an error → throws to the nearest ErrorBoundary.
 * On success → renders the product count and the grid.
 *
 * NOTE: this component must always be rendered inside <Suspense>.
 */
export const PhoneListContent: React.FC<PhoneListContentProps> = ({ query, isPending }) => {
  const result = React.use(getPhoneListPromise(query));

  if (!result.ok) {
    // Let the ErrorBoundary above handle display + retry
    throw result.error;
  }

  const phones = deduplicateById(result.data);

  return (
    <div style={{ opacity: isPending ? 0.5 : 1, transition: 'opacity 0.15s ease' }}>
      <span className={styles.count}>
        {phones.length} {phones.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
      </span>
      <PhoneGrid phones={phones} />
    </div>
  );
};
