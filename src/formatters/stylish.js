import _ from 'lodash';

const getEventAsString = (event) => {
  switch (event) {
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    case 'unchanged':
      return '  ';
    default:
      throw new Error(`Unexpected "obj.event" = ${event}`);
  }
};

const stringify = (value, replacer = ' ', spacesCount = 2, level = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - (spacesCount * 2));
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 2)}`);
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(value, level);
};

const stylish = (item, replacer = ' ', spacesCount = 2) => {
  const iter = (currentItem, depth) => {
    if (!_.isObject(currentItem)) {
      return `${currentItem}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    if (!Array.isArray(currentItem)) {
      return stringify(currentItem, replacer, spacesCount, depth + 1);
    }
    const lines = currentItem.map((obj) => {
      if (obj.event === 'updated') {
        return `${currentIndent}${getEventAsString('removed')}${obj.name}: ${iter(obj.value1, depth + 2)}\n${currentIndent}${getEventAsString('added')}${obj.name}: ${iter(obj.value2, depth + 2)}`;
      }
      const { name, value, event } = obj;
      return `${currentIndent}${getEventAsString(event)}${name}: ${iter(value, depth + 2)}`;
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(item, 1);
};

export default stylish;
