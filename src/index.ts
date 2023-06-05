import microdiff from 'microdiff';
import { parse } from 'postcss';

/**
 * PostCSS API
 * https://postcss.org/api/
 */

type Selector = string;

type Decl = {
  prop: string;
  value: string;
};

type RuleMap = Map<Selector, Decl[]>;
type RuleObj = { [key: Selector]: Decl[] };

export function diff(baseCss: string, afterCss: string) {
  const baseCssRuleMap = toRuleMap(baseCss);
  const afterCssRuleMap = toRuleMap(afterCss);

  const result = microdiff(baseCssRuleMap, afterCssRuleMap);
  console.log('result', result);
}

export function toRuleMap(css: string): RuleObj {
  const root = parse(css);

  const map = new Map() as RuleMap;
  const result = {} as RuleObj;

  root.walkRules((rule) => {
    const decls = [] as { prop: string; value: string }[];
    rule.walkDecls((decl) => {
      const { prop, value } = decl;
      decls.push({ prop, value });
    });

    rule.selectors.forEach((selector) => {
      // map.set(selector, [...(map.get(selector) ?? []), ...decls]);
      result[selector] = [...(result[selector] ?? []), ...decls];
    });
  });

  console.log(result);

  return result;
}

function expandShorthand(prop: string, value: string) {
  return undefined;
}
