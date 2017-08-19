'use strict';

const gulp = require('gulp');
const tools = require('urbanjs-tools');
const debounce = require('lodash.debounce');
const childProcess = require('child_process');
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
    paramCase: [
      '!src/**/*test.ts',
      '!src/utils/config/es6-template-strings.d.ts'
    ].concat(defaults.paramCase),
    dotCase: ['src/**/*test.ts']
  }),
  mocha: {
    collectCoverage: false
  },
  tslint: {
    configFile: './tslint.json'
  }
});

gulp.task('start-server:watch', () => {
  let currentProcess;

  const startServer = () => {
    killServer();

    currentProcess = childProcess.spawn('yarn', ['start-server'], {
      stdio: 'inherit',
      detached: true
    });
  };

  const killServer = () => {
    if (currentProcess) {
      try {
        process.kill(-currentProcess.pid, 'SIGKILL');
      } catch (e) {
      } finally {
        currentProcess = null;
      }
    }
  };

  process.on('exit', killServer);
  process.on('SIGINT', () => {
    killServer();
    process.exit(-1);
  });
  process.on('uncaughtException', () => {
    killServer();
    process.exit(-1);
  });

  startServer();
  gulp.watch(
    [
      'src/**',
      '!src/view/**',
      '!src/client/**'
    ],
    debounce(startServer, 300)
  );
});
