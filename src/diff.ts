import microdiff from 'microdiff';

import { cssToRules } from './cssToRules';
import { ruleListToBlock } from './utils/convert';

type Added = {
  [selector: string]: { [prop: string]: string };
};

type Removed = {
  [selector: string]: { [prop: string]: string };
};

type Changed = {
  [selector: string]: { [prop: string]: [string, string] };
};

export function diff(
  baseCss: string,
  afterCss: string
): { added: Added; removed: Removed; changed: Changed } {
  const baseCssRules = cssToRules(baseCss);
  const afterCssRules = cssToRules(afterCss);

  const baseCssRuleBlock = ruleListToBlock(baseCssRules);
  const afterCssRuleBlock = ruleListToBlock(afterCssRules);

  const diffs = microdiff(baseCssRuleBlock, afterCssRuleBlock);

  const added = {} as Added;
  const removed = {} as Removed;
  const changed = {} as Changed;

  diffs.forEach((diff) => {
    if (diff.type === 'CREATE') {
      const path = diff.path;
      const value = diff.value;
      const [selector, prop] = path;

      added[selector] = prop ? { [prop]: value } : value;
    } else if (diff.type === 'REMOVE') {
      const path = diff.path;
      const oldValue = diff.oldValue;
      const [selector, prop] = path;

      removed[selector] = prop ? { [prop]: oldValue } : oldValue;
    } else {
      const path = diff.path;
      const value = diff.value as string;
      const oldValue = diff.oldValue as string;
      const [selector, prop] = path;

      changed[selector] = { [prop]: [oldValue, value] as [string, string] };
    }
  });

  return { added, removed, changed };
}
