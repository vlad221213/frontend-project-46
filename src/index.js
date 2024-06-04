/* eslint-disable import/extensions */
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import stylish from '../formatters/stylish.js';
import { difference } from './tree.js';

const sorting = (object) => {
  const lastCharacterSorting = (a, b) => {
    if (a[a.length - 1] < b[b.length - 1]) {
      return -1;
    }
    if (a[a.length - 1] > b[b.length - 1]) {
      return 1;
    }
    return 0;
  };
  const alphabeticalSorting = (a, b) => {
    if (a[2] < b[2]) {
      return -1;
    }
    if (a[2] > b[2]) {
      return 1;
    }
    return lastCharacterSorting(a, b);
  };
  const keysArray = Object.keys(object).sort(alphabeticalSorting);
  const result = keysArray.reduce((acc, key) => {
    if (typeof object[key] === 'object' && object[key] !== null) {
      acc[key] = sorting(object[key]);
    } else {
      acc[key] = object[key];
    }
    return acc;
  }, {});
  return result;
};

const getFormat = (filePath) => {
  const fileName = filePath.split('/').pop();
  const formatName = fileName.slice(fileName.length - 4);
  return formatName;
};

const genDiff = (filePath1, filePath2, formatter = stylish) => {
  const file1 = parse(readFileSync(filePath1), getFormat(filePath1));
  const file2 = parse(readFileSync(filePath2), getFormat(filePath2));
  return formatter(sorting(difference(file1, file2)));
};

export default genDiff;
