/* eslint-disable import/extensions */
import path from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import parse from './parsers.js';
import formatterSelection from '../formatters/index.js';
import difference from './tree.js';

const sort = (array) => {
  const sortedArray = _.sortBy(array, (item) => item.name);
  const result = sortedArray.reduce((acc, node) => {
    if (Object.hasOwn(node, 'children')) {
      const item = { name: node.name, children: sort(node.children), stat: node.stat };
      return [...acc, item];
    }
    return [...acc, node];
  }, []);
  return result;
};

const getFormat = (filePath) => path.extname(filePath);

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const file1 = parse(readFileSync(filePath1), getFormat(filePath1));
  const file2 = parse(readFileSync(filePath2), getFormat(filePath2));
  const formatter = formatterSelection(formatName);
  return formatter(sort(difference(file1, file2)));
};

export default genDiff;
