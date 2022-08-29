import yaml from 'js-yaml';

const parse = (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.load(file);
    case 'yaml':
      return yaml.load(file);
    default:
      throw Error('Wrong extension!');
  }
};

export default parse;
