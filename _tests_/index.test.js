/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import genDiff from '../src/index.js';
import {
  sorting, spaceFormat, stylish, parse,
} from '../src/utils.js';

const outPut = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: null\n        setting6: {\n            doge: {\n              - wow: \n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}';
const emptyObject = '{\n}';
const genDiffTest = (filePath1, filePath2) => {
  const file1 = parse(filePath1);
  const file2 = parse(filePath2);
  const sortingObject = sorting(spaceFormat(genDiff(file1, file2)));
  return stylish(sortingObject);
};

test('JSONtest', () => {
  expect(genDiffTest('_fixtures_/file1.json', '_fixtures_/file2.json')).toEqual(outPut);
});
test('YMLtest', () => {
  expect(genDiffTest('_fixtures_/file1.yml', '_fixtures_/file2.yml')).toEqual(outPut);
});
test('emptyFileTest', () => {
  expect(genDiffTest('_fixtures_/emptyFile.json', '_fixtures_/emptyFile.json')).toEqual(emptyObject);
});
