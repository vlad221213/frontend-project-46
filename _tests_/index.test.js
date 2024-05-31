/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import genDiff from '../index.js';
import formatterSelection from '../formatters/index.js';
import stylishOutput from '../_fixtures_/stylishOutput.js';
import plainOutput from '../_fixtures_/plainOutput.js';

const emptyObject = '{\n}';

test('JSONtest', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json', formatterSelection('stylish'))).toEqual(stylishOutput);
});
test('YMLtest', () => {
  expect(genDiff('_fixtures_/file1.yml', '_fixtures_/file2.yml', formatterSelection('stylish'))).toEqual(stylishOutput);
});
test('emptyFileTest', () => {
  expect(genDiff('_fixtures_/emptyFile.json', '_fixtures_/emptyFile.json', formatterSelection('stylish'))).toEqual(emptyObject);
});
test('plainFormatTest', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json', formatterSelection('plain'))).toEqual(plainOutput);
});
