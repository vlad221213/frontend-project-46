/* eslint-disable no-param-reassign */

const output = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

const plain = (array) => {
  const plainFormat = (tree, filePath) => {
    const result = tree.reduce((acc, node) => {
      if (Object.hasOwn(node, 'children') && node.stat === 'unchanged') {
        const newFilePath = `${filePath}${node.name}.`;
        acc += plainFormat(node.children, newFilePath);
      }
      if (node.stat === 'changed') {
        const newFilePath = `${filePath}${node.name}`;
        acc += `Property '${newFilePath}' was updated. From ${output(node.file1)} to ${output(node.file2)}\n`;
      }
      if (node.stat === 'deleted') {
        const newFilePath = `${filePath}${node.name}`;
        acc += `Property '${newFilePath}' was removed\n`;
      }
      if (node.stat === 'added') {
        const newFilePath = `${filePath}${node.name}`;
        acc += `Property '${newFilePath}' was added with value: ${output(node.content)}\n`;
      }
      return acc;
    }, '');
    return result;
  };
  const result = plainFormat(array, '');
  return result.slice(0, result.length - 1);
};

export default plain;
