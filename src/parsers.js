import yaml from 'js-yaml';

const parser = (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.load(file);
    case 'yaml':
      return yaml.load(file);
    default:
      throw Error('Sorry, extension of file must be ".json" or ".yml"/".yaml"');
  }
};

export default parser;
