import _ from 'lodash';

const getEventAsString = (event) => {
  console.log(`event - ${event}`);
  switch (event) {
    case 'added':
      return '+ ';
    case 'deleted':
      return '- ';
    case 'unchanged':
      return '  ';
    default:
      throw Error('getEventAsString error');
  }
};

const toString = (diff) => {
  const replacer = ' ';
  const spaceCount = 1;
  const stringConstructor = (item, currentResult, depth = 1) => {
    const multiplyReplacer = replacer.repeat(spaceCount * depth);
    if (_.isObject(item)) {
      const deeper = depth + 1;
      const keys = Object.keys(item);
      console.log(`keys = ${keys}`);
      const mapped = keys.reduce((str, key) => {
        const eventString = getEventAsString(item.event);
        const newString = str.concat(`${multiplyReplacer}${eventString}${key}: ${stringConstructor(item[key], '', deeper)}\n`);
        return newString;
      }, '');
      const closedReplacer = replacer.repeat(spaceCount * (depth - 1));
      const newCurrentResult = `{\n${mapped}${closedReplacer}}`;
      return currentResult.concat(newCurrentResult);
    }
    return currentResult.concat(String(item));
  };
  return stringConstructor(diff, '');
};
export default toString;

// // build JSON string
// const buildStringJSON = diff.reduce((string, [key, value, event], currentIndex) => {
//   const eventAsString = getEventAsString(event);
//   if (currentIndex === 0) {
//     const resultString = string.concat(`{${eventAsString}${key}: ${value},\n`);
//     return resultString;
//   }
//   if (currentIndex === diff.length - 1) {
//     const resultString = string.concat(`${eventAsString}${key}: ${value}\n}`);
//     return resultString;
//   }
//   const resultString = string.concat(`${eventAsString}${key}: ${value},\n`);
//   return resultString;
// }, '');
// // build YAML string
// const bieldStringYAML = diff.reduce((string, [key, value, event], currentIndex) => {
//   if (currentIndex === 0) {
//     const resultString = string.concat(`'${eventAsString}${key}': ${value}`);
//     return resultString;
//   }
//   if (currentIndex === diff.length - 1) {
//     const resultString = string.concat(`\n'${eventAsString}${key}': ${value}`);
//     return resultString;
//   }
//   const resultString = string.concat(`\n'${eventAsString}${key}': ${value}`);
//   return resultString;
// }, '');
