import { expect, test } from 'vitest';

import { diff, toRuleMap } from '../src';

test('diff', async () => {
  const result = diff(
    `
    h1, h2 {
      margin: 0;
      padding: 0;
    }
    p {
      color: red;
    }
    h1 {
      font-size: 1rem;
    }
    div h1 {
      font-size: 2rem;
    }
  `,
    `
    h1, h2 {
      margin: 0;
      padding: 0;
    }
    p {
      color: red;
      background: blue;
    }
    div h1 {
      font-size: 3rem;
      font-weight: bold;
    }
    `
  );

  expect(result).toBe(`
    #root {
      h1 {
        margin: 0;
      }
      p {
        color: red;
      }
    }
  `);
});
