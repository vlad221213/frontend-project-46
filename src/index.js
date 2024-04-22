/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { readFileSync } from 'node:fs';
import parse from './utils.js';

const genDiff = (filePath1, filePath2) => {
  const file1 = parse(readFileSync(filePath1));
  const file2 = parse(readFileSync(filePath2));
  const file1Array = Object.entries(file1);
  const itemsArray1 = file1Array.reduce((acc, [key, value]) => {
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
  const file2Array = Object.entries(file2);
  const itemsArray2 = file2Array.reduce((acc, [key, value]) => {
    if (!Object.hasOwn(file1, key)) {
      acc.push(`+ ${key}: ${value}`);
    }
    return acc;
  }, []);
  const unionItemsArray = [...itemsArray1, ...itemsArray2].sort((a, b) => a[2].localeCompare(b[2]));
  return `{\n${unionItemsArray.join('\n')}\n}`;
};
export default genDiff;
