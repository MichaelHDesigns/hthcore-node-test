'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export hthcore-lib', function() {
    var hthcore = require('../');
    should.exist(hthcore.lib);
    should.exist(hthcore.lib.Transaction);
    should.exist(hthcore.lib.Block);
  });
});
