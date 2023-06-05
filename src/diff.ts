import microdiff from 'microdiff';

import { cssToRules } from './cssToRules';
import { ruleListToBlock } from './utils/convert';

export function diff(baseCss: string, afterCss: string) {
  const baseCssRules = cssToRules(baseCss);
  const afterCssRules = cssToRules(afterCss);

  const baseCssRuleBlock = ruleListToBlock(baseCssRules);
  const afterCssRuleBlock = ruleListToBlock(afterCssRules);

  const result = microdiff(baseCssRuleBlock, afterCssRuleBlock);
  console.log('result', result);
}
