import _ from 'lodash';

const stringify = (value) => {
  if (_.isString(value) || _.isNumber(value)) {
    return `'${value}'`;
  }
  if (!_.isObject(value)) {
    return `${value}`;
  }
  return '[complex value]';
};

const plain = (item) => {
  const iter = (currentItem, propNames) => {
    const lines = currentItem.map((obj) => {
      const {
        name,
        value,
        event,
      } = obj;
      const currentPropName = [...propNames, name];
      if (Array.isArray(value)) {
        return iter(value, currentPropName);
      }
      switch (obj.event) {
        case 'added':
          return `Property '${currentPropName.join('.')}' was ${event} with value: ${stringify(value)}`;
        case 'removed':
          return `Property '${currentPropName.join('.')}' was ${event}`;
        case 'updated':
          return `Property '${currentPropName.join('.')}' was ${event}. From ${stringify(obj.value1)} to ${stringify(obj.value2)}`;
        case 'unchanged':
          return '';
        default:
          throw new Error(`Unexpected "obj.event" = ${event}`);
      }
    });

    return lines.filter((str) => str !== '').join('\n');
  };

  return iter(item, []);
};

export default plain;
