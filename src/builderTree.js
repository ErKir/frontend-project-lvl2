import _ from 'lodash';

// object to array
const toArray = (obj) => Object.entries(obj);
// isObject?
const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

const getUniqKeys = (arr) => {
  const uniq = arr.reduce((acc, item) => {
    const [key] = item;
    if (acc.find(([accKey]) => key === accKey)) {
      return acc;
    }
    const newAcc = [...acc, item];
    return newAcc;
  }, []);
  return uniq;
};

const builder = (obj1, obj2) => {
  // concatenation of objects into one array
  const arr = [...toArray(obj1), ...toArray(obj2)];
  // sort the keys in the array so that the same keys are next to each other
  const sortedArr = _.sortBy(arr);
  // remove duplicate keys
  const arrayUniqKeys = getUniqKeys(sortedArr);
  // building diff as array with next data {key, value, event},
  // event(deleted || added || unchanged)
  const diff = arrayUniqKeys.map(([key, value]) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        return {
          name: key,
          value: builder(obj1[key], obj2[key]),
          event: 'unchanged',
        };
      }
      if (obj1[key] === obj2[key]) {
        return {
          name: key,
          value,
          event: 'unchanged',
        };
      }
      return {
        name: key,
        value1: obj1[key],
        value2: obj2[key],
        type: 'changed',
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key,
        value: obj1[key],
        event: 'deleted',
      };
    }
    return {
      name: key,
      value: obj2[key],
      event: 'added',
    };
  });
  return diff;
};

export default builder;
