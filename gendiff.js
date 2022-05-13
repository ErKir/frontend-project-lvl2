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

program
  .option('-f, --format <type>', 'output format')
  .argument('<type>', 'output format');

program.parse();
