#!/usr/bin/env node

/* eslint-disable no-console */

import {
  Command,
} from 'commander';
import getDiff from '../src/getDiff.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath_1>')
  .argument('<filepath_2>')
  .action((filepath1, filepath2) => console.log(
    getDiff(filepath1, filepath2, program.opts().format),
  ));
program.parse();
