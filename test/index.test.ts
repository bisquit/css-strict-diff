import { expect, test } from 'vitest';

import { scopeString } from '../src';

test('scopeString', async () => {
  const result = scopeString(`
    h1 {
      margin: 0;
    }
    p {
      color: red;
    }
  `);

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
