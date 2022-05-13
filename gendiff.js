#!/usr/bin/env node

import {
  Command,
} from 'commander';

const program = new Command();

// mast be export as default!

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

// program.command()
//   .option('-V, --version', 'output the version number')
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });

program.parse();
