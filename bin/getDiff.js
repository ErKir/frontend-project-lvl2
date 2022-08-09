import process from 'process';
import {
  resolve,
} from 'path';
import fs from 'node:fs';
import parser from '../src/parsers.js';
import diffToString from '../src/diffToString.js';
import builder from '../src/builderTree.js';

const getFixturePath = (filepath) => resolve(process.cwd(), filepath);

const parseFileAsString = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

// get extension for parser
const getExtension = (filePath) => filePath.split('.').pop().toLowerCase();

const getDiff = (filePath1, filePath2, outputFormat = 'stylish') => {
  // console.log(`Current directory: ${process.cwd()}`);
  // console.log('filePath1 - ', filePath1);

  // prepare file1
  const file1AsString = parseFileAsString(filePath1);
  // console.log(file1AsString);

  // prepare file2
  const file2AsString = parseFileAsString(filePath2);
  // console.log(file2AsString);
  // console.log('extension1 - ', getExtension(filePath1));
  // parse files as objects
  const extension1 = getExtension(filePath1);
  const extension2 = getExtension(filePath2);
  const file1AsObject = parser(file1AsString, extension1);
  const file2AsObject = parser(file2AsString, extension2);
  console.log(JSON.stringify(builder(file1AsObject, file2AsObject)));
  // constructing a string that depends on the data format (json or yaml)
  return diffToString(builder(file1AsObject, file2AsObject), outputFormat);
};

export default getDiff;
