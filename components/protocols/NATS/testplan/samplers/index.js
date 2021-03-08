import { getSamplerCode } from '../../sampler/index';
import { isRequestReply, isReplier, isPubsub } from '../../../../utils/nats';
import { pascalCase } from '../../../../utils/index';

/**
 * This includes samplers into the testplan file.
 * 
 * @param {*} asyncapi 
 */
export function getNATSSamplers(asyncapi) {
  const natsSamplers = [];
  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  channelEntries.forEach(([channelName, channel]) => {
    let samplerName = '';

    const testCode = getSamplerCode(channel, channelName);
    if (testCode === undefined) return;

    if (isRequestReply(channel) && isReplier(channel)) {
      samplerName = `${pascalCase(channelName)} request sampler`;
    } else if (isPubsub(channel) && channel.hasPublish()) {
      samplerName = `${pascalCase(channelName)} publish sampler`;
    }
    natsSamplers.push(`
<JSR223Sampler guiclass="TestBeanGUI" testclass="JSR223Sampler" testname="${samplerName}" enabled="true">
    <stringProp name="cacheKey">true</stringProp>
    <stringProp name="filename"></stringProp>
    <stringProp name="parameters"></stringProp>
    <stringProp name="script">
${testCode}
    </stringProp>
    <stringProp name="scriptLanguage">groovy</stringProp>
</JSR223Sampler>
<hashTree/>`);
  });
  return natsSamplers;
}
