const EUR_FORMATTER = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/**
 * Formats a number as EUR currency.
 * @example formatPrice(1329) → "1.329 €"
 */
export function formatPrice(price: number): string {
  return EUR_FORMATTER.format(price);
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Generates a unique key for a cart item based on product + selected options.
 */
export function cartItemKey(productId: string, colorName: string, capacity: string): string {
  return `${productId}:${colorName}:${capacity}`;
}
