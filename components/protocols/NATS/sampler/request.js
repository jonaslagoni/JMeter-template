import { realizeTopic } from '../../../utils/nats';
import {sample} from 'openapi-sampler';

/**
 * Get sampler for requesting
 * 
 * @param {*} channelName to publish to
 * @param {*} messageToSend 
 * @param {*} channelParameters 
 */
export function Request(channelName, messageToSend, channelParameters) {
  const realizedChannel = realizeTopic(channelParameters, channelName);
  const messageToSendExample = JSON.stringify(sample(messageToSend.payload().json())).replace(/"/g, '\\"');
  return `
import io.nats.client.Nats
import io.nats.client.Options

import java.nio.charset.StandardCharsets
import java.util.concurrent.TimeUnit

def charset = StandardCharsets.UTF_8
def byteArray = "${messageToSendExample}".getBytes(charset)
def options = new Options.Builder().server("nats://0.0.0.0:4222").maxReconnects(0)
def nc = Nats.connect(options)
def incoming = nc.request(${realizedChannel}, byteArray)
def msg = incoming.get(5, TimeUnit.SECONDS)
def response = msg.data.toString()
nc.close()
      `;
}
  
