import { Publish } from './publish';
import { Request } from './request';
import { isRequestReply, isReplier, isPubsub } from '../../utils/index';

export function getNATSSamplers(asyncapi, scriptFileName) {
  let natsSamplers = [];
  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  natsSamplers = channelEntries.map(([channelName, channel]) => {
    if (isRequestReply(channel)) {
      if (isReplier(channel)) {
        return Request(
          channelName, 
          scriptFileName
        );
      }
    }
    if (isPubsub(channel)) {
      if (channel.hasPublish()) {
        return Publish(
          channelName,
          scriptFileName
        );
      }
    }
  });
  return natsSamplers;
}
