import { load } from 'js-yaml';

const parse = (file, format) => {
  if (format === '.json') {
    return JSON.parse(file);
  }
  return load(file);
};

export default parse;
