import { realizeTopic } from '../../../utils/nats';
import { getConnectionUrl } from '../../../utils/index';
import { sample } from 'openapi-sampler';
// eslint-disable-next-line no-unused-vars
import {Server, ChannelParameter, Message} from '@asyncapi/parser';

/**
 * Get sampler for requesting
 * 
 * @param {string} channelName to publish to
 * @param {Message} messageToSend 
 * @param {{[key: string]: ChannelParameter}} channelParameters 
 * @param {Server} server to generate sampler for 
 */
export function Request(channelName, messageToSend, channelParameters, server) {
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
def incoming = nc.request(${realizedChannel}, byteArray)
def msg = incoming.get(5, TimeUnit.SECONDS)
def response = msg.data.toString()
nc.close()
      `;
}
  
