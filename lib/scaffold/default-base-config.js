'use strict';

var path = require('path');

/**
 * Will return the path and default hthcore-node configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - "testnet" or "livenet"
 * @param {String} options.datadir - Absolute path to HTH database directory
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }

  var datadir = options.datadir || path.resolve(process.env.HOME, '.helpthehomeless');

  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 65000,
      services: ['helpthehomelessd', 'web'],
      servicesConfig: {
        helpthehomelessd: {
          spawn: {
            datadir: datadir,
            exec: path.resolve(__dirname, datadir, 'helpthehomelessd')
          }
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;
