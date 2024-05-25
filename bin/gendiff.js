#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Command } from 'commander';
import genDiff from '../src/index.js';
import formaterSelection from '../formatters/index.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .argument('[styler]', 'output style')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const result = genDiff(filePath1, filePath2, formaterSelection(program.opts().format));
    console.log(result);
  });

program.parse();
