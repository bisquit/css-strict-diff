import { diff } from 'css-strict-diff';

const { added, changed, removed } = diff(
  `
  h1 { color: red; }
`,
  `
  h1 { color: blue; }
`
);

console.log('added', added);
console.log('changed', changed);
console.log('removed', removed);
