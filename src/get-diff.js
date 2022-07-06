import fs from 'node:fs';
import _ from 'lodash';
import path from 'path';
// import process from 'process';

const getExtension = (filePath) => filePath.split('.').pop();

const parseFileAsString = (filePath) => fs.readFileSync(filePath, 'utf8');

// const iteratees =

const getDiff = (filePath1, filePath2) => {
  // console.log(`Current directory: ${process.cwd()}`);

  // prepare file1
  const path1 = path.resolve(filePath1);
  const extension = getExtension(path1);
  const file1AsString = parseFileAsString(path1);
  console.log(file1AsString);
  const file1AsObject = extension === 'json' ? JSON.parse(file1AsString) : file1AsString;
  // const sortedFile1 = _.sortBy([file1AsObject], iteratees);

  // prepare file2
  const path2 = path.resolve(filePath2);
  const file2AsString = parseFileAsString(path2);
  console.log(file2AsString);
  const file2AsObject = extension === 'json' ? JSON.parse(file2AsString) : file2AsString;

  // main work
  const generic = (obj1, obj2) => {
    const arr = [...Object.entries(obj1), ...Object.entries(obj2)];
    const sortedArr = _.sortBy(arr, [([key]) => key]);
    const resultArr = sortedArr.reduce((acc, pair) => {
      const [key, value] = pair;
      if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        if (obj1[key] === obj2[key]) {
          const newAcc = [...acc, [key, value]];
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
  const resultJSON = JSON.stringify(Object.fromEntries(diff));
  const JSONAsString = JSON.parse(resultJSON, (k, v) => {
    const str = '';


  })
  console.log(JSONAsString);
  return resultJSON;
};

export default getDiff;
