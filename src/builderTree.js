import _ from 'lodash';

// array You Shall Not Pass!!!
// const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

const builder = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const arrayUniqKeys = _.sortBy(_.union(keys1, keys2));
  // building diff as array with next data {key, value, event},
  // event can accept state:(deleted || added || unchanged || updated)
  const diff = arrayUniqKeys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return {
          name: key,
          value: builder(obj1[key], obj2[key]),
          type: 'nested',
        };
      }
      if (_.isEqual(obj1[key], obj2[key])) {
        return {
          name: key,
          value: obj1[key],
          type: 'unchanged',
        };
      }
      return {
        name: key,
        value1: obj1[key],
        value2: obj2[key],
        type: 'updated',
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key,
        value: obj1[key],
        type: 'removed',
      };
    }
    return {
      name: key,
      value: obj2[key],
      type: 'added',
    };
  });
  return diff;
};

export default builder;
