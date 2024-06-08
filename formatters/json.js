const getSign = (stat) => {
  if (stat === 'added') {
    return '+';
  }
  if (stat === 'deleted') {
    return '-';
  }
  return '';
};

const json = (tree) => {
  const jsonFormat = (array) => {
    if (typeof array !== 'object' || array === null) {
      return array;
    }
    const result = array.reduce((acc, node) => {
      if (Object.hasOwn(node, 'children')) {
        const item = { [`${getSign(node.stat)}${node.name}`]: jsonFormat(node.children) };
        return { ...acc, ...item };
      } if (node.stat === 'changed') {
        const item1 = { [`-${node.name}`]: jsonFormat(node.file1) };
        const item2 = { [`+${node.name}`]: jsonFormat(node.file2) };
        return { ...acc, ...item1, ...item2 };
      }
      const item = { [`${getSign(node.stat)}${node.name}`]: jsonFormat(node.content) };
      return { ...acc, ...item };
    }, {});
    return result;
  };
  return JSON.stringify(jsonFormat(tree));
};

export default json;
