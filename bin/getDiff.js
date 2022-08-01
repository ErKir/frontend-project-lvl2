import path from 'path';
import fs from 'node:fs';
import _ from 'lodash';
import parser from '../src/parsers.js';
import diffToString from '../src/diffToString.js';

// import process from 'process';

const parseFileAsString = (filePath) => fs.readFileSync(filePath, 'utf8');

// get extension for parser
const getExtension = (filePath) => filePath.split('.').pop();

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

const getDiff = (filePath1, filePath2, outputFormat) => {
  // console.log(`Current directory: ${process.cwd()}`);
  // console.log('filePath1 - ', filePath1);

  // prepare file1
  const path1 = path.resolve(filePath1);
  const file1AsString = parseFileAsString(path1);
  // console.log(file1AsString);

  // prepare file2
  const path2 = path.resolve(filePath2);
  const file2AsString = parseFileAsString(path2);
  // console.log(file2AsString);
  // console.log('extension1 - ', getExtension(filePath1));
  // parse files as objects
  const extension1 = getExtension(filePath1);
  const extension2 = getExtension(filePath2);
  const obj1 = parser(file1AsString, extension1);
  const obj2 = parser(file2AsString, extension2);
  // concatenation of objects into one array
  const arr = [...Object.entries(obj1), ...Object.entries(obj2)];
  // sort the keys in the array so that the same keys are next to each other
  const sortedArr = _.sortBy(arr);
  // remove duplicate keys
  const filtered = getUniqKeys(sortedArr);
  // building diff as array with next data [key, value, event], event[deleted, added, unchanged]
  const diff = filtered.reduce((acc, pair) => {
    const [key, value] = pair;
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        const event = 'unchanged';
        const newAcc = [...acc, [key, value, event]];
        return newAcc;
      }
      const key1 = key;
      const value2 = obj2[key];
      const event1 = 'deleted';
      const key2 = key;
      const event2 = 'added';
      const value1 = obj1[key];
      const newAcc = [...acc, [key1, value1, event1],
        [key2, value2, event2],
      ];
      return newAcc;
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      const key1 = key;
      const value1 = obj1[key];
      const event1 = 'deleted';
      const newAcc = [...acc, [key1, value1, event1]];
      return newAcc;
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      const key2 = key;
      const value2 = obj2[key];
      const event2 = 'added';
      const newAcc = [...acc, [key2, value2, event2]];
      return newAcc;
    }
    return acc;
  }, []);
  // constructing a string that depends on the data format (json or yaml)
  const format = outputFormat || extension1;
  return diffToString(diff, format);
};

export default getDiff;
