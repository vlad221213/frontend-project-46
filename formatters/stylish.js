/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { mkTree } from '../src/utils.js';

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

export default stylish;
