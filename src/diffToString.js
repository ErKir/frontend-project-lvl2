// import _ from 'lodash';
// import parser from '../src/parsers.js';

const diffToString = (diff, format) => {
  const getEventAsString = (ev) => {
    switch (ev) {
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
  // build JSON string
  const buildStringJSON = diff.reduce((string, [key, value, event], currentIndex) => {
    const eventAsString = getEventAsString(event);
    if (currentIndex === 0) {
      const resultString = string.concat(`{${eventAsString}${key}: ${value}`);
      return resultString;
    }
    if (currentIndex === diff.length - 1) {
      const resultString = string.concat(`${eventAsString}${key}: ${value}}`);
      return resultString;
    }
    const resultString = string.concat(`${eventAsString}${key}: ${value}`);
    return resultString;
  }, '');

  // build YAML string
  const bieldStringYAML = diff.reduce((string, [key, value, event], currentIndex) => {
    const eventAsString = getEventAsString(event);
    if (currentIndex === 0) {
      const resultString = string.concat(`'${eventAsString}${key}': ${value}`);
      return resultString;
    }
    if (currentIndex === diff.length - 1) {
      const resultString = string.concat(`\n'${eventAsString}${key}': ${value}`);
      return resultString;
    }
    const resultString = string.concat(`\n'${eventAsString}${key}': ${value}`);
    return resultString;
  }, '');

  // chose output format of data and return
  if (format === 'json') {
    console.log('buildStringJSON=', buildStringJSON);
    const resultJSON = JSON.stringify(buildStringJSON);
    console.log('resultJSON=', resultJSON);
    return resultJSON;
  }
  const resultYAML = bieldStringYAML;
  console.log(bieldStringYAML);
  // console.log('resultYAML=', resultYAML);
  return resultYAML;
};

export default diffToString;
