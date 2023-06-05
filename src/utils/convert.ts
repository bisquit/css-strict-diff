import {
  DeclarationBlock,
  DeclarationList,
  RuleBlock,
  RuleList,
} from '../types';

export function declarationListToBlock(
  decls: DeclarationList
): DeclarationBlock {
  return Object.fromEntries(decls.map((d) => [d.prop, d.value]));
}

export function ruleListToBlock(rules: RuleList): RuleBlock {
  return Object.fromEntries(
    rules.map((rule) => [
      rule.selector,
      declarationListToBlock(rule.declarations),
    ])
  );
}
