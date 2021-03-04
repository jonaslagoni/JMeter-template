
import { File } from '@asyncapi/generator-react-sdk';
import { getSamplerCode } from '../../../../components/protocols/NATS/sampler';
import { pascalCase } from '../../../../components/protocols/NATS/utils';
export default function channelScript({ channel, channelName }) {
  const fileName = `${pascalCase(channelName)}.groovy`;
  const testCode = getSamplerCode(channel, channelName);
  if (testCode === undefined) return;
  return <File name={fileName}>
    {testCode}
  </File>;
}
