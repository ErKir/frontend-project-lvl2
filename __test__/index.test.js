import {
  fileURLToPath,
} from 'url';
import {
  dirname,
  resolve,
} from 'path';
import {
  readFileSync,
} from 'fs';
// import yaml from 'js-yaml';
import getDiff from '../bin/getDiff.js';

const __filename = fileURLToPath(
  import.meta.url,
);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('JSON file test', () => {
  const actual = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  const expected = readFile('resultStylish.txt').trim();
  // console.log('exp==', expected1);
  // console.log('act==', actual1);
  expect(actual).toEqual(expected);
});

test('YAML file test', () => {
  const actual = getDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'stylish');
  const expected = readFile('resultStylish.txt').trim();
  // console.log('exp==', expected1);
  // console.log('act==', actual1);
  expect(actual).toEqual(expected);
});
