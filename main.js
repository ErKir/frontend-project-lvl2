#!/usr/bin/env node

import {
  Command,
} from 'commander';
import getDiff from './bin/getDiff.js';

const program = new Command();
console.log(`Current directory: ${process.cwd()}`);
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
// .parse(process.argv);
program.parse();

// консолить нужно от сюда, что бы в библиотеке небыло консолей
