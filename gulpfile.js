'use strict';

const gulp = require('gulp');
const tools = require('urbanjs-tools');
const tsConfig = require('./tsconfig.json');

tools.setGlobalConfiguration({
  babel: false,
  typescript: tsConfig.compilerOptions
});

tools.initialize(gulp, {
  babel: {
    outputPath: 'build-server'
  },
  'check-dependencies': true,
  'check-file-names': defaults => Object.assign({}, defaults, {
    paramCase: ['!src/**/*test.ts'].concat(defaults.paramCase),
    dotCase: ['src/**/*test.ts']
  }),
  mocha: true,
  tslint: true
});
