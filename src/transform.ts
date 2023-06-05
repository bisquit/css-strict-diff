import { Declaration, DeclarationList } from './types';

type TransformDeclaration = (
  decl: Declaration
) => Declaration | DeclarationList;

export function transform(initial: DeclarationList): DeclarationList {
  const transforms = [expandShorthandTransform] as TransformDeclaration[];

  return transforms.reduce((declBlock, transform) => {
    return declBlock.flatMap((decl) => {
      return transform(decl);
    });
  }, initial);
}

const expandShorthandTransform: TransformDeclaration = (decl) => {
  const { prop, value } = decl;

  switch (prop) {
    case 'margin': {
      return [
        { prop: 'margin-top', value: value },
        { prop: 'margin-right', value: value },
        { prop: 'margin-bottom', value: value },
        { prop: 'margin-left', value: value },
      ];
    }
    case 'padding': {
      return [
        { prop: 'padding-top', value: value },
        { prop: 'padding-right', value: value },
        { prop: 'padding-bottom', value: value },
        { prop: 'padding-left', value: value },
      ];
    }
  }

  return decl;
};
