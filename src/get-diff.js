import fs from 'node:fs';
import _ from 'lodash';
import path from 'path';
import process from 'process';

// const getExtension = (filePath) => filePath.split('.').pop();

const parseFile = (filePath, extension) => fs.readFileSync(filePath, extension);

const getDiff = (filePath1, filePath2) => {
  console.log(`Current directory: ${process.cwd()}`);

  // Resolving path for file1
  // with the current directory
  const path1 = path.resolve(filePath1);
  // const extension = getExtension(path1);
  const extension = 'utf8';
  const file1 = parseFile(path1, extension);
  console.log(file1);

  // Resolving path for file2
  // with the current directory
  const path2 = path.resolve(filePath2);
  const file2 = parseFile(path2, extension);
  console.log(file2);
};


export default getDiff;
