
import { Publish } from './publish';
import { Request } from './request';
import { isRequestReply, isPubsub, isReplier } from '../../../utils/nats';
// eslint-disable-next-line no-unused-vars
import {Server, Channel} from '@asyncapi/parser';

/**
 * Based on channel type get sampler code
 * @param {Channel} channel 
 * @param {string} channelName 
 * @param {Server} server to generate sampler for 
 */
export function getSamplerCode(channel, channelName, server) {
  const subscribeMessage = channel.subscribe() ? channel.subscribe().message(0) : undefined;
  const channelParameters = channel.parameters();
  if (isRequestReply(channel) && isReplier(channel)) {
    return Request(
      channelName,
      subscribeMessage,
      channelParameters, 
      server
    );
  } else if (isPubsub(channel) && channel.hasSubscribe()) {
    return Publish(
      channelName,
      subscribeMessage,
      channelParameters, 
      server
    );
  }
  return undefined;
}
