#!/usr/bin/env node

import {
  Command,
} from 'commander';
import path from 'path';
import fs from 'node:fs';
import genDiff from './src/gendiff.js';
// import process from 'process';

const getExtension = (filePath) => filePath.split('.').pop();

const parseFileAsString = (filePath) => fs.readFileSync(filePath, 'utf8');

const getDiff = (filePath1, filePath2) => {
  // console.log(`Current directory: ${process.cwd()}`);

  // prepare file1
  const path1 = path.resolve(filePath1);
  const extension = getExtension(path1);
  const file1AsString = parseFileAsString(path1);
  // console.log(file1AsString);
  const file1AsObject = extension === 'json' ? JSON.parse(file1AsString) : file1AsString;

  // prepare file2
  const path2 = path.resolve(filePath2);
  const file2AsString = parseFileAsString(path2);
  // console.log(file2AsString);
  const file2AsObject = extension === 'json' ? JSON.parse(file2AsString) : file2AsString;
  return genDiff(file1AsObject, file2AsObject);
};

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-f, --format <type>', 'output format')
  .argument('<filepath_1>')
  .argument('<filepath_2>')
  .action((filepath1, filepath2) => getDiff(filepath1, filepath2));

program.parse();
