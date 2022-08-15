import process from 'process';
import { resolve } from 'path';
import fs from 'node:fs';
import parser from './parsers.js';
import diffToString from './formatters/index.js';
import buildDiff from './builderTree.js';

const getFixturePath = (filepath) => resolve(process.cwd(), filepath);

const parseFileAsString = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

// get extension for parser
const getExtension = (filePath) => filePath.split('.').pop().toLowerCase();

const getDiff = (filePath1, filePath2, outputFormat = 'stylish') => {
  // prepare file1
  const file1AsString = parseFileAsString(filePath1);

  // prepare file2
  const file2AsString = parseFileAsString(filePath2);
  // parse files as objects
  const extension1 = getExtension(filePath1);
  const extension2 = getExtension(filePath2);
  const file1AsObject = parser(file1AsString, extension1);
  const file2AsObject = parser(file2AsString, extension2);
  // constructing a string that depends on the data format (json or yaml)
  const diff = buildDiff(file1AsObject, file2AsObject);
  return diffToString(diff, outputFormat);
};

export default getDiff;
