const path = require('path');

const { Polly } = require('@pollyjs/core');
const NodeHttpAdapter = require('@pollyjs/adapter-node-http');
const FsPersister = require('@pollyjs/persister-fs');
const PollyUtils = require('@pollyjs/utils');

Polly.register(NodeHttpAdapter);
Polly.register(FsPersister);

function mockHttp(name, mode) {
  const pollyOptions = {
    mode,
    adapters: ['node-http'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: path.join(__dirname, './recordings')
      }
    },
    // logging: true,
    recordFailedRequests: mode === PollyUtils.MODES.RECORD,
    recordIfMissing: mode === PollyUtils.MODES.RECORD,
    matchRequestsBy: {
      headers: false,
      order: false,
      url: {
        port: false,
        hostname: false,
        protocol: false,
      }
    }
  };
  return new Polly(name, pollyOptions);
}

const recordHttp = (name) => mockHttp(name, PollyUtils.MODES.RECORD);
const stubHttp = (name) => mockHttp(name, PollyUtils.MODES.REPLAY);

module.exports = {
  recordHttp,
  stubHttp
};
