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
        acc[`${getSign(node.stat)}${node.name}`] = jsonFormat(node.children);
      } else if (node.stat === 'changed') {
        acc[`-${node.name}`] = jsonFormat(node.file1);
        acc[`+${node.name}`] = jsonFormat(node.file2);
      } else {
        acc[`${getSign(node.stat)}${node.name}`] = jsonFormat(node.content);
      }
      return acc;
    }, {});
    return result;
  };
  return JSON.stringify(jsonFormat(tree));
};

export default json;
