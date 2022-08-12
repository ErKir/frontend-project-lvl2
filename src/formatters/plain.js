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
      let line;
      switch (obj.event) {
        case 'added':
          line = `Property '${currentPropName.join('.')}' was ${event} with value: ${stringify(value)}`;
          break;
        case 'removed':
          line = `Property '${currentPropName.join('.')}' was ${event}`;
          break;
        case 'updated':
          line = `Property '${currentPropName.join('.')}' was ${event}. From ${stringify(obj.value1)} to ${stringify(obj.value2)}`;
          break;
        case 'unchanged':
          line = '';
          break;
        default:
          throw new Error(`Unexpected "obj.event" = ${event}`);
      }
      return line;
    });

    return lines.filter((str) => str !== '').join('\n');
  };

  return iter(item, []);
};

export default plain;
