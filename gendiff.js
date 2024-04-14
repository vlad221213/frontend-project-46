#!/usr/bin/env node
import { Command }  from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath1>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number');

program.parse();

