import { realizeTopic } from '../../../utils/nats';
import { getConnectionUrl } from '../../../utils/index';
import {sample} from 'openapi-sampler';
// eslint-disable-next-line no-unused-vars
import {Server, ChannelParameter, Message} from '@asyncapi/parser';

/**
 * Get sampler for publishing messages
 * 
 * @param {string} channelName to publish to
 * @param {Message} messageToSend 
 * @param {{[key: string]: ChannelParameter}} channelParameters 
 * @param {Server} server to generate sampler for 
 */
export function Publish(channelName, messageToSend, channelParameters, server) {
  const realizedChannel = realizeTopic(channelParameters, channelName);
  const messageToSendExample = JSON.stringify(sample(messageToSend.payload().json())).replace(/"/g, '\\"');
  
  return `
import io.nats.client.Nats
import io.nats.client.Options

import java.nio.charset.StandardCharsets
import java.util.concurrent.TimeUnit

def charset = StandardCharsets.UTF_8
def byteArray = "${messageToSendExample}".getBytes(charset)
def options = new Options.Builder().server("${getConnectionUrl(server)}").maxReconnects(0)
def nc = Nats.connect(options)
nc.publish(${realizedChannel}, byteArray)
nc.close()
      `;
}
  
