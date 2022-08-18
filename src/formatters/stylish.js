import _ from 'lodash';

const getIndents = (level) => {
  const count = 2;
  const replacer = '  ';
  const indentSize = level * count;
  const currentIndent = replacer.repeat(indentSize - 1);
  const bracketIndent = replacer.repeat(indentSize - count);
  return {
    currentIndent,
    bracketIndent,
  };
};

const stringify = (value, level) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const indents = getIndents(level);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indents.currentIndent}  ${key}: ${stringify(val, level + 1)}`);
  return ['{', ...lines, `${indents.bracketIndent}}`].join('\n');
};

const stylish = (currentItem, depth = 1) => {
  const indents = getIndents(depth);

  const lines = currentItem.map((obj) => {
    const { name, value, type } = obj;
    switch (type) {
      case 'added':
        return `${indents.currentIndent}+ ${name}: ${stringify(value, depth + 1)}`;
      case 'removed':
        return `${indents.currentIndent}- ${name}: ${stringify(value, depth + 1)}`;
      case 'updated':
        return `${indents.currentIndent}- ${name}: ${stringify(obj.value1, depth + 1)}\n${indents.currentIndent}+ ${name}: ${stringify(obj.value2, depth + 1)}`;
      case 'unchanged':
        return `${indents.currentIndent}  ${name}: ${stringify(value, depth + 1)}`;
      case 'nested':
        return `${indents.currentIndent}  ${name}: ${stylish(value, depth + 1)}`;
      default:
        throw new Error(`Unexpected "obj.event" = ${type}`);
    }
  });

  return ['{', ...lines, `${indents.bracketIndent}}`].join('\n');
};

export default stylish;
