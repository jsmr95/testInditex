import { describe, expect, it } from 'vitest';

import { err, isErr, isOk, ok } from './result';

describe('Result Monad Utilities', () => {
  it('should create a successful result', () => {
    const res = ok({ value: 42 });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data).toEqual({ value: 42 });
    }
  });

  it('should create an error result', () => {
    const errorObj = new Error('Test error');
    const res = err(errorObj);
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error).toBe(errorObj);
    }
  });

  it('should correctly identify ok and err results via guards', () => {
    const success = ok('hello');
    const failure = err('wrong');

    expect(isOk(success)).toBe(true);
    expect(isOk(failure)).toBe(false);

    expect(isErr(success)).toBe(false);
    expect(isErr(failure)).toBe(true);
  });
});
