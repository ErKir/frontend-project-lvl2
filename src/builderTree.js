import _ from 'lodash';

// array You Shall Not Pass!!!
const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

const builder = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const arrayUniqKeys = _.sortBy(_.union(keys1, keys2));
  // building diff as array with next data {key, value, event},
  // event can accept state:(deleted || added || unchanged || updated)
  const diff = arrayUniqKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        return [...acc, {
          name: key,
          value: builder(obj1[key], obj2[key]),
          event: 'unchanged',
        }];
      }
      if (obj1[key] === obj2[key]) {
        return [...acc, {
          name: key,
          value: obj1[key],
          event: 'unchanged',
        }];
      }
      return [...acc,
        {
          name: key,
          value1: obj1[key],
          value2: obj2[key],
          event: 'updated',
        },
      ];
    }
    if (!_.has(obj2, key)) {
      return [...acc, {
        name: key,
        value: obj1[key],
        event: 'removed',
      }];
    }
    return [...acc, {
      name: key,
      value: obj2[key],
      event: 'added',
    }];
  }, []);
  return diff;
};

export default builder;
