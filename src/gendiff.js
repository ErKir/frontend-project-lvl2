import _ from 'lodash';

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

const genDiff = (obj1, obj2) => {
  const arr = [...Object.entries(obj1), ...Object.entries(obj2)];
  const sortedArr = _.sortBy(arr);
  const filtered = getUniqKeys(sortedArr);
  // console.log(`filtered = ${filtered.toString()}`);

  const diff = filtered.reduce((acc, pair) => {
    const [key, value] = pair;
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        const newKey = `  ${key}`;
        const newAcc = [...acc, [newKey, value]];
        return newAcc;
      }
      const key1 = `- ${key}`;
      const key2 = `+ ${key}`;
      const value1 = obj1[key];
      const value2 = obj2[key];
      const newAcc = [...acc, [key1, value1],
        [key2, value2],
      ];
      return newAcc;
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      const key1 = `- ${key}`;
      const value1 = obj1[key];
      const newAcc = [...acc, [key1, value1]];
      return newAcc;
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      const key2 = `+ ${key}`;
      const value2 = obj2[key];
      const newAcc = [...acc, [key2, value2]];
      return newAcc;
    }
    return acc;
  }, []);

  const diffToString = diff.reduce((string, [key, value], currentIndex) => {
    if (currentIndex === 0) {
      const resultString = string.concat(`{\n${key}: ${value}`);
      return resultString;
    }
    if (currentIndex === diff.length - 1) {
      const resultString = string.concat(`,\n${key}: ${value}\n}`);
      return resultString;
    }
    const resultString = string.concat(`,\n${key}: ${value}`);
    return resultString;
  }, '');
  const resultJSON = JSON.stringify(Object.fromEntries(diff));
  console.log(diffToString);
  // console.log('resultJSON=', resultJSON);
  return resultJSON;
};

export default genDiff;
