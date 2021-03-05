import { isNATSProtocol } from '../utils/nats';
import { getNATSSamplers } from '../protocols/NATS/testplan/samplers/index';

/**
 * Based on protocol figure which samplers we must use.
 */
export function getSamplers(asyncapi) {
  let samplers = [];
  const serverEntries = Object.keys(asyncapi.servers()).length ? Object.entries(asyncapi.servers()) : [];
  serverEntries.forEach(([, server]) => {
    if (isNATSProtocol(server)) {
      samplers = [...samplers, getNATSSamplers(asyncapi)];
    }
  });
  return samplers;
}
