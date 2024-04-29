/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import genDiff from '../src/index.js';

const outPut = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
const emptyObject = '{\n\n}';
test('JSONtest', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json')).toEqual(outPut);
});
test('YMLtest', () => {
  expect(genDiff('_fixtures_/file1.yml', '_fixtures_/file2.yml')).toEqual(outPut);
});
test('emptyFileTest', () => {
  expect(genDiff('_fixtures_/emptyFile.json', '_fixtures_/emptyFile.json')).toEqual(emptyObject);
});
