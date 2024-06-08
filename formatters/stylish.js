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
    const output = tree.reduce((acc, node) => {
      const newLevel = level + 1;
      if (Object.hasOwn(node, 'children')) {
        const item = `\n${' '.repeat(level * 4 - 2)}${getSign(tree.stat)} ${node.name}: ${nestingLevel(node.children, newLevel)}`;
        return `${acc}${item}`;
      } if (node.stat === 'changed') {
        const item1 = `\n${' '.repeat(level * 4 - 2)}- ${node.name}: ${nestingLevel(node.file1, newLevel)}`;
        const item2 = `\n${' '.repeat(level * 4 - 2)}+ ${node.name}: ${nestingLevel(node.file2, newLevel)}`;
        return `${acc}${item1}${item2}`;
      }
      const item = `\n${' '.repeat(level * 4 - 2)}${getSign(node.stat)} ${node.name}: ${nestingLevel(node.content, newLevel)}`;
      return `${acc}${item}`;
    }, '{');
    const result = `${output}\n${' '.repeat((level - 1) * 4)}}`;
    return result;
  };
  return nestingLevel(array, 1);
};

export default stylish;
