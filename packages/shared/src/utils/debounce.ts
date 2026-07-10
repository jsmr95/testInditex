/**
 * Creates a debounced version of a function.
 * Returns a tuple of [debouncedFn, cancelFn].
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delayMs: number,
): [debounced: (...args: Parameters<T>) => void, cancel: () => void] {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delayMs);
  };

  const cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return [debounced, cancel];
}
