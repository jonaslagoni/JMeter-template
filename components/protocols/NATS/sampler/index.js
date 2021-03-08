
import { Publish } from './publish';
import { Request } from './request';
import { isRequestReply, isPubsub, isReplier } from '../../../utils/nats';

/**
 * Based on channel type get sampler code
 * @param {*} channel 
 * @param {*} channelName 
 * @param {*} server to generate sampler for 
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
