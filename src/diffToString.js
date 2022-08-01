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

  // chose output format of data and return result diff
  if (format === 'json') {
    const resultJSON = JSON.stringify(diffObject);
    console.log(resultJSON);
    return resultJSON;
  }
  const resultYAML = yaml.dump(diffObject);
  console.log(resultYAML);
  // console.log('resultYAML=', resultYAML);
  return resultYAML;
};

export default diffToString;
