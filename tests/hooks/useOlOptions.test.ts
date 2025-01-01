import { deepEqual } from 'fast-equals';
import { expect } from 'vitest';

describe('useOlOptions hook', () => {
  it('should ', () => {
    const fn1 = () => {
      console.log('test');
    };

    const fn2 = fn1;

    const result = deepEqual(fn1, fn2);

    expect(result).toBe(true);
  });
});
