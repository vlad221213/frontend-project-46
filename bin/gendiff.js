#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Command } from 'commander';
import genDiff from '../src/index.js';
import {
  sorting, spaceFormat, stylish, parse,
} from '../src/utils.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .action((filePath1, filePath2) => {
    const file1 = parse(filePath1);
    const file2 = parse(filePath2);
    const sortingObject = sorting(spaceFormat(genDiff(file1, file2)));
    console.log(stylish(sortingObject));
  });

program.parse();
