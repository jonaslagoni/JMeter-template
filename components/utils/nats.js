import {sample} from 'openapi-sampler';

/**
 * Convert RFC 6570 URI with parameters to NATS topic. 
 */
export function realizeTopic(parameters, channelName) {
  let returnString = `"${ channelName }"`;
  returnString = returnString.replace(/\//g, '.');
  for (const paramName in parameters) {
    returnString = returnString.replace(`{${paramName}}`, sample(parameters[`${paramName}`].json()));
  }
  return returnString;
}

/**
 * Is the channel a publish and subscribe. This is the default type if none is defined.
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
 * Is the channel a request and reply.
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
 * Is the request reply a requester
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
 * Is the request reply a replier
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
 * 
 * @param {*} server 
 */
export function isNATSProtocol(server) {
  return server.protocol() === 'nats';
}
  
