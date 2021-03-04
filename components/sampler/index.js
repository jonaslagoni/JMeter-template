import { isNATSProtocol } from '../protocols/NATS/utils';
import { getNATSSamplers } from '../protocols/NATS/testplan/samplers';

/**
 * Based on protocol figure which samplers we must use.
 */
export function getSamplers(asyncapi, scriptFileName) {
  let samplers = [];
  const serverEntries = Object.keys(asyncapi.servers()).length ? Object.entries(asyncapi.servers()) : [];
  samplers = serverEntries.map(([, server]) => {
    if (isNATSProtocol(server)) {
      samplers = [...samplers, getNATSSamplers(asyncapi, scriptFileName)];
    }
  });
  return samplers;
}
