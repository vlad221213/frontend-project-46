/* eslint-disable import/extensions */
/* eslint-disable quotes */
import { mkTree } from "./utils.js";

const genDiff = (file1, file2) => {
  const tree1 = mkTree(file1);
  const tree2 = mkTree(file2);
  const diff1 = tree1.reduce((acc, node) => {
    if (Object.hasOwn(node, 'children') && Object.hasOwn(file2, node.name) && typeof file2[node.name] === 'object' && file2[node.name] !== null) {
      acc[`  ${node.name}`] = genDiff(file1[node.name], file2[node.name]);
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
    if (Object.hasOwn(node, 'children') && Object.hasOwn(file1, node.name) && typeof file1[node.name] === 'object') {
      acc[`  ${node.name}`] = genDiff(file1[node.name], file2[node.name]);
    }
    if (Object.hasOwn(node, 'children') && !Object.hasOwn(file1, node.name)) {
      acc[`+ ${node.name}`] = file2[node.name];
    }
    if (Object.hasOwn(node, 'content') && !Object.hasOwn(file1, node.name)) {
      acc[`+ ${node.name}`] = node.content;
    }
    return acc;
  }, diff1);
  return diff2;
};

export default genDiff;
