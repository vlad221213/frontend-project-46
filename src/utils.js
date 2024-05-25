/* eslint-disable no-param-reassign */
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';

const parse = (filePath) => {
  const fileName = filePath.split('/').pop();
  const formatName = fileName.slice(fileName.length - 4);
  let result;
  if (formatName === 'json') {
    result = JSON.parse(readFileSync(filePath));
  } else {
    result = load(readFileSync(filePath));
  }
  return result;
};

const mkTree = (object) => {
  const keysArray = Object.keys(object);
  const result = keysArray.reduce((acc, key) => {
    if (typeof object[key] === 'object' && object[key] !== null) {
      const children = mkTree(object[key]);
      const node = { name: key, children };
      acc.push(node);
    } else {
      const node = { name: key, content: object[key] };
      acc.push(node);
    }
    return acc;
  }, []);
  return result;
};

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
    if (a[2] === b[2]) {
      return lastCharacterSorting(a, b);
    }
    return 0;
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

const spaceFormat = (object) => {
  const keysArray = Object.keys(object);
  const result = keysArray.reduce((acc, key) => {
    if (typeof object[key] === 'object' && object[key] !== null && key[0] !== '+' && key[0] !== '-' && key[0] !== ' ') {
      acc[`  ${key}`] = spaceFormat(object[key]);
    } else if (typeof object[key] === 'object' && object[key] !== null && (key[0] === '+' || key[0] === '-' || key[0] === ' ')) {
      acc[key] = spaceFormat(object[key]);
    } else if (key[0] === '+' || key[0] === '-' || key[0] === ' ') {
      acc[key] = object[key];
    } else {
      acc[`  ${key}`] = object[key];
    }
    return acc;
  }, {});
  return result;
};

export {
  mkTree, sorting, spaceFormat, parse,
};
