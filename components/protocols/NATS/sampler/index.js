
import { Publish } from './publish';
import { Request } from './request';
import { isRequestReply, isReplier, isPubsub } from '../../../utils/nats';

/**
 * Based on channel type get sampler code
 * @param {*} channel 
 * @param {*} channelName 
 */
export function getSamplerCode(channel, channelName) {
  const publishMessage = channel.publish() ? channel.publish().message(0) : undefined;
  const channelParameters = channel.parameters();
  if (isRequestReply(channel) && isReplier(channel)) {
    return Request(
      channelName,
      publishMessage,
      channelParameters
    );
  } else if (isPubsub(channel) && channel.hasPublish()) {
    return Publish(
      channelName,
      publishMessage,
      channelParameters
    );
  }
  return undefined;
}
