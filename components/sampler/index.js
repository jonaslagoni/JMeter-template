import { isNATSProtocol } from '../utils/nats';
import { getNATSSamplers } from '../protocols/NATS/testplan/samplers/index';
// eslint-disable-next-line no-unused-vars
import {AsyncAPIDocument} from '@asyncapi/parser';

/**
  * Based on protocol figure which samplers we must use.
  * 
  * @param {AsyncAPIDocument} asyncapi 
  */
export function getSamplers(asyncapi) {
  let samplers = [];
  const serverEntries = Object.keys(asyncapi.servers()).length ? Object.entries(asyncapi.servers()) : [];
  serverEntries.forEach(([, server]) => {
    if (isNATSProtocol(server)) {
      samplers = [...samplers, getNATSSamplers(asyncapi, server)];
    }
  });
  return samplers;
}
