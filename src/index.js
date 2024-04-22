/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { readFileSync } from 'node:fs';
import parse from './utils.js';

const genDiff = (filePath1, filePath2) => {
  const file1 = parse(readFileSync(filePath1));
  const file2 = parse(readFileSync(filePath2));
  const itemsArray1 = Object.entries(file1).reduce((acc, [key, value]) => {
    if (!Object.hasOwn(file2, key)) {
      acc.push(`- ${key}: ${value}`);
    }
    if (Object.hasOwn(file2, key) && file1[key] === file2[key]) {
      acc.push(`  ${key}: ${value}`);
    }
    if (Object.hasOwn(file2, key) && file1[key] !== file2[key]) {
      acc.push(`- ${key}: ${file1[key]}`);
      acc.push(`+ ${key}: ${file2[key]}`);
    }
    return acc;
  }, []);
  const itemsArray2 = Object.entries(file2).reduce((acc, [key, value]) => {
    if (!Object.hasOwn(file1, key)) {
      acc.push(`+ ${key}: ${value}`);
    }
    return acc;
  }, []);
  const unionItemsArray = [...itemsArray1, ...itemsArray2].sort((a, b) => a[2].localeCompare(b[2]));
  const result = `{\n${unionItemsArray.join('\n')}\n}`;
  return result;
};
export default genDiff;
