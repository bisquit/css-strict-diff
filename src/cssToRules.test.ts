import { expect, test } from 'vitest';

import { cssToRules } from './cssToRules';

test('cssToRules', async () => {
  const result = cssToRules(`
    h1 {
      font-size: 1rem;
    }
    p {
      margin: 10px;
    }
  `);

  expect(result).toEqual([
    {
      selector: 'h1',
      declarations: expect.arrayContaining([
        { prop: 'font-size', value: '1rem' },
      ]),
    },
    {
      selector: 'p',
      declarations: expect.arrayContaining([
        { prop: 'margin-top', value: '10px' },
        { prop: 'margin-bottom', value: '10px' },
        { prop: 'margin-right', value: '10px' },
        { prop: 'margin-left', value: '10px' },
      ]),
    },
  ]);
});
