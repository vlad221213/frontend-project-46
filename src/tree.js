const mkTree = (object) => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }
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

const difference = (file1, file2) => {
  const tree1 = mkTree(file1);
  const tree2 = mkTree(file2);
  const diff1 = tree1.reduce((acc, node) => {
    if (Object.hasOwn(node, 'children') && Object.hasOwn(file2, node.name) && typeof file2[node.name] === 'object' && file2[node.name] !== null) {
      const item = { name: node.name, children: difference(file1[node.name], file2[node.name]), stat: 'unchanged' };
      return [item, ...acc];
    }
    if ((Object.hasOwn(node, 'children') && Object.hasOwn(file2, node.name) && typeof file2[node.name] !== 'object')
       || (Object.hasOwn(node, 'content') && Object.hasOwn(file2, node.name) && file1[node.name] !== file2[node.name])) {
      const item = {
        name: node.name, file1: mkTree(file1[node.name]), file2: mkTree(file2[node.name]), stat: 'changed',
      };
      return [item, ...acc];
    }
    if (!Object.hasOwn(file2, node.name)) {
      const item = { name: node.name, content: mkTree(file1[node.name]), stat: 'deleted' };
      return [item, ...acc];
    }
    if (Object.hasOwn(node, 'content') && file1[node.name] === file2[node.name]) {
      const item = { name: node.name, content: node.content, stat: 'unchanged' };
      return [item, ...acc];
    }
    return acc;
  }, []);
  const diff2 = tree2.reduce((acc, node) => {
    if (!Object.hasOwn(file1, node.name)) {
      acc[acc.length] = { name: node.name, content: mkTree(file2[node.name]), stat: 'added' };
    }
    return acc;
  }, diff1);
  return diff2;
};

export default difference;
