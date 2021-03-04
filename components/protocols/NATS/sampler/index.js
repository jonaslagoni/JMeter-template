
import { Publish } from './publish';
import { Request } from './request';
import { isRequestReply, isReplier, isPubsub } from '../utils/index';

/**
 * 
 * @param {*} channel 
 * @param {*} channelName 
 */
export function getSamplerCode(channel, channelName) {
  const publishMessage = channel.publish() ? channel.publish().message(0) : undefined;
  const channelParameters = channel.parameters();
  if (isRequestReply(channel)) {
    if (isReplier(channel)) {
      return Request(
        channelName,
        publishMessage,
        channelParameters
      );
    }
  }

  if (isPubsub(channel)) {
    if (channel.hasPublish()) {
      return Publish(
        channelName,
        publishMessage,
        channelParameters);
    }
  }
  return undefined;
}
