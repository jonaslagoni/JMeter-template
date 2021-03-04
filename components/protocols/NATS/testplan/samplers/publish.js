import { pascalCase } from '../../utils';
import path from 'path';
export function Publish(channelName, scriptLocation) {
  const filePath = path.join(scriptLocation, pascalCase(channelName)); 
  return `
<JSR223Sampler guiclass="TestBeanGUI" testclass="JSR223Sampler" testname="${channelName} publish sampler" enabled="true">
    <stringProp name="cacheKey">true</stringProp>
    <stringProp name="filename">${filePath}</stringProp>
    <stringProp name="parameters"></stringProp>
    <stringProp name="script"></stringProp>
    <stringProp name="scriptLanguage">groovy</stringProp>
</JSR223Sampler>
    `;
}
