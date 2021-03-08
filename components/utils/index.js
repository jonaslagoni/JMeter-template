import _ from 'lodash';

/**
 * Convert string to camel case format
 * 
 * @param {*} string to format
 */
export function camelCase(string) {
  return _.camelCase(string);
}

/**
 * Convert string to pascal case format
 * 
 * @param {*} string to format
 */
export function pascalCase(string) {
  string = _.camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}
