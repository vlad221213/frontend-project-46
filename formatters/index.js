/* eslint-disable import/extensions */
import plain from './plain.js';
import stylish from './stylish.js';

const formaterSelection = (formaterName) => {
  if (formaterName === 'plain') {
    return plain;
  }
  return stylish;
};

export default formaterSelection;
