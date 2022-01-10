'use strict';

var hthcore = require('@dashevo/hthcore-lib');
var $ = hthcore.util.preconditions;
var _ = hthcore.deps._;
var path = require('path');
var fs = require('fs');
var utils = require('../utils');

/**
 * Will return the path and hthcore-node configuration
 * @param {String} cwd - The absolute path to the current working directory
 */
function findConfig(cwd) {
  $.checkArgument(_.isString(cwd), 'Argument should be a string');
  $.checkArgument(utils.isAbsolutePath(cwd), 'Argument should be an absolute path');
  var directory = String(cwd);
  while (!fs.existsSync(path.resolve(directory, 'hthcore-node.json'))) {
    directory = path.resolve(directory, '../');
    if (directory === '/') {
      return false;
    }
  }
  return {
    path: directory,
    config: require(path.resolve(directory, 'hthcore-node.json'))
  };
}

module.exports = findConfig;
