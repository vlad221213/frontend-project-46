#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const result = genDiff(filePath1, filePath2, program.opts().format);
    console.log(result);
  });

program.parse();
