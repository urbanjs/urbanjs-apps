#! /usr/bin/env node

let program;
if (process.env.NODE_ENV === 'development') {
  require('urbanjs-tools').setupInMemoryTranspile();
  program = require('../src/apps/cli').program;
} else {
  program = require('../dist/apps/cli').program;
}

function exitWithError(e) {
  console.error(e); // eslint-disable-line no-console
  process.exit(1);
}

try {
  program.main(process.argv).catch(exitWithError);
} catch (e) {
  exitWithError(e);
}
