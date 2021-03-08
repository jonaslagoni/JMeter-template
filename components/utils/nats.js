import {sample} from 'openapi-sampler';

/**
 * Convert RFC 6570 URI with parameters to NATS topic. 
 */
export function realizeTopic(parameters, channelName) {
  let returnString = `"${ channelName }"`;
  returnString = returnString.replace(/\//g, '.');
  for (const paramName in parameters) {
    returnString = returnString.replace(`{${paramName}}`, sample(parameters[`${paramName}`].schema().json()));
  }
  return returnString;
}

/**
 * Figure out if channel is a pub/sub channel
 */
export function isPubsub(channel) {
  if (!channel.hasBinding('nats') ||
        !channel.binding('nats').is || 
        channel.binding('nats').is === 'pubsub') {
    return true;
  }
  return false;
}
  
/**
 * Figure out if channel is a request/reply channel
 */
export function isRequestReply(channel) {
  if (channel.hasBinding('nats') &&
        channel.binding('nats').is && 
        channel.binding('nats').is === 'requestReply') {
    return true;
  }
  return false;
}
    
/**
 * Figure out if channel is a request channel
 */
export function isRequester(channel) {
  if (isRequestReply(channel) &&
        channel.binding('nats').requestReply &&
        channel.binding('nats').requestReply.is === 'requester') {
    return true;
  }
  return false;
}
    
/**
 * Figure out if channel is a reply channel
 */
export function isReplier(channel) {
  if (isRequestReply(channel) &&
        channel.binding('nats').requestReply &&
        channel.binding('nats').requestReply.is === 'replier') {
    return true;
  }
  return false;
}

/**
 * return true if server has protocol 'nats'
 * 
 * @param {*} server to check
 */
export function isNATSProtocol(server) {
  return server.protocol() === 'nats';
}
  
