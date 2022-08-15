import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import getDiff from '../src/getDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['stylish', 'plain', 'json'];

test.each(formats)('JSON file test with %s output format', (format) => {
  const actual = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), format);
  const expected = readFile(`${format}Result.txt`).trim();
  expect(actual).toEqual(expected);
});

test.each(formats)('YAML file test with %s output format', (format) => {
  const actual = getDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), format);
  const expected = readFile(`${format}Result.txt`).trim();
  expect(actual).toEqual(expected);
});
