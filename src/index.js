import process from 'process';
import { resolve } from 'path';
import fs from 'node:fs';
import _ from 'lodash';
import parse from './parsers.js';
import diffToString from './formatters/index.js';
import buildDiff from './builderTree.js';

const getFixturePath = (filepath) => resolve(process.cwd(), filepath);

const parseFileAsString = (filePath) => fs.readFileSync(getFixturePath(filePath), 'utf8');

// get extension for parser
const getExtension = (filePath) => _.last(filePath.split('.')).toLowerCase();

const getData = (filepath) => parse(parseFileAsString(filepath), getExtension(filepath));

const genDiff = (filePath1, filePath2, outputFormat = 'stylish') => {
  // parse files as objects
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  // constructing a string that depends on the data format (json or yaml)
  const diff = buildDiff(data1, data2);

  return diffToString(diff, outputFormat);
};

export default genDiff;
