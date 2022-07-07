import fs from 'node:fs';
import _ from 'lodash';
import path from 'path';
// import process from 'process';

const getExtension = (filePath) => filePath.split('.').pop();

const parseFileAsString = (filePath) => fs.readFileSync(filePath, 'utf8');

const getDiff = (filePath1, filePath2) => {
  // console.log(`Current directory: ${process.cwd()}`);

  // prepare file1
  const path1 = path.resolve(filePath1);
  const extension = getExtension(path1);
  const file1AsString = parseFileAsString(path1);
  console.log(file1AsString);
  const file1AsObject = extension === 'json' ? JSON.parse(file1AsString) : file1AsString;

  // prepare file2
  const path2 = path.resolve(filePath2);
  const file2AsString = parseFileAsString(path2);
  console.log(file2AsString);
  const file2AsObject = extension === 'json' ? JSON.parse(file2AsString) : file2AsString;

  // main work
  const generic = (obj1, obj2) => {
    const arr = [...Object.entries(obj1), ...Object.entries(obj2)];
    const sortedArr = _.sortBy(arr);
    const filtered = sortedArr.reduce((acc, item) => {
      const [key] = item;
      if (acc.find(([accKey]) => key === accKey)) {
        return acc;
      }
      const newAcc = [...acc, item];
      return newAcc;
    }, []);
    console.log(`filtered = ${filtered.toString()}`);

    const resultArr = filtered.reduce((acc, pair) => {
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
    return resultArr;
  };
  const diff = generic(file1AsObject, file2AsObject);
  console.log(`diff = ${diff.toString()}`);
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
  return resultJSON;
};

export default getDiff;
