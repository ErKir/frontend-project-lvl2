import stylish from './stylish.js';
import plain from './plain.js';
import jsonStringify from './json.js';

const diffToString = (diff, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return jsonStringify(diff);
    default:
      throw new Error('error switch output format');
  }
};

export default diffToString;
