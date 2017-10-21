'use strict';

const gulp = require('gulp');
const tools = require('urbanjs-tools');

tools.setGlobalConfiguration({
  babel: false
});

tools.initialize(gulp, {
  'check-dependencies': true,

  'check-file-names': true,

  mocha: {
    collectCoverage: false,
    timeout: 50000
  },

  nsp: true,

  retire: true,

  tslint: {
    configFile: './tslint.json'
  }
});
