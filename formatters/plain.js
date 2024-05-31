/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { mkTree, output } from '../src/utils.js';

const plain = (object) => {
  const plainFormat = (structure, filePath) => {
    const tree = mkTree(structure);
    const result = tree.reduce((acc, node) => {
      if (Object.hasOwn(node, 'children') && node.name[0] === ' ') {
        const newFilePath = `${filePath}${node.name.slice(2)}.`;
        acc += plainFormat(structure[node.name], newFilePath);
      }
      if (node.name[0] === '-' && Object.hasOwn(structure, `+ ${node.name.slice(2)}`)) {
        const newFilePath = `${filePath}${node.name.slice(2)}`;
        acc += `Property '${newFilePath}' was updated. From ${output(structure[`- ${node.name.slice(2)}`])} to ${output(structure[`+ ${node.name.slice(2)}`])}\n`;
      }
      if (node.name[0] === '-' && !Object.hasOwn(structure, `+ ${node.name.slice(2)}`)) {
        const newFilePath = `${filePath}${node.name.slice(2)}`;
        acc += `Property '${newFilePath}' was removed\n`;
      }
      if (node.name[0] === '+' && !Object.hasOwn(structure, `- ${node.name.slice(2)}`)) {
        const newFilePath = `${filePath}${node.name.slice(2)}`;
        acc += `Property '${newFilePath}' was added with value: ${output(structure[`+ ${node.name.slice(2)}`])}\n`;
      }
      return acc;
    }, '');
    return result;
  };
  return plainFormat(object, '');
};

export default plain;
