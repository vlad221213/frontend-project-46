/* eslint-disable import/extensions */
import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatterSelection = (formaterName) => {
  if (formaterName === 'plain') {
    return plain;
  }
  if (formaterName === 'json') {
    return json;
  }
  return stylish;
};

export default formatterSelection;
