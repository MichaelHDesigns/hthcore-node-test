'use strict';

var Liftoff = require('liftoff');

function main(parentServicesPath, additionalServices) {

  var liftoff = new Liftoff({
    name: 'hthcore',
    moduleName: 'hthcore-node',
    configName: 'hthcore-node',
    processTitle: 'hthcore'
  }).on('require', function (name) {
    console.log('Loading:', name);
  }).on('requireFail', function (name, err) {
    console.log('Unable to load:', name, err);
  }).on('respawn', function (flags, child) {
    console.log('Detected node flags:', flags);
    console.log('Respawned to PID:', child.pid);
  });

  liftoff.launch({
    cwd: process.cwd()
  }, function(env){

    var node;
    if (env.configPath && env.modulePath) {
      node = require(env.modulePath);
      node.cli.main();
    } else {
      node = require('../../');
      node.cli.main(parentServicesPath, additionalServices);
    }

  });

}

module.exports = main;
