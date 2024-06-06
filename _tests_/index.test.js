/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import genDiff from '../index.js';
import formatterSelection from '../formatters/index.js';
import stylishOutput from '../_fixtures_/stylishOutput.js';
import plainOutput from '../_fixtures_/plainOutput.js';
import resultYml from '../_fixtures_/result_plain.js';
import jsonOutput from '../_fixtures_/jsonOutput.js';

const emptyObject = '{\n}';

test('JSONtest', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json', 'stylish')).toEqual(stylishOutput);
});
test('YMLtest', () => {
  expect(genDiff('_fixtures_/file1.yml', '_fixtures_/file2.yml', 'stylish')).toEqual(stylishOutput);
});
test('emptyFileTest', () => {
  expect(genDiff('_fixtures_/emptyFile.json', '_fixtures_/emptyFile.json', 'stylish')).toEqual(emptyObject);
});
test('plainFormatTest', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json', 'plain')).toEqual(plainOutput);
  expect(genDiff('_fixtures_/file1.yml', '_fixtures_/file2.yml', 'plain')).toEqual(plainOutput);
});
test('HexletYmlTest', () => {
  expect(genDiff('_fixtures_/file3.yml', '_fixtures_/file4.yml', 'plain')).toEqual(resultYml);
});
test('jsonFormatTest', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json', 'json')).toEqual(jsonOutput);
});
