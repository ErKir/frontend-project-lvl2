import yaml from 'js-yaml';

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

  // build diff object
  const diffObject = diff.reduce((resultObj, [key, value, event]) => {
    const eventAsString = getEventAsString(event);
    const newKey = `${eventAsString}${key}`;
    const resultObject = {
      ...resultObj,
      [newKey]: value,
    };
    return resultObject;
  }, {});
  const resultJSON = JSON.stringify(diffObject);
  // chose output format of data and return result diff
  if (format === 'json') {
    console.log(resultJSON);
  } else {
    const resultYAML = yaml.dump(diffObject);
    console.log(resultYAML);
  }
  return resultJSON;
};

export default diffToString;

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
