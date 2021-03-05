import _ from 'lodash';

export function camelCase(string) {
  return _.camelCase(string);
}
export function pascalCase(string) {
  string = _.camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}
