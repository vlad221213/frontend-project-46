/* eslint-disable no-param-reassign */

const getSign = (stat) => {
  if (stat === 'added') {
    return '+';
  }
  if (stat === 'deleted') {
    return '-';
  }
  return ' ';
};

const stylish = (array) => {
  const nestingLevel = (tree, level = 1) => {
    if (typeof tree !== 'object' || tree === null) {
      return tree;
    }
    let result = tree.reduce((acc, node) => {
      const newLevel = level + 1;
      if (Object.hasOwn(node, 'children')) {
        acc += `\n${' '.repeat(level * 4 - 2)}${getSign(tree.stat)} ${node.name}: ${nestingLevel(node.children, newLevel)}`;
      } else if (node.stat === 'changed') {
        acc += `\n${' '.repeat(level * 4 - 2)}- ${node.name}: ${nestingLevel(node.file1, newLevel)}`;
        acc += `\n${' '.repeat(level * 4 - 2)}+ ${node.name}: ${nestingLevel(node.file2, newLevel)}`;
      } else {
        acc += `\n${' '.repeat(level * 4 - 2)}${getSign(node.stat)} ${node.name}: ${nestingLevel(node.content, newLevel)}`;
      }
      return acc;
    }, '{');
    result += `\n${' '.repeat((level - 1) * 4)}}`;
    return result;
  };
  return nestingLevel(array, 1);
};

export default stylish;
