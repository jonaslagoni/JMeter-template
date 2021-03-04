import { realizeChannelName } from '../utils/index';

export function Publish(channelName, messageToSend, channelParameters) {
  const realizedChannel = realizeChannelName(channelParameters, channelName);
  const messageToSendExample = generateExample(messageToSend.payload().json());
  
  return `
import io.nats.client.Nats
import io.nats.client.Options

import java.nio.charset.StandardCharsets
import java.util.concurrent.TimeUnit

def charset = StandardCharsets.UTF_8
def byteArray = "${messageToSendExample}".getBytes(charset)
def options = new Options.Builder().server("nats://0.0.0.0:4222").maxReconnects(0)
def nc = Nats.connect(options)
nc.publish(${realizedChannel}, byteArray)
nc.close()
      `;
}
  
