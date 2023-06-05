import { parse } from 'postcss';

export function scopeString(css: string) {
  return `
    #root {
      ${css}
    }
  `;
}
