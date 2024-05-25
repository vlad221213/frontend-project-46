/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import genDiff from '../src/index.js';
import formaterSelection from '../formatters/index.js';

const stylishOutput = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: null\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: \n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n        fee: 100500\n    }\n}';
const plainOutput = "Property 'common.follow' was added with value: false\nProperty 'common.setting2' was removed\nProperty 'common.setting3' was updated. From true to null\nProperty 'common.setting4' was added with value: blah blah\nProperty 'common.setting5' was added with value: [object Object]\nProperty 'common.setting6.doge.wow' was updated. From  to so much\nProperty 'common.setting6.ops' was added with value: vops\nProperty 'group1.baz' was updated. From bas to bars\nProperty 'group1.nest' was updated. From [object Object] to str\nProperty 'group2' was removed\nProperty 'group3' was added with value: [object Object]\n";
const emptyObject = '{\n}';

test('JSONtest', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json', formaterSelection('stylish'))).toEqual(stylishOutput);
});
test('YMLtest', () => {
  expect(genDiff('_fixtures_/file1.yml', '_fixtures_/file2.yml', formaterSelection('stylish'))).toEqual(stylishOutput);
});
test('emptyFileTest', () => {
  expect(genDiff('_fixtures_/emptyFile.json', '_fixtures_/emptyFile.json', formaterSelection('stylish'))).toEqual(emptyObject);
});
test('plainFormatTest', () => {
  expect(genDiff('_fixtures_/file1.json', '_fixtures_/file2.json', formaterSelection('plain'))).toEqual(plainOutput);
});
