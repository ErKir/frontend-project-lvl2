import stylish from './formatters/stylish.js';

const diffToString = (diff, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(diff);
    default:
      throw Error();
  }
};

export default diffToString;
