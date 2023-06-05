/**
 * Declaration is a single prop / value pair
 *
 * @example
 * { prop: 'padding', value: '10px' }
 */
export type Declaration = {
  prop: string;
  value: string;
};

/**
 * Array of declarations
 *
 * @example
 * [
 *   { prop: 'padding', value: '10px' },
 *   { prop: 'font-size', value: '1rem' },
 * ]
 */
export type DeclarationList = Declaration[];

/**
 * Rule is a single selector / declarations pair
 *
 * @example
 * {
 *   selector: 'h1',
 *   declarations: [
 *     { prop: 'font-size', value: '1rem' },
 *   ],
 * }
 */
export type Rule = {
  selector: string;
  declarations: DeclarationList;
};

/**
 * Array of rules
 */
export type RuleList = Rule[];

/**
 * Object-style of DeclarationList
 * (for diff purpose)
 */
export type DeclarationBlock = {
  [prop: string]: string;
};

/**
 * Object-style of RuleList
 * (for diff purpose)
 */
export type RuleBlock = {
  [selector: string]: { [prop: string]: string };
};
