import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';

const parse = (filePath) => {
  const fileName = filePath.split('/').pop();
  const formatName = fileName.slice(fileName.length - 5);
  let result;
  if (formatName === 'json') {
    result = JSON.parse(readFileSync(filePath));
  } else {
    result = load(readFileSync(filePath));
  }
  return result;
};
export default parse;
