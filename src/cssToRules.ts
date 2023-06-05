import { parse as postcssParse } from 'postcss';

import { transform } from './transform';
import { DeclarationList, RuleList } from './types';

export function cssToRules(css: string): RuleList {
  /**
   * PostCSS API
   * https://postcss.org/api/
   */
  const root = postcssParse(css);

  const result = [] as RuleList;

  /**
   * NOTE: This file contains both postcss types and own types.
   * Name postcss variables with 'postcss' prefix to distinguish them.
   */
  root.walkRules((postcssRule) => {
    let selectorDecls = [] as DeclarationList;

    postcssRule.walkDecls((postcssDecl) => {
      const { prop, value } = postcssDecl;

      const decls: DeclarationList = [{ prop, value }];

      const transformed = transform(decls);
      selectorDecls = [...selectorDecls, ...transformed];
    });

    postcssRule.selectors.forEach((postcssSelector) => {
      result.push({
        selector: postcssSelector,
        declarations: selectorDecls,
      });
    });
  });

  return result;
}
