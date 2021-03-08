import _ from 'lodash';
// eslint-disable-next-line no-unused-vars
import {Server} from '@asyncapi/parser';

/**
 * Convert string to camel case format
 * 
 * @param {string} string to format
 */
export function camelCase(string) {
  return _.camelCase(string);
}

/**
 * Convert string to pascal case format
 * 
 * @param {string} string to format
 */
export function pascalCase(string) {
  string = _.camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Get connection url with protocol
 * 
 * @returns
 * @param {Server} server 
 */
export function getConnectionUrl(server) {
  let connectionUrl = '';
  if (server.url()) {
    connectionUrl = server.url();
  }
  const serverProtocol = server.protocol();
  const connectionProtocol = `${serverProtocol}://`;
  if (serverProtocol && !connectionUrl.includes(connectionProtocol)) {
    connectionUrl = connectionProtocol + connectionUrl;
  }
  return connectionUrl;
}
