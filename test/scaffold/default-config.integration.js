'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, process.env.HOME, './.hthcore/data/helpthehomelessd');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'helpthehomelessd',
        'web'
      ],
      servicesConfig: {
        helpthehomelessd: {
          connect: [{
            rpchost: '127.0.0.1',
            rpcport: 9998,
            rpcuser: 'dash',
            rpcpassword: 'local321',
            zmqpubrawtx: 'tcp://127.0.0.1:28332'
           }]
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.hthcore/hthcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.hthcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal(['helpthehomelessd', 'web']);
    var helpthehomelessd = info.config.servicesConfig.helpthehomelessd;
    should.exist(helpthehomelessd);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'helpthehomelessd',
        'web',
        'insight-api',
        'insight-ui'
      ],
      servicesConfig: {
        helpthehomelessd: {
          connect: [{
            rpchost: '127.0.0.1',
            rpcport: 9998,
            rpcuser: 'dash',
            rpcpassword: 'local321',
            zmqpubrawtx: 'tcp://127.0.0.1:28332'
          }]
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.hthcore/hthcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api', 'insight-ui']
    });
    info.path.should.equal(home + '/.hthcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal([
      'helpthehomelessd',
      'web',
      'insight-api',
      'insight-ui'
    ]);
    var helpthehomelessd = info.config.servicesConfig.helpthehomelessd;
    should.exist(helpthehomelessd);
  });
});
