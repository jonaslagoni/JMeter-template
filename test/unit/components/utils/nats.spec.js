/* eslint-disable prefer-arrow-callback */
import { expect } from 'chai';
import {realizeTopic, isNATSProtocol} from '../../../../components/utils/nats';
describe('NATS component utils', function() {
  describe('realizeTopic()', function() {
    it('should support string parameter', function() {
      const channelName = 'some/path/with/{parameter}';
      const parameters = { parameter: {}};
      parameters['parameter'].json = () => {
        return {
          type: 'string'
        };
      };
      const realizedChannel = realizeTopic(parameters, channelName);
      expect(realizedChannel).to.equal('"some.path.with.string"'); 
    });
    
    it('should support number parameter', function() {
      const channelName = 'some/path/with/{parameter}';
      const parameters = { parameter: {}};
      parameters['parameter'].json = () => {
        return {
          type: 'integer'
        };
      };
      const realizedChannel = realizeTopic(parameters, channelName);
      expect(realizedChannel).to.equal('"some.path.with.0"'); 
    });
  });
  describe('isNATSProtocol()', function() {
    it('should return true when server has protocol nats', function() {
      const serverWithNatsProtocol = {};
      serverWithNatsProtocol.protocol = () => {
        return 'nats';
      };
      expect(isNATSProtocol(serverWithNatsProtocol)).to.equal(true); 
    });
    it('should return false when server does not have protocol nats', function() {
      const serverWithNatsProtocol = {};
      serverWithNatsProtocol.protocol = () => {
        return 'ws';
      };
      expect(isNATSProtocol(serverWithNatsProtocol)).to.equal(false); 
    });
  });
});
