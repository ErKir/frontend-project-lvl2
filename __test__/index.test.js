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
import getDiff from '../bin/getDiff.js';

const __filename = fileURLToPath(
  import.meta.url,
);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const actual1 = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const expected1 = readFile('result.json').trim();
console.log('exp==', expected1);
console.log('act==', actual1);

test('result must be equal "result.json"', () => {
  expect(actual1).toEqual(expected1);
});
