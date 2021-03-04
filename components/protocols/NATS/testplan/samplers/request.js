import path from 'path';
import { pascalCase } from '../../utils';

export function Request(channelName, scriptLocation) {
  const filePath = path.join(scriptLocation, pascalCase(channelName)); 
  return `
<JSR223Sampler guiclass="TestBeanGUI" testclass="JSR223Sampler" testname="${channelName} request sampler" enabled="true">
    <stringProp name="cacheKey">true</stringProp>
    <stringProp name="filename">${filePath}</stringProp>
    <stringProp name="parameters"></stringProp>
    <stringProp name="script"></stringProp>
    <stringProp name="scriptLanguage">groovy</stringProp>
</JSR223Sampler>
    `;
}

