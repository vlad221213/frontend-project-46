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

const difference = (file1, file2) => {
  const tree1 = mkTree(file1);
  const tree2 = mkTree(file2);
  const diff1 = tree1.reduce((acc, node) => {
    if (Object.hasOwn(node, 'children') && Object.hasOwn(file2, node.name) && typeof file2[node.name] === 'object' && file2[node.name] !== null) {
      acc[`  ${node.name}`] = difference(file1[node.name], file2[node.name]);
    }
    if ((Object.hasOwn(node, 'children') && Object.hasOwn(file2, node.name) && typeof file2[node.name] !== 'object')
       || (Object.hasOwn(node, 'content') && Object.hasOwn(file2, node.name) && file1[node.name] !== file2[node.name])) {
      acc[`- ${node.name}`] = file1[node.name];
      acc[`+ ${node.name}`] = file2[node.name];
    }
    if (!Object.hasOwn(file2, node.name)) {
      acc[`- ${node.name}`] = file1[node.name];
    }
    if (Object.hasOwn(node, 'content') && file1[node.name] === file2[node.name]) {
      acc[`  ${node.name}`] = node.content;
    }
    return acc;
  }, {});
  const diff2 = tree2.reduce((acc, node) => {
    if (!Object.hasOwn(file1, node.name)) {
      acc[`+ ${node.name}`] = file2[node.name];
    }
    return acc;
  }, diff1);
  return spaceFormat(diff2);
};

export { mkTree, difference };
