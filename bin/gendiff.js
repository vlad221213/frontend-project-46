#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2));
  });

program.parse();
