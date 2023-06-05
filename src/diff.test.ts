import { expect, test } from 'vitest';

import { diff } from './diff';

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
      font-weight: bold;
    }
    p {
      margin: 10px;
    }
    span {
      color: red;
    }
    strong {
      color: blue;
    }
  `
  );

  expect(result).toEqual({
    added: {
      h1: { 'font-weight': 'bold' },
      span: { color: 'red' },
      strong: { color: 'blue' },
    },
    removed: {
      h2: {
        'margin-top': '0',
        'margin-right': '0',
        'margin-bottom': '0',
        'margin-left': '0',
      },
    },
    changed: { h1: { 'font-size': ['1rem', '2rem'] } },
  });
});
