import stylish from './stylish.js';
import plain from './plain.js';

const diffToString = (diff, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error('error switch output format');
  }
};

export default diffToString;
