/* eslint-disable import/extensions */
import parse from './parsers.js';
import mkTree from './tree.js';
import stylish from '../formatters/stylish.js';

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

const genDiff = (filePath1, filePath2, formatter = stylish) => {
  const difference = (file1, file2) => {
    const tree1 = mkTree(file1);
    const tree2 = mkTree(file2);
    const diff1 = tree1.reduce((acc, node) => {
      if (Object.hasOwn(node, 'children') && Object.hasOwn(file2, node.name) && typeof file2[node.name] === 'object' && file2[node.name] !== null) {
        acc[`  ${node.name}`] = difference(file1[node.name], file2[node.name]);
      }
      if ((Object.hasOwn(node, 'children') && Object.hasOwn(file2, node.name) && typeof file2[node.name] !== 'object')
             || (Object.hasOwn(node, 'content') && Object.hasOwn(file2, node.name) && file1[node.name] !== file2[node.name])) {
        acc[`- ${node.name}`] = file1[node.name];
        acc[`+ ${node.name}`] = file2[node.name];
      }
      if (!Object.hasOwn(file2, node.name)) {
        acc[`- ${node.name}`] = file1[node.name];
      }
      if (Object.hasOwn(node, 'content') && file1[node.name] === file2[node.name]) {
        acc[`  ${node.name}`] = node.content;
      }
      return acc;
    }, {});
    const diff2 = tree2.reduce((acc, node) => {
      if (Object.hasOwn(node, 'children') && Object.hasOwn(file1, node.name) && typeof file1[node.name] === 'object') {
        acc[`  ${node.name}`] = difference(file1[node.name], file2[node.name]);
      }
      if (Object.hasOwn(node, 'children') && !Object.hasOwn(file1, node.name)) {
        acc[`+ ${node.name}`] = file2[node.name];
      }
      if (Object.hasOwn(node, 'content') && !Object.hasOwn(file1, node.name)) {
        acc[`+ ${node.name}`] = node.content;
      }
      return acc;
    }, diff1);
    return diff2;
  };
  const file1 = parse(filePath1);
  const file2 = parse(filePath2);
  return formatter(sorting(spaceFormat(difference(file1, file2))));
};

export default genDiff;
