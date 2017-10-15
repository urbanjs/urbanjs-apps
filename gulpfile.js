'use strict';

require('./gulp/start-server');
require('./gulp/check-translations');

const gulp = require('gulp');
const tools = require('urbanjs-tools');
const tsConfig = require('./tsconfig.json');

tools.setGlobalConfiguration({
  babel: false,
  typescript: tsConfig.compilerOptions
});

tools.initialize(gulp, {
  babel: defaults => ({
    ...defaults,
    files: defaults.files.concat('!src/**/__snapshots__/**')
  }),
  'check-dependencies': true,
  'check-file-names': defaults => Object.assign({}, defaults, {
    paramCase: [
      '!src/view/**/*test.?(ts|tsx)',
      '!src/apps/utils/config/es6-template-strings.d.ts'
    ].concat(defaults.paramCase)
  }),
  mocha: defaults => ({
    ...defaults,
    files: defaults.files.concat('!src/view/**'),
    collectCoverage: false,
    timeout: 20000
  }),
  tslint: {
    configFile: './tslint.json'
  },
  analyze: defaults => defaults.concat('check-translations')
});
