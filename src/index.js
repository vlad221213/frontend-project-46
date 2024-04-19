/* eslint-disable import/extensions */
import { readFileSync } from 'node:fs';
import parse from './utils.js';

const genDiff = (filePath1, filePath2) => {
  const file1 = readFileSync(filePath1);
  const file2 = readFileSync(filePath2);
  return parse(file1);
};
export default genDiff;
