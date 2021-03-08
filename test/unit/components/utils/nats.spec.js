/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable prefer-arrow-callback */
import { expect } from 'chai';
import {realizeTopic, isNATSProtocol, isRequester, isReplier, isRequestReply, isPubsub} from '../../../../components/utils/nats';
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
  describe('isRequester()', function() {
    it('should return true when defined as requester', function() {
      const channel = {
        hasBinding: () => {return true;}
      };
      channel.binding = () => {
        return {
          is: 'requestReply',
          requestReply: {
            is: 'requester'
          }
        };
      };
      expect(isRequester(channel)).to.equal(true); 
    });
    it('should return false when defined as replier', function() {
      const channel = {
        hasBinding: () => {return true;}
      };
      channel.binding = () => {
        return {
          is: 'requestReply',
          requestReply: {
            is: 'replier'
          }
        };
      };
      expect(isRequester(channel)).to.equal(false); 
    });
  });
  describe('isReplier()', function() {
    it('should return true when defined as replier', function() {
      const channel = {
        hasBinding: () => {return true;}
      };
      channel.binding = () => {
        return {
          is: 'requestReply',
          requestReply: {
            is: 'replier'
          }
        };
      };
      expect(isReplier(channel)).to.equal(true); 
    });
    it('should return false when defined as requester', function() {
      const channel = {
        hasBinding: () => {return true;}
      };
      channel.binding = () => {
        return {
          is: 'requestReply',
          requestReply: {
            is: 'requester'
          }
        };
      };
      expect(isReplier(channel)).to.equal(false); 
    });
  });
  describe('isRequestReply()', function() {
    it('should return true when defined as request/reply', function() {
      const channel = {
        hasBinding: () => {return true;}
      };
      channel.binding = () => {
        return {
          is: 'requestReply'
        };
      };
      expect(isRequestReply(channel)).to.equal(true); 
    });
    it('should return false when no bindings are defined', function() {
      const channel = {
        hasBinding: () => {return false;}
      };
      expect(isRequestReply(channel)).to.equal(false); 
    });
    it('should return false when is binding is not defined', function() {
      const channel = {
        hasBinding: () => {return true;}
      };
      channel.binding = () => {
        return {};
      };
      expect(isRequestReply(channel)).to.equal(false); 
    });
  });
  describe('isPubsub()', function() {
    it('should return true when defined as pubsub', function() {
      const channel = {
        hasBinding: () => {return true;}
      };
      channel.binding = () => {
        return {
          is: 'pubsub'
        };
      };
      expect(isPubsub(channel)).to.equal(true); 
    });
    it('should return false when defined as requestReply', function() {
      const channel = {
        hasBinding: () => {return true;}
      };
      channel.binding = () => {
        return {
          is: 'requestReply'
        };
      };
      expect(isPubsub(channel)).to.equal(false); 
    });
    it('should default to pubsub', function() {
      const channel = {
        hasBinding: () => {return false;}
      };
      expect(isPubsub(channel)).to.equal(true); 
    });
  });
});
