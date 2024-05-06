/* eslint-disable no-param-reassign */
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';

const parse = (filePath) => {
  const fileName = filePath.split('/').pop();
  const formatName = fileName.slice(fileName.length - 5);
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
  const keysArray = Object.keys(object).sort((a, b) => {
    if (a[2] < b[2]) {
      return -1;
    }
    if (a[2] > b[2]) {
      return 1;
    }
    return 0;
  });
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

const stylish = (object) => {
  const nestingLevel = (structure, level = 1) => {
    const tree = mkTree(structure);
    let result = tree.reduce((acc, node) => {
      if (Object.hasOwn(node, 'children')) {
        const newLevel = level + 1;
        acc += `\n${' '.repeat(level * 4 - 2)}${node.name}: ${nestingLevel(structure[node.name], newLevel)}`;
      }
      if (Object.hasOwn(node, 'content')) {
        acc += `\n${' '.repeat(level * 4 - 2)}${node.name}: ${node.content}`;
      }
      return acc;
    }, '{');
    result += `\n${' '.repeat((level - 1) * 4)}}`;
    return result;
  };
  return nestingLevel(object, 1);
};

export {
  mkTree, sorting, spaceFormat, stylish, parse,
};
