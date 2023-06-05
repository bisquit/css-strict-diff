import { expect, test } from 'vitest';

import { diff } from './diff';
import { transform } from './transform';

test('diff', async () => {
  const result = diff(
    `
    h1 {
      font-size: 1rem;
    }
    h2 {
      margin: 0;
    }
    p {
      margin: 10px;
    }
  `,
    `
    h1 {
      font-size: 2rem;
    }
    p {
      margin: 10px;
    }
    span {
      color: red;
    }
  `
  );

  console.log('result', result);
});
