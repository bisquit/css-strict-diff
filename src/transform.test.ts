import { expect, test } from 'vitest';

import { transform } from './transform';

test('transform', async () => {
  const result = transform([{ prop: 'padding', value: '10px' }]);

  console.log('result', result);

  expect(result).toEqual(
    expect.arrayContaining([
      { prop: 'padding-top', value: '10px' },
      { prop: 'padding-bottom', value: '10px' },
      { prop: 'padding-left', value: '10px' },
      { prop: 'padding-right', value: '10px' },
    ])
  );
});
