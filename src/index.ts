import microdiff from 'microdiff';
import { parse } from 'postcss';

import { transform } from './transform';
import { DeclarationList, Rules } from './types';

/**
 * PostCSS API
 * https://postcss.org/api/
 */

export function diff(baseCss: string, afterCss: string) {
  const baseCssRules = toRules(baseCss);
  const afterCssRules = toRules(afterCss);

  const result = microdiff(baseCssRules, afterCssRules);
  console.log('result', result);
}

export function toRules(css: string): Rules {
  const root = parse(css);

  const result = {} as Rules;

  root.walkRules((rule) => {
    let declBlock = {} as DeclarationList;
    rule.walkDecls((decl) => {
      const { prop, value } = decl;

      const transformed = transform({ [prop]: value });
      declBlock = {
        ...declBlock,
        ...transformed,
      };
    });

    rule.selectors.forEach((selector) => {
      result[selector] = {
        ...(result[selector] ?? {}),
        ...declBlock,
      };
    });
  });

  console.log(result);

  return result;
}
