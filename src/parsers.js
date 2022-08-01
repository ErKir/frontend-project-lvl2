import yaml from 'js-yaml';

const parser = (file, extension) => {
  console.log('extensionFile - ', extension);
  switch (extension) {
    case 'json':
      console.log('json - ', extension);
      return JSON.parse(file);
    case 'yml':
      console.log('yml - ', extension);
      return yaml.load(file);
    case 'yaml':
      console.log('yaml - ', extension);
      return yaml.load(file);
    default:
      throw Error('Sorry, extension of file must be ".json" or ".yml"/".yaml"');
  }
};

export default parser;
