import {generateExample} from '@asyncapi/generator-filters';
import _ from 'lodash';

export function camelCase(string) {
  return _.camelCase(string);
}
export function pascalCase(string) {
  string = _.camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Convert RFC 6570 URI with parameters to NATS topic. 
 */
export function realizeChannelName(parameters, channelName) {
    let returnString = `"${  channelName  }"`;
    returnString = returnString.replace(/\//g, '.');
    for (const paramName in parameters) {
      returnString = returnString.replace(`{${paramName}}`, generateExample(parameters[paramName].json()));
    }
    return returnString;
}
export function getSamplerFileName(channel)

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

export function isNATSProtocol(server){
  return server.protocol() === "nats";
}